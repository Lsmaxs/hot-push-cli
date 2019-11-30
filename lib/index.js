"use strict";
var Test = /** @class */ (function () {
    function Test(options) {
        this.val = options.name || '';
        this.init();
    }
    Test.prototype.init = function () {
        return this.val;
    };
    return Test;
}());
