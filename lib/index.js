"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var program = require('commander');
var pkgJson = require('../package.json');
var CWD = process.cwd();
var config_1 = require("./utils/config");
var release_1 = require("./publish/release");
var utils_1 = __importDefault(require("./utils"));
program
    .version(pkgJson.version, '-v, --version')
    .description("hot-push \u547D\u4EE4\u884C\u5DE5\u5177 v" + pkgJson.version);
program
    .command('register')
    .description('hot-push 注册账号(实现中)')
    .action(function (source, serverLink) {
    console.log('注册', source, serverLink);
});
program
    .command('login')
    .description('hot-push 登录账号(实现中)')
    .action(function (source, serverLink) {
    console.log('注册', source, serverLink);
});
program
    .command('token <token>')
    .description('hot-push 配置登录Token')
    .action(function (token) {
    if (!!token) {
        config_1.setConfig('token', token);
    }
    else {
        throw "token\u8BBE\u7F6E\u4E0D\u80FD\u4E3A\u7A7A";
    }
});
program
    .command('release <path>')
    .description('hot-push 发布对应用程序部署更新')
    .option('-d, --desc <String>', '包更新说明')
    .option('-p, --platform <String>', '指定更新平台')
    .action(function (path, opt) {
    var description = "";
    // let filePath = './.zip/ios/rn-2.2.0.zip';
    var platform = "ios";
    if (!path) {
        utils_1.default.logRed("\u8BF7\u6307\u5B9A\u66F4\u65B0\u5305\u5730\u5740");
        return false;
    }
    if (!!opt.desc) {
        description = opt.desc;
    }
    if (!!opt.platform) {
        platform = opt.platform;
    }
    release_1.packagePush({
        filePath: path,
        description: description,
        platform: platform
    });
});
program.parse(process.argv);
