
const fs = require('fs');
const path = require('path');
const program = require('commander');
const pkgJson = require('../package.json');
const CWD = process.cwd();
import {start,uploadFile} from './publish/release';
import utils from './utils';

program
    .version(pkgJson.version, '-v, --version')
    .description(`hot-push 命令行工具 v${pkgJson.version}`)


program
    .command('register <source>')
    .description('hot-push 注册账号')
    .action((source: any, serverLink: any) => {
        console.log('注册', source, serverLink)
    })

program
    .command('login <source>')
    .description('hot-push 登录账号')
    .action((source: any, serverLink: any) => {
        console.log('注册', source, serverLink)
    })

program
    .command('token <source>')
    .description('hot-push 登录账号')
    .action((source: any, serverLink: any) => {
        uploadFile()
    })


program
    .command('release <source>')
    .description('hot-push 发布对应用程序部署的更新')
    .action((source: any, serverLink: any) => {
        start();
    })

program.parse(process.argv);