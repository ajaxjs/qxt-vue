#!/usr/bin/env node
import { program } from 'commander';
import { useAdd } from './cmd/add.js';


program
    .name('qxt-vue')
    .description('Qixingtang Vue UI Lib')
    .version('1.0.0');

program
    .command('add <component>')
    .description('安装指定的UI组件')
    .action(useAdd)



// 解析命令行参数
program.parse(process.argv);