"use strict";
var fs = require('fs');
var path = require('path');
var program = require('commander');
var pkgJson = require('../package.json');
var CWD = process.cwd();
program
    .version(pkgJson.version, '-v, --version')
    .option('-i, --init', 'init something')
    .option('-g, --generate', 'generate something')
    .option('-r, --remove', 'remove something')
    .action(function (opt) {
    console.log('opt: ', opt);
});
program.parse(process.argv);
