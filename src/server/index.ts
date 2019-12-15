

const request = require('request');
const fs = require('fs');

interface serverType{
    code: number | string,
    data: any,
    msg?: string,
    message?: string
}


function promiseRequest(option:object):Promise<serverType>{
    return new Promise((resolve,reject)=>{
        request(option, (error:Error, response:any, body:any) => {
            if ( error) {
                throw error;
            }
            body = JSON.parse(body);
            if ( body.code == 200 ) {
                console.log(`上传成功`);
                resolve(body);
            } else {
                reject(body)
            }
        })
    }) 
}

function uploadServer(name:string,filepath:any,options?:any){
    const {ossHost,ossKey,ossSavePath} = options;
    const option = {
        method: "POST",
        url: ossHost,
        headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'multipart/form-data'
        },
        formData:{
            ossSavePath,
            ossAccessKeyId: ossKey,
            file: {
                value: fs.createReadStream(filepath),
                options: {
                    filename: name,
                }
            }
        }
        
    }
    return promiseRequest(option);
}


function packagePushServer({ token = '', ...requestData}){
    const option = {
        method: "POST",
        url: 'http://tech.zuzuche.com/rn/push/add',
        headers: {
            'hotpush-token': token,
            'Content-Type': 'application/json'
        },
        requestData
        
    }
    return promiseRequest(option);

}


export {
    uploadServer,
    packagePushServer
}