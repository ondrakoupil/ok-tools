"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function numberFormat(input, decimals, decPoint, thousandsSep) {
    if (decimals === void 0) { decimals = 0; }
    if (decPoint === void 0) { decPoint = '.'; }
    if (thousandsSep === void 0) { thousandsSep = ''; }
    if (typeof input === 'string') {
        input = parseFloat(input);
        if (isNaN(input)) {
            input = 0;
        }
    }
    var number = input + '';
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number;
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    var sep = thousandsSep;
    var dec = decPoint;
    var s = [];
    var toFixedFix = function (num, precision) {
        var k = Math.pow(10, prec);
        return '' + (Math.round(num * k) / k)
            .toFixed(precision);
    };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
exports.numberFormat = numberFormat;
//# sourceMappingURL=number-format.js.map