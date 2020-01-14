"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(t) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(); }, t);
    });
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map