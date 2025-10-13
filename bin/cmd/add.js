import path from 'path';
//import { promises as fs } from 'fs';
//import { exec } from 'child_process';
//import { promisify } from 'util';
import { _rootDir, _qxtCompsDir, _compsDir } from '../utils/source-path.js';
import validInstall from '../utils/valid-install.js';
//import importer from '../utils/importer.js';
//import { fileExists } from '../utils/fs-ext.js';
import { installDependencies } from '../utils/dependencie.js';
import { copyFolder } from '../utils/fs-ext.js';
//import chalk from 'chalk';
import ora from 'ora';

//const execAsync = promisify(exec);
const spinner = ora('Loading...');

export async function useAdd(component) {
    spinner.start(`正在安装组件: ${component}`);
    const { shadcnConfig } = await validInstall();
    const { aliases } = shadcnConfig;
    //console.log('aliases', aliases);
    try {
        spinner.text = '正在安装依赖...'
        // 安装依赖
        await installDependencies(component, shadcnConfig);
        // 复制组件
        spinner.text = '正在复制组件...'
        const compsDir = path.join(_qxtCompsDir, component);
        const targetDir = path.join(aliases.components, 'qxt-vue', component);
        await copyFolder(compsDir, targetDir, ['dependencies.json']);
        
        spinner.succeed(`组件 ${component} 安装成功`);
    } catch (error) {
        console.log('安装组件依赖失败:', error);
        spinner.fail(`安装组件 ${component} 失败: ${error.message}`);
    }
}
