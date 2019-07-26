"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null), t);
    });
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map