"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urls_1 = require("../src/urls");
describe('humanizeUrl', function () {
    it('should convert URL', function () {
        var res;
        res = urls_1.humanizeUrl('https://www.hranostaj.cz');
        expect(res).toBe('www.hranostaj.cz');
        res = urls_1.humanizeUrl('HTTP://www.hranostaj.cz/game.html?aaa=10');
        expect(res).toBe('www.hranostaj.cz');
        res = urls_1.humanizeUrl(' httPS://www.hranostaj.cz/game.html?aaa=10&ss[]=2dsfs#ssaa  ');
        expect(res).toBe('www.hranostaj.cz');
    });
});
describe('technicalizeUrl', function () {
    it('should convert URL', function () {
        var res;
        res = urls_1.technicalizeUrl('www.hranostaj.cz');
        expect(res).toBe('http://www.hranostaj.cz');
        res = urls_1.technicalizeUrl('http://www.hranostaj.cz');
        expect(res).toBe('http://www.hranostaj.cz');
        res = urls_1.technicalizeUrl('https://www.hranostaj.cz');
        expect(res).toBe('https://www.hranostaj.cz');
        res = urls_1.technicalizeUrl('www.hranostaj.cz?ss=10&du[]=1223#ISSKss');
        expect(res).toBe('http://www.hranostaj.cz?ss=10&du[]=1223#ISSKss');
    });
});
//# sourceMappingURL=urls.spec.js.map