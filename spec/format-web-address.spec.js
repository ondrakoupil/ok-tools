"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_address_formatter_1 = require("../src/web-address-formatter");
describe('formatWebAddress function', function () {
    it('should convert strings correctly.', function () {
        var input = 'https://www.hranostaj.cz/ahoj.html';
        expect(web_address_formatter_1.formatWebAddress(input, 'link')).toBe('https://www.hranostaj.cz/ahoj.html');
        expect(web_address_formatter_1.formatWebAddress(input, 'short')).toBe('www.hranostaj.cz');
        expect(web_address_formatter_1.formatWebAddress(input, 'full')).toBe('www.hranostaj.cz/ahoj.html');
        input = 'http://www.hranostaj.cz/';
        expect(web_address_formatter_1.formatWebAddress(input, 'link')).toBe('http://www.hranostaj.cz/');
        expect(web_address_formatter_1.formatWebAddress(input, 'short')).toBe('www.hranostaj.cz');
        expect(web_address_formatter_1.formatWebAddress(input, 'full')).toBe('www.hranostaj.cz');
        input = 'https://www.hranostaj.cz';
        expect(web_address_formatter_1.formatWebAddress(input, 'link')).toBe('https://www.hranostaj.cz/');
        expect(web_address_formatter_1.formatWebAddress(input, 'short')).toBe('www.hranostaj.cz');
        expect(web_address_formatter_1.formatWebAddress(input, 'full')).toBe('www.hranostaj.cz');
        input = 'hranostaj.cz/search';
        expect(web_address_formatter_1.formatWebAddress(input, 'link')).toBe('http://hranostaj.cz/search');
        expect(web_address_formatter_1.formatWebAddress(input, 'short')).toBe('hranostaj.cz');
        expect(web_address_formatter_1.formatWebAddress(input, 'full')).toBe('hranostaj.cz/search');
        expect(web_address_formatter_1.formatWebAddress(input, 'link', 'https')).toBe('https://hranostaj.cz/search');
        expect(web_address_formatter_1.formatWebAddress(input, 'short', 'https')).toBe('hranostaj.cz');
        expect(web_address_formatter_1.formatWebAddress(input, 'full', 'https')).toBe('hranostaj.cz/search');
        input = 'ftp://1.2.3.4:80@ahoj:password/1/2/3/4/5/6';
        expect(web_address_formatter_1.formatWebAddress(input, 'link', 'https')).toBe('ftp://1.2.3.4:80@ahoj:password/1/2/3/4/5/6');
        expect(web_address_formatter_1.formatWebAddress(input, 'short', 'https')).toBe('1.2.3.4:80@ahoj:password');
        expect(web_address_formatter_1.formatWebAddress(input, 'full', 'https')).toBe('1.2.3.4:80@ahoj:password/1/2/3/4/5/6');
    });
});
//# sourceMappingURL=format-web-address.spec.js.map