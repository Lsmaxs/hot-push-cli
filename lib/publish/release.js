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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileMd5_1 = __importDefault(require("../utils/fileMd5"));
var config_1 = require("../utils/config");
var utils_1 = __importDefault(require("../utils"));
var server_1 = require("../server");
var fs = require('fs-extra');
var path = require('path');
var CWD = process.cwd();
// interface CONFIGTYPE {
//     token: string|null
// }
var CONFIG;
function getMergeConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var config, cwd_config_json, cwd_package_json, settingConfig, packageConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, config_1.getConfig()];
                case 1:
                    config = _a.sent();
                    cwd_config_json = path.resolve(CWD, './hotpush.config.json');
                    cwd_package_json = path.resolve(CWD, 'package.json');
                    if (!fs.existsSync(cwd_config_json)) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.readJson(cwd_config_json)];
                case 2:
                    settingConfig = _a.sent();
                    return [4 /*yield*/, fs.readJson(cwd_package_json)];
                case 3:
                    packageConfig = _a.sent();
                    config = Object.assign({}, config, settingConfig, {
                        rnVersion: packageConfig['version']
                    });
                    return [3 /*break*/, 5];
                case 4:
                    utils_1.default.logRed('请检查目录是否存在默认配置文件 hotpush.config.json');
                    process.exit();
                    _a.label = 5;
                case 5:
                    if (!config['token']) {
                        utils_1.default.logRed("\u8BF7\u767B\u5F55hotpush \u6216\u8005 \u914D\u7F6Etoken");
                        process.exit();
                    }
                    CONFIG = config;
                    // if(CONFIG){
                    //     await fs.writeFileSync(path.resolve(CWD,'./.hotpush-base-config.json'),JSON.stringify(CONFIG,null,"\t"))
                    // }
                    utils_1.default.logGreen(CONFIG);
                    return [2 /*return*/];
            }
        });
    });
}
function getFileMd5(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var filemd5Name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!filePath) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, fileMd5_1.default(filePath)];
                case 1:
                    filemd5Name = _a.sent();
                    console.log('getFileMd5', filemd5Name);
                    return [2 /*return*/, filemd5Name];
            }
        });
    });
}
exports.getFileMd5 = getFileMd5;
function uploadFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var CWD_FILE_PATH, ext, fileMd5, appName, rnName, rnVersion, ossKey, ossHost, config, resutl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CWD_FILE_PATH = path.resolve(CWD, filePath);
                    ext = path.extname(filePath);
                    return [4 /*yield*/, getFileMd5(CWD_FILE_PATH)];
                case 1:
                    fileMd5 = _a.sent();
                    appName = CONFIG.appName, rnName = CONFIG.rnName, rnVersion = CONFIG.rnVersion, ossKey = CONFIG.ossKey, ossHost = CONFIG.ossHost;
                    config = Object.assign({}, {
                        ossKey: ossKey,
                        ossSavePath: appName + "/" + rnName + "/" + rnVersion + "/",
                        // ossHost: `http://localhost:6001/api/ossSimpleUpload`,
                        ossHost: ossHost
                    });
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, server_1.uploadServer("" + fileMd5 + ext, CWD_FILE_PATH, config)];
                case 3:
                    resutl = _a.sent();
                    if (resutl.code != 200) {
                        utils_1.default.logRed(resutl.msg);
                        return [2 /*return*/, false];
                    }
                    utils_1.default.logGreen(resutl.msg);
                    return [2 /*return*/, {
                            packagePath: resutl.data['uploadSuccess'][0],
                            md5: fileMd5
                        }];
                case 4:
                    error_1 = _a.sent();
                    utils_1.default.logRed(error_1.msg);
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.uploadFile = uploadFile;
function packagePush(options) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, description, platform, appName, rnName, rnVersion, targetVersion, deployment, mandatory, token, ossUploadInfo, parmas, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = options.filePath, description = options.description, platform = options.platform;
                    return [4 /*yield*/, getMergeConfig()];
                case 1:
                    _a.sent();
                    appName = CONFIG.appName, rnName = CONFIG.rnName, rnVersion = CONFIG.rnVersion, targetVersion = CONFIG.targetVersion, deployment = CONFIG.deployment, mandatory = CONFIG.mandatory, token = CONFIG.token;
                    if (!fs.existsSync(filePath)) {
                        utils_1.default.logRed("\u4E0D\u5B58\u5728\u6B64\u6587\u4EF6");
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, uploadFile(filePath)];
                case 2:
                    ossUploadInfo = _a.sent();
                    // const ossUploadInfo = { 
                    //     packagePath: 'http://static.zuzuche.com/assets/test/zzc/rn-list/1.0.0/ab878649a6f5572d1888f574b31eb844.zip',
                    //     md5: 'ab878649a6f5572d1888f574b31eb844' 
                    // };
                    // console.log(CONFIG,ossUploadInfo)
                    if (!ossUploadInfo) {
                        utils_1.default.logRed("\u538B\u7F29\u5305\u63A8\u9001\u5931\u8D25");
                        return [2 /*return*/, false];
                    }
                    parmas = Object.assign({
                        appName: appName,
                        rnName: rnName,
                        rnVersion: rnVersion,
                        targetVersion: targetVersion,
                        deployment: deployment,
                        mandatory: mandatory,
                        token: token
                    }, {
                        description: description,
                        platform: platform,
                        md5: ossUploadInfo['md5'],
                        packagePath: ossUploadInfo['packagePath']
                    });
                    console.log('packagePushServer====', parmas);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, server_1.packagePushServer(parmas)];
                case 4:
                    result = _a.sent();
                    utils_1.default.logRed(result.message);
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    utils_1.default.logRed(err_1.message);
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.packagePush = packagePush;
