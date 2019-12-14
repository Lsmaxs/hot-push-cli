import utils from ".";
const path = require('path');
const fs = require('fs-extra');
// const commander = require('commander');
const os = require('os');

const CONFIG_FILE = path.resolve('./.hotpush-base-config.json');
const CONFIG_OPTIONLIST = ['token','env','name'];

async function readConfig(){
    let config;
   utils.logRed(CONFIG_FILE)
    if(!config){
        try{
            config = await fs.readJson(CONFIG_FILE);
        }catch(err){
            config = { token:'',name:'zzc' };
            await fs.writeJson(CONFIG_FILE,config)
        }
    }

    return config 
}

async function getConfig (key?:string){
    const config = await readConfig();
    if(key) return config[key];
    return config
}

async function setConfig(key:string,val?:string|number){
    if(!CONFIG_OPTIONLIST.includes(key)){
        utils.logRed(`无效配置项 ${key}`)
        process.exit()
    }

    let config = await readConfig()
    if(key && val){
        config[key] = val;
        await fs.writeJson(CONFIG_FILE,config,'utf-8')
    }
    return config

}

async function initConfig(){
    
    let configKey;
    let configVal;
    let config;
    let rm;
    if(!configKey){
        config = await getConfig();
        return utils.baseLog(config);
    }

    if(rm){
        await removeConfig(configKey)
        return 
    } 
    if(!configVal){
        config = await setConfig(configKey)
        return utils.baseLog(config)
    }
    if (configKey && configVal) {
        config = await setConfig(configKey, configVal)
        utils.baseLog(config)
    }
    
}

async function removeConfig(key:string){
    let config = await readConfig();
    delete config[key];
    await fs.writeJson(CONFIG_FILE,config,'utf-8')
}

export {
    initConfig,
    getConfig,
    setConfig
}