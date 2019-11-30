
const archiver = require('archiver');
const path = require('path');
const fs = require('fs');

interface LabelledValue {
    version: string;
    config: any
}

const ZIP_DIR = path.join(process.cwd(), '/.zip');
const isExists_zip = fs.existsSync(ZIP_DIR);
if (!isExists_zip) {
    fs.mkdirSync(ZIP_DIR);
}

const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
function bytesToSize(bytes: number) {
    if (bytes === 0) {
        return '0 Byte';
    }
    let i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`);
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + SIZES[i];
}

const zip = (configObj: LabelledValue) => {
    const { version, config } = configObj;
    return new Promise((resolve, rejects) => {
        const { type, zipPath } = config;
        const ZIP_PATH_TO = path.join(ZIP_DIR, type);

        console.log(`压缩目录: ${zipPath}`)
        console.log(`压缩地址: ${ZIP_PATH_TO}`);

        const exists_zip_type_path = fs.existsSync(ZIP_PATH_TO);
        if (!exists_zip_type_path) {
            fs.mkdirSync(ZIP_PATH_TO)
        }

        const archive = archiver('zip', {
            zlib: {
                level: 9
            }
        })

        const ZIP_PATH = path.join(ZIP_PATH_TO + `/rn-${version + type}.zip`);
        const ZIP_OUTPUT_STREAM = fs.createWriteStream(ZIP_PATH);

        ZIP_OUTPUT_STREAM.on('close', function () {
            process.stdout.write("\n");
            console.log(`压缩完成, 压缩后size：${bytesToSize(archive.pointer())}`);
            resolve(ZIP_PATH);
        })

        ZIP_OUTPUT_STREAM.on('end', function () {
            console.log('Data has been drained');
            resolve();
        });

        archive.on('progress', function (data: any) {
            const { entries, fs } = data;
            const { total, processed } = entries;
            const { totalBytes, processedBytes } = fs;
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(`共${total}文件/${totalBytes}字节，已处理${processed}文件/${processedBytes}字节`);
        })

        archive.on('error', function (err:Error) {
            throw err;
        });

        archive.pipe(ZIP_OUTPUT_STREAM);
        archive.glob('**/*', {
            cwd: zipPath,
            dot: false,
            matchBase: true
        });

        archive.finalize();

    })
}


export default async (configObj: LabelledValue) => {
    return await zip(configObj)
};