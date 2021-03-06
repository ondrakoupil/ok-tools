"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatWebAddress(input, mode, defaultScheme) {
    if (mode === void 0) { mode = 'link'; }
    if (defaultScheme === void 0) { defaultScheme = 'http'; }
    var domain = '';
    var scheme = '';
    var path = '';
    var match = input.match(/^\s*((\w{3,10}):\/\/)?([^\/]+)(\/(.*))?$/);
    if (match) {
        scheme = match[2] || '';
        domain = match[3] || '';
        path = match[5] || '';
        if (!scheme) {
            scheme = defaultScheme;
        }
        switch (mode) {
            case 'link':
                return scheme + '://' + domain + '/' + path;
            case 'full':
                return domain + (path ? ('/' + path) : '');
            case 'short':
                return domain;
        }
    }
    return '';
}
exports.formatWebAddress = formatWebAddress;
//# sourceMappingURL=web-address-formatter.js.map