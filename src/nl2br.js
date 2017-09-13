"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nl2br(input) {
    var output = input;
    output = output.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2');
    return output;
}
exports.nl2br = nl2br;
//# sourceMappingURL=nl2br.js.map