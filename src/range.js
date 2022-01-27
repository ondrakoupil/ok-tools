"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
function range(from, to, step) {
    if (step === void 0) { step = 1; }
    if (to === undefined && step === 1) {
        to = from - 1;
        from = 0;
    }
    if (from > to) {
        throw new Error('[from] must be less than [to]');
    }
    var count = Math.floor((to - from) / step);
    var a = Array(count);
    for (var i = from, index = 0; i <= to; i += step, index++) {
        a[index] = i;
    }
    return a;
}
exports.range = range;
//# sourceMappingURL=range.js.map