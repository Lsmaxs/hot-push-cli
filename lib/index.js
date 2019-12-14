"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var program = require('commander');
var pkgJson = require('../package.json');
var CWD = process.cwd();
var release_1 = require("./publish/release");
program
    .version(pkgJson.version, '-v, --version')
    .description("hot-push \u547D\u4EE4\u884C\u5DE5\u5177 v" + pkgJson.version);
program
    .command('register <source>')
    .description('hot-push 注册账号')
    .action(function (source, serverLink) {
    console.log('注册', source, serverLink);
});
program
    .command('login <source>')
    .description('hot-push 登录账号')
    .action(function (source, serverLink) {
    console.log('注册', source, serverLink);
});
program
    .command('token <source>')
    .description('hot-push 登录账号')
    .action(function (source, serverLink) {
    release_1.uploadFile();
});
program
    .command('release <source>')
    .description('hot-push 发布对应用程序部署的更新')
    .action(function (source, serverLink) {
    release_1.start();
});
program.parse(process.argv);
