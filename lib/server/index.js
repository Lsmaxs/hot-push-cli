"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var fs = require('fs');
function promiseRequest(option) {
    return new Promise(function (resolve, reject) {
        request(option, function (error, response, body) {
            if (error) {
                throw error;
            }
            body = JSON.parse(body);
            if (body.code == 200) {
                console.log("\u4E0A\u4F20\u6210\u529F");
                resolve(body);
            }
            else {
                reject(body);
            }
        });
    });
}
function uploadServer(name, filepath, options) {
    var ossHost = options.ossHost, ossKey = options.ossKey, ossSavePath = options.ossSavePath;
    var option = {
        method: "POST",
        url: ossHost,
        headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'multipart/form-data'
        },
        formData: {
            ossSavePath: ossSavePath,
            ossAccessKeyId: ossKey,
            file: {
                value: fs.createReadStream(filepath),
                options: {
                    filename: name,
                }
            }
        }
    };
    return promiseRequest(option);
}
exports.uploadServer = uploadServer;
function packagePushServer(_a) {
    var _b = _a.token, token = _b === void 0 ? '' : _b, requestData = __rest(_a, ["token"]);
    var option = {
        method: "POST",
        url: 'http://tech.zuzuche.com/rn/push/add',
        headers: {
            'hotpush-token': token,
            'Content-Type': 'application/json'
        },
        requestData: requestData
    };
    return promiseRequest(option);
}
exports.packagePushServer = packagePushServer;
