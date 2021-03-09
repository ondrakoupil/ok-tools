"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('UrlCreator', function () {
    it('should work with basic input', function () {
        var urlCreator = src_1.createUrlCreator({
            urlBase: ['abc', 'def'],
        });
        var url1 = urlCreator('10');
        var url2 = urlCreator({ id: '103' });
        var url3 = urlCreator({ id: '104', url: 'xyz' });
        var url4 = urlCreator({ id: '105' }, 'pdef');
        var url5 = urlCreator('108', 'pdef');
        expect(url1.join('/')).toBe('/abc/def/10');
        expect(url2.join('/')).toBe('/abc/def/103');
        expect(url3.join('/')).toBe('/abc/def/104/xyz');
        expect(url4.join('/')).toBe('/abc/def/105/pdef');
        expect(url5.join('/')).toBe('/abc/def/108/pdef');
    });
    it('should work with advanced input', function () {
        var urlCreator = src_1.createUrlCreator({
            urlBase: ['abc', 'def'],
            slugKeyName: 'slug',
            idKeyName: 'number',
        });
        var url1 = urlCreator({ id: '10', number: '20', slug: 'slug', url: 'url' });
        var url2 = urlCreator({ id: '20', number: '30' });
        expect(url1.join('/')).toBe('/abc/def/20/slug');
        expect(url2.join('/')).toBe('/abc/def/30');
    });
});
//# sourceMappingURL=url-creator.spec.js.map