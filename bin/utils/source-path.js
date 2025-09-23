import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// __filename 是当前模块的文件名
export const _filename = fileURLToPath(import.meta.url);
// __dirname 是当前模块的目录名
export const _dirname = dirname(_filename);
// 项目根目录
export const _rootDir = resolve(_dirname, '../../');
// 组件目录
export const _compsDir = resolve(_rootDir, 'src/components');

export const _qxtCompsDir = resolve(_compsDir, 'qxt-vue');


export default {
    _rootDir,
    _compsDir,
    _qxtCompsDir,
}
