"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
};
function specChars(input) {
    return input.replace(/[&<>"']/g, function (m) { return map[m]; });
}
exports.specChars = specChars;
