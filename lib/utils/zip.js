"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var archiver = require('archiver');
var path = require('path');
var fs = require('fs');
var ZIP_DIR = path.join(process.cwd(), '/.zip');
var isExists_zip = fs.existsSync(ZIP_DIR);
if (!isExists_zip) {
    fs.mkdirSync(ZIP_DIR);
}
var SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
function bytesToSize(bytes) {
    if (bytes === 0) {
        return '0 Byte';
    }
    var i = parseInt("" + Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + SIZES[i];
}
var zip = function (configObj) {
    var version = configObj.version, config = configObj.config;
    return new Promise(function (resolve, rejects) {
        var type = config.type, zipPath = config.zipPath;
        var ZIP_PATH_TO = path.join(ZIP_DIR, type);
        console.log("\u538B\u7F29\u76EE\u5F55: " + zipPath);
        console.log("\u538B\u7F29\u5730\u5740: " + ZIP_PATH_TO);
        var exists_zip_type_path = fs.existsSync(ZIP_PATH_TO);
        if (!exists_zip_type_path) {
            fs.mkdirSync(ZIP_PATH_TO);
        }
        var archive = archiver('zip', {
            zlib: {
                level: 9
            }
        });
        var ZIP_PATH = path.join(ZIP_PATH_TO + ("/rn-" + (version + type) + ".zip"));
        var ZIP_OUTPUT_STREAM = fs.createWriteStream(ZIP_PATH);
        ZIP_OUTPUT_STREAM.on('close', function () {
            process.stdout.write("\n");
            console.log("\u538B\u7F29\u5B8C\u6210, \u538B\u7F29\u540Esize\uFF1A" + bytesToSize(archive.pointer()));
            resolve(ZIP_PATH);
        });
        ZIP_OUTPUT_STREAM.on('end', function () {
            console.log('Data has been drained');
            resolve();
        });
        archive.on('progress', function (data) {
            var entries = data.entries, fs = data.fs;
            var total = entries.total, processed = entries.processed;
            var totalBytes = fs.totalBytes, processedBytes = fs.processedBytes;
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write("\u5171" + total + "\u6587\u4EF6/" + totalBytes + "\u5B57\u8282\uFF0C\u5DF2\u5904\u7406" + processed + "\u6587\u4EF6/" + processedBytes + "\u5B57\u8282");
        });
        archive.on('error', function (err) {
            throw err;
        });
        archive.pipe(ZIP_OUTPUT_STREAM);
        archive.glob('**/*', {
            cwd: zipPath,
            dot: false,
            matchBase: true
        });
        archive.finalize();
    });
};
exports.default = (function (configObj) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, zip(configObj)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
