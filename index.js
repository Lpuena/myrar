#!/usr/bin/env node

import { unrar } from "unrar-promise";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import { readFile } from 'fs/promises';
import { resolve, basename, extname,dirname,join } from 'path';


const url = import.meta.url
console.log(url);

// 将 URL 转换为本地文件路径
const currentFilePath = new URL(url).pathname;
console.log(currentFilePath);

const dirnamePP = dirname(currentFilePath);
console.log(dirnamePP);
const packageJsonPath =join(dirnamePP, 'package.json');
console.log(packageJsonPath);

// 读取package.json文件
const pkg = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
// console.log(pkg);

// 解析命令行参数
const { argv } = yargs(hideBin(process.argv))
  .scriptName('unrar')
  .usage(`$0 <input> [options]`, 'unrar input file')
  .demandCommand(1, 'You must provide an input file')
  .option('output', {
    alias: 'o',
    describe: 'output file',
    type: 'string',
    defaultL: '.'
  })
  .option('password', {
    alias: 'p',
    describe: 'password',
    type: 'string'
  })
  .help('help')
  .alias('help', 'h')
  .version(pkg.version)
  .alias('version', 'v')


let { input, output, password } = argv;
// console.log(process.cwd());
output = resolve(process.cwd(), output || basename(input, extname(input)));

await unrar(input, output, {
  password
})
console.log('unrar done');
