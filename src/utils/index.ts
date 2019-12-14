
const chalk = require('chalk');
const exec = require('child_process').exec;


function baseLog(msg:any,color?:string){
    let msgStr = msg instanceof Error? msg.message: typeof msg == 'object' ? JSON.stringify(msg,null,2):msg;
    if(color){
        msgStr = (chalk[color] || chalk['white'])(msgStr)
    }
    console.log(msgStr)
}

function logGreen(msg:any){
    baseLog(msg, 'green')
}

function logRed(msg:any){
    baseLog(msg, 'red')
}

function asyncExec(cmd: any){
    let ls = exec(cmd);
    return new Promise((resolve,rejects)=>{
        ls.stdout.on('data',baseLog)
        ls.stderr.on('data',logRed)
        ls.on('error',rejects)
        ls.on('close',resolve)
    })
}


export default {
    logGreen,
    baseLog,
    logRed,
    asyncExec
}