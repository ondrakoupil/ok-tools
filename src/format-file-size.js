"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var units = [
    'B',
    'kB',
    'MB',
    'GB',
    'TB',
    'PB'
];
function formatFileSize(bytes) {
    var unit = 0;
    var bytesSize = bytes;
    var inverted = false;
    if (bytesSize < 0) {
        bytesSize *= -1;
        inverted = true;
    }
    while (bytesSize >= 1000) {
        bytesSize /= 1000;
        unit++;
    }
    if (inverted) {
        bytesSize *= -1;
    }
    return Math.round(bytesSize) + ' ' + units[unit];
}
exports.formatFileSize = formatFileSize;
//# sourceMappingURL=format-file-size.js.map