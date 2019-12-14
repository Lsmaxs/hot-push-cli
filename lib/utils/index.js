"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require('chalk');
var exec = require('child_process').exec;
function baseLog(msg, color) {
    var msgStr = msg instanceof Error ? msg.message : typeof msg == 'object' ? JSON.stringify(msg, null, 2) : msg;
    if (color) {
        msgStr = (chalk[color] || chalk['white'])(msgStr);
    }
    console.log(msgStr);
}
function logGreen(msg) {
    baseLog(msg, 'green');
}
function logRed(msg) {
    baseLog(msg, 'red');
}
function asyncExec(cmd) {
    var ls = exec(cmd);
    return new Promise(function (resolve, rejects) {
        ls.stdout.on('data', baseLog);
        ls.stderr.on('data', logRed);
        ls.on('error', rejects);
        ls.on('close', resolve);
    });
}
exports.default = {
    logGreen: logGreen,
    baseLog: baseLog,
    logRed: logRed,
    asyncExec: asyncExec
};
