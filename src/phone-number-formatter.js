"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function phoneNumberFormatter(input, international, spaces, internationalPrefix, defaultInternational) {
    if (international === void 0) { international = true; }
    if (spaces === void 0) { spaces = ''; }
    if (internationalPrefix === void 0) { internationalPrefix = '+'; }
    if (defaultInternational === void 0) { defaultInternational = '420'; }
    if (!input) {
        return '';
    }
    var filteredInput = input.replace(/\D/g, '');
    var parsedInternational = '';
    var parsedMain = '';
    if (filteredInput.length > 9) {
        parsedInternational = filteredInput.substr(0, filteredInput.length - 9);
        parsedMain = filteredInput.substr(filteredInput.length - 9);
    }
    else {
        parsedMain = filteredInput;
    }
    if (internationalPrefix) {
        var escapedPrefix = internationalPrefix.replace(/([\[\\^$.|?*+()])/g, '\\$1');
        var regexpPrefix = new RegExp('^' + escapedPrefix, 'i');
        if (parsedInternational.match(regexpPrefix)) {
            parsedInternational = parsedInternational.substr(internationalPrefix.length);
        }
    }
    var spacedMain = '';
    if (spaces) {
        var len = parsedMain.length;
        for (var i = len; i > -3; i -= 3) {
            spacedMain = parsedMain.substr((i >= 0 ? i : 0), (i >= 0 ? 3 : (3 - i * -1)))
                + (spacedMain ? (spaces + spacedMain) : '');
        }
    }
    else {
        spacedMain = parsedMain;
    }
    var output = '';
    if (international) {
        if (!parsedInternational) {
            parsedInternational = defaultInternational;
        }
        output += internationalPrefix + parsedInternational;
        if (spaces) {
            output += spaces;
        }
    }
    output += spacedMain;
    return output;
}
exports.phoneNumberFormatter = phoneNumberFormatter;
//# sourceMappingURL=phone-number-formatter.js.map