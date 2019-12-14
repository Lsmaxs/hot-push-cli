
const request = require('request-promise');
const fs = require('fs');

 async function uploadServer(name:string,filepath:any,options?:any){
    let {ossHost,ossKey,ossSavePath} = options
    let option = {
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
    return request(option)
}



export {
    uploadServer
}