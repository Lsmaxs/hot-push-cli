
import fileMd5 from '../utils/fileMd5';
import {initConfig,getConfig} from '../utils/config'
import utils from '../utils';
import {uploadServer,packagePushServer} from '../server'
import { hostname } from 'os';
const fs = require('fs-extra');
const path = require('path');


const CWD = process.cwd();

// interface CONFIGTYPE {
//     token: string|null
// }

let CONFIG:any ;

async function getMergeConfig(){
    let config = await getConfig();

    let cwd_config_json = path.resolve(CWD,'./hotpush.config.json');
    let cwd_package_json = path.resolve(CWD,'package.json');
    let settingConfig
    let packageConfig 

    if(fs.existsSync(cwd_config_json)){
        settingConfig = await fs.readJson(cwd_config_json)
        packageConfig = await fs.readJson(cwd_package_json)
        config = Object.assign({},config,settingConfig,{
            rnVersion:  packageConfig['version']
        });
    }else{
        utils.logRed('请检查目录是否存在默认配置文件 hotpush.config.json')
        process.exit();
    }
    
    if(!config['token']){
        utils.logRed(`请登录hotpush 或者 配置token`)
        process.exit()
    }

    CONFIG = config;
    // if(CONFIG){
    //     await fs.writeFileSync(path.resolve(CWD,'./.hotpush-base-config.json'),JSON.stringify(CONFIG,null,"\t"))
    // }
    utils.logGreen(CONFIG);
    
}   


async function getFileMd5(filePath:string){
    if(!filePath){
        return null;
    }
    let filemd5Name = await fileMd5(filePath)
    console.log('getFileMd5',filemd5Name)
    return filemd5Name
}


async function uploadFile(filePath:string){

    const CWD_FILE_PATH = path.resolve(CWD,filePath);
    const ext = path.extname(filePath)
    const fileMd5 = await getFileMd5(CWD_FILE_PATH);
    const {appName,rnName,rnVersion,ossKey,ossHost} = CONFIG;
    let config = Object.assign({},{
        ossKey,
        ossSavePath: `${appName}/${rnName}/${rnVersion}/`,
        // ossHost: `http://localhost:6001/api/ossSimpleUpload`,
        ossHost
    })
   
    try{
        let resutl = await uploadServer(`${fileMd5}${ext}`,CWD_FILE_PATH,config)
        
        if(resutl.code != 200 ){
            utils.logRed(resutl.msg)
            return false
        }
        utils.logGreen(resutl.msg);
        return {
            packagePath: resutl.data['uploadSuccess'][0],
            md5: fileMd5
        }
    }catch (error){
        utils.logRed(error.msg)
        return false
    }

    
}

interface packagePushType{
    filePath: string,
    description: string,
    platform: string
}

async function packagePush(options:packagePushType){
    let { filePath,description,platform } =  options;
   
    await getMergeConfig();

    const {appName,rnName,rnVersion,targetVersion,deployment,mandatory,token} = CONFIG;

    if(!fs.existsSync(filePath)) {
        utils.logRed(`不存在此文件`);
        return false
    }
    
    const ossUploadInfo = await uploadFile(filePath);
    // const ossUploadInfo = { 
    //     packagePath: 'http://static.zuzuche.com/assets/test/zzc/rn-list/1.0.0/ab878649a6f5572d1888f574b31eb844.zip',
    //     md5: 'ab878649a6f5572d1888f574b31eb844' 
    // };

    // console.log(CONFIG,ossUploadInfo)

    if(!ossUploadInfo){
        utils.logRed(`压缩包推送失败`);
        return false
    }
    
    let parmas = Object.assign({
        appName,
        rnName,
        rnVersion,
        targetVersion,
        deployment,
        mandatory,
        token
    },{
        description,
        platform,
        md5:ossUploadInfo['md5'],
        packagePath: ossUploadInfo['packagePath']
    }) 
    
    console.log('packagePushServer====',parmas)
    try{
        let result = await packagePushServer(parmas)

        utils.logRed(result.message)
    }catch (err){
        utils.logRed(err.message)
        return false
    }
   
}


export {
    getFileMd5,
    uploadFile,
    packagePush
}