"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shorten = void 0;
function shorten(input, maxLength, wholeWords, addedString) {
    if (wholeWords === void 0) { wholeWords = true; }
    if (addedString === void 0) { addedString = ''; }
    if (input.length <= maxLength) {
        return input;
    }
    if (!wholeWords) {
        return input.substr(0, maxLength - addedString.length).trim() + addedString;
    }
    var strippedPart = input.substr(0, maxLength - addedString.length + 1);
    var matches = strippedPart.match(/(.*)[\W]\w*$/);
    if (matches) {
        return matches[1].trim() + addedString;
    }
    else {
        return shorten(input, maxLength, false, addedString);
    }
}
exports.shorten = shorten;
//# sourceMappingURL=shorten.js.map