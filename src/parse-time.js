"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseTime(input) {
    var date;
    if (typeof input === 'string') {
        var number = parseInt(input, 10);
        if (!isNaN(number) && (number + '') === input) {
            input = number;
        }
    }
    switch (typeof input) {
        case 'object':
            if (!(input instanceof Date)) {
                throw new Error('Given input must be a Date, parsable string or a number timestamp.');
            }
            date = input;
            break;
        case 'string':
            var match = input.trim().match(/^(\d{4})-(\d{2})-(\d{2})(\s+(\d{2}):(\d{2}):(\d{2}))?$/);
            if (match) {
                input = match[2] + '/' + match[3] + '/' + match[1];
                if (match[4]) {
                    input += match[4];
                }
            }
            date = new Date(input);
            break;
        case 'number':
            var fixedInput = void 0;
            if (input < 2000000000) {
                fixedInput = input * 1000;
            }
            else {
                fixedInput = input;
            }
            date = new Date(fixedInput);
    }
    if (!date.getTime() || isNaN(date.getTime())) {
        throw new Error('Given input could not be parsed into a Date.');
    }
    return date;
}
exports.parseTime = parseTime;
//# sourceMappingURL=parse-time.js.map