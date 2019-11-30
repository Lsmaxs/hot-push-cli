
const fs = require('fs');
const path = require('path');
const program = require('commander');
const pkgJson = require('../package.json');
const CWD = process.cwd();

program
    .version(pkgJson.version, '-v, --version')
    .option('-i, --init', 'init something')
    .option('-g, --generate', 'generate something')
    .option('-r, --remove', 'remove something')
    .action((opt: any) => {
        console.log('opt: ', opt);
    })

   






program.parse(process.argv);