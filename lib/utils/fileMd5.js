"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileMd5 = function (filename) {
    var crypto = require('crypto');
    var fs = require('fs');
    var hash = crypto.createHash('md5');
    console.log(filename);
    return new Promise(function (resolve, reject) {
        var input = fs.createReadStream(filename);
        input.on('readable', function () {
            // Only one element is going to be produced by the
            // hash stream.
            var data = input.read();
            if (data)
                hash.update(data);
            else {
                resolve(hash.digest('hex'));
            }
        });
    });
};
// module.exports = fileMd5
exports.default = fileMd5;
