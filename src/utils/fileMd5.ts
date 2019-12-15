


const fileMd5 =  (filename:string)  => {
  const crypto = require('crypto');
  const fs = require('fs');

  console.log(filename)
  return new Promise((resolve,reject)=>{

    const hash = crypto.createHash('md5');
    const input = fs.createReadStream(filename);
    input.on('readable', () => {
      // Only one element is going to be produced by the
      // hash stream.
      const data = input.read();
      if (data)
        hash.update(data);
      else {
        resolve(hash.digest('hex'));
      }
    });
    input.on('error',(err:Error)=>{
      reject(err)
    })
  })
  
}

// module.exports = fileMd5
export default fileMd5