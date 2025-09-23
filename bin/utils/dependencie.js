import { exec } from 'child_process';
import { promisify } from 'util';
import { _qxtCompsDir } from './source-path.js';
import { fileExists } from './fs-ext.js';
import importer from './importer.js';
import chalk from 'chalk';

const execAsync = promisify(exec);

/**
 * 安装所有组件依赖
 * @param {array} tasks 组件依赖安装任务
 * @param {function} onProgress 进度回调
 * @returns {Promise}
 */
export function installAll(tasks, onProgress) {
    // 确保 promises 是数组
    const promiseTasks = Array.from(tasks);
    // 包装每个 Promise，监听其 settle 状态
    const wrappedPromises = promiseTasks.map((task, index) => {
        const taskPromise = execAsync(task);
        //const taskPromise = new Promise((resolve) => setTimeout(resolve, index * 1000))
        return Promise.resolve(taskPromise)
            .then(
                (value) => {
                    // 单个 Promise 成功时调用 onProgress
                    onProgress({ status: 'fulfilled', value, index, task });
                    return { status: 'fulfilled', value };
                },
                (reason) => {
                    // 单个 Promise 失败时调用 onProgress
                    onProgress({ status: 'rejected', reason, index });
                    return { status: 'rejected', reason };
                }
            )
    });

    // 返回 Promise.allSettled 的结果
    return Promise.allSettled(wrappedPromises);
}

/**
 * 组件依赖安装任务
 * @param {*} component 组件名称
 * @param {*} aliases   shadcn-vue别名配置
 * @returns {array} 组件依赖安装任务
 */
export async function dependencieTask(component, aliases) {
    const task = [];
    const dependencies = await importer(`${_qxtCompsDir}/${component}/dependencies.json`);
    const shadcnComps = dependencies['shadcn-vue'];
    if (shadcnComps && shadcnComps.length) {
        // 检查组件是否存在
        let comps = await Promise.all(shadcnComps.map(async comp => {
            return { comp, exist: await fileExists(`${aliases.ui}\\${comp}`) };
        }));
        // 过滤已安装的组件
        comps = comps.filter(comp => !comp.exist).map(({ comp }) => comp);
        task.push(...comps.map(comp => `npx shadcn-vue@latest add ${comp}`));
    }
    // npm依赖
    const packages = dependencies['packages'];
    if (packages && packages.length) {
        const cwd = process.cwd();
        // 检查npm依赖是否已安装
        const installed = await importer(`${cwd}/package.json`);
        const pkg_task = packages.filter(pkg => !installed.dependencies[pkg]).map(pkg => `npm install ${pkg}`);
        task.push(...pkg_task);
    }
    // 组件自身依赖
    const selfdep = dependencies['selfdep'];
    if (selfdep && selfdep.length) {
        const cwd = process.cwd();
        const selfComps = await Promise.all(selfdep.map(comp => ({ comp, exist: fileExists(path.resolve(cwd, comp)) })));
        console.log(selfComps);
        
        // 检查npm依赖是否已安装
        //const installed = await importer(`${cwd}/package.json`);
        //const self_task = selfdep.filter(pkg => !installed.dependencies[pkg]).map(pkg => `npm install ${pkg}`);
        //task.push(...self_task);
    }

    return task;
}

export async function installDependencies(component, shadcnConfig) {
    const { aliases } = shadcnConfig;
    const tasks = await dependencieTask(component, aliases);
    if (tasks.length) {
        return installAll(tasks, ({ status, value, reason }) => {
            if (status === 'fulfilled') {
                console.log('\n', '√ 安装成功:', '\n', chalk.green(value.stdout));
            } else {
                console.log('\n', '× 安装失败:', '\n', chalk.red(reason));
            }
        });
    }
    return Promise.resolve();
}