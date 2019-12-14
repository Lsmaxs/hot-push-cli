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
var _1 = __importDefault(require("."));
var path = require('path');
var fs = require('fs-extra');
// const commander = require('commander');
var os = require('os');
var CONFIG_FILE = path.resolve('./.hotpush-base-config.json');
var CONFIG_OPTIONLIST = ['token', 'env', 'name'];
function readConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var config, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _1.default.logRed(CONFIG_FILE);
                    if (!!config) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, fs.readJson(CONFIG_FILE)];
                case 2:
                    config = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    config = { token: '', name: 'zzc' };
                    return [4 /*yield*/, fs.writeJson(CONFIG_FILE, config)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, config];
            }
        });
    });
}
function getConfig(key) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readConfig()];
                case 1:
                    config = _a.sent();
                    if (key)
                        return [2 /*return*/, config[key]];
                    return [2 /*return*/, config];
            }
        });
    });
}
exports.getConfig = getConfig;
function setConfig(key, val) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!CONFIG_OPTIONLIST.includes(key)) {
                        _1.default.logRed("\u65E0\u6548\u914D\u7F6E\u9879 " + key);
                        process.exit();
                    }
                    return [4 /*yield*/, readConfig()];
                case 1:
                    config = _a.sent();
                    if (!(key && val)) return [3 /*break*/, 3];
                    config[key] = val;
                    return [4 /*yield*/, fs.writeJson(CONFIG_FILE, config, 'utf-8')];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, config];
            }
        });
    });
}
exports.setConfig = setConfig;
function initConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var configKey, configVal, config, rm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!configKey) return [3 /*break*/, 2];
                    return [4 /*yield*/, getConfig()];
                case 1:
                    config = _a.sent();
                    return [2 /*return*/, _1.default.baseLog(config)];
                case 2:
                    if (!rm) return [3 /*break*/, 4];
                    return [4 /*yield*/, removeConfig(configKey)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
                case 4:
                    if (!!configVal) return [3 /*break*/, 6];
                    return [4 /*yield*/, setConfig(configKey)];
                case 5:
                    config = _a.sent();
                    return [2 /*return*/, _1.default.baseLog(config)];
                case 6:
                    if (!(configKey && configVal)) return [3 /*break*/, 8];
                    return [4 /*yield*/, setConfig(configKey, configVal)];
                case 7:
                    config = _a.sent();
                    _1.default.baseLog(config);
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.initConfig = initConfig;
function removeConfig(key) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readConfig()];
                case 1:
                    config = _a.sent();
                    delete config[key];
                    return [4 /*yield*/, fs.writeJson(CONFIG_FILE, config, 'utf-8')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
