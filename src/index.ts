
const fs = require('fs');
const path = require('path');
const program = require('commander');
const pkgJson = require('../package.json');
const CWD = process.cwd();
import {setConfig} from './utils/config'; 
import {uploadFile,packagePush} from './publish/release';
import utils from './utils';

program
    .version(pkgJson.version, '-v, --version')
    .description(`hot-push 命令行工具 v${pkgJson.version}`)


program
    .command('register')
    .description('hot-push 注册账号(实现中)')
    .action((source: any, serverLink: any) => {
        console.log('注册', source, serverLink)
    })

program
    .command('login')
    .description('hot-push 登录账号(实现中)')
    .action((source: any, serverLink: any) => {
        console.log('注册', source, serverLink)
    })

program
    .command('token <token>')
    .description('hot-push 配置登录Token')
    .action((token: string ) => {
        if(!!token){
            setConfig('token',token)
        }else{
            throw `token设置不能为空`
        }
    })


program
    .command('release <path>')
    .description('hot-push 发布对应用程序部署更新')
    .option( '-d, --desc <String>', '包更新说明' )
    .option( '-p, --platform <String>', '指定更新平台' )
    .action((path: string, opt: any) => {
        let description = "";
        // let filePath = './.zip/ios/rn-2.2.0.zip';
        let platform =  "ios";
        if(!path){
            utils.logRed(`请指定更新包地址`)
            return false
        }
        if(!!opt.desc){
            description = opt.desc
        }
        if(!!opt.platform){
            platform = opt.platform
        }
        packagePush({
            filePath:path,
            description,
            platform
        })
    })

program.parse(process.argv);