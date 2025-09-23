import { promises as fs } from 'fs';
import path from 'path';

// 检查文件是否存在
export async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

/**
 * 递归复制文件夹及其内容到目标路径，支持忽略指定文件或路径
 * @param {string} source - 源文件夹路径
 * @param {string} target - 目标文件夹路径
 * @param {string[]} [ignore=[]] - 要忽略的文件名或路径（相对或绝对路径）
 * @returns {Promise<void>}
 */
export async function copyFolder(source, target, ignore = []) {
    // 规范化忽略列表，确保路径使用正斜杠
    const normalizedIgnore = ignore.map(item => path.resolve(source, item).replace(/\\/g, '/'));

    // 检查源路径是否存在且为文件夹
    const sourceStat = await fs.stat(source);
    if (!sourceStat.isDirectory()) {
        throw new Error(`Source path "${source}" is not a directory`);
    }

    // 创建目标文件夹（如果不存在）
    await fs.mkdir(target, { recursive: true });

    // 读取源文件夹内容
    const entries = await fs.readdir(source, { withFileTypes: true });

    // 遍历所有文件和子文件夹
    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const targetPath = path.join(target, entry.name);
        const normalizedSourcePath = sourcePath.replace(/\\/g, '/');

        // 检查是否在忽略列表中
        if (normalizedIgnore.includes(normalizedSourcePath) || normalizedIgnore.some(ignored => normalizedSourcePath.startsWith(ignored + '/'))) {
            continue;
        }

        if (entry.isDirectory()) {
            // 递归复制子文件夹
            await copyFolder(sourcePath, targetPath, ignore);
        } else {
            // 复制文件
            await fs.copyFile(sourcePath, targetPath);
        }
    }
}