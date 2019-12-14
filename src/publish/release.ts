
import fileMd5 from '../utils/fileMd5';
import {initConfig,getConfig} from '../utils/config'
import utils from '../utils';
import {uploadServer} from '../server'
import { hostname } from 'os';
const fs = require('fs-extra');


const cwd = process.cwd();
let CONFIG ;

async function getMergeConfig(){
    let config = await getConfig();

    CONFIG = config;

    utils.logGreen(CONFIG);
    
}   


async function start (){

    await getMergeConfig();

    utils.logGreen(cwd)

    let filemd5Name = await fileMd5('./.zip/ios/rn-2.2.0.zip')
    console.log('11',filemd5Name)


}

let config = {
    ossHost: `http://localhost:6001/api/ossSimpleUpload`,
    ossKey: `Jh4fna75pd`,
    ossSavePath: 'zzc/rn-list/'
} ;

function uploadFile(){
    let name = 'mdludy.zip'
    uploadServer(name,'./.zip/ios/rn-2.2.0.zip',config)
        .then(res=>{
            utils.baseLog(res)
        });
}



export {
    start,
    uploadFile
}