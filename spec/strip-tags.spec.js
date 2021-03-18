"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var strip_tags_1 = require("../src/strip-tags");
describe('Function stripTags()', function () {
    it('should strip tags correctly.', function () {
        var result;
        result = strip_tags_1.stripTags('Hello world.');
        expect(result).toBe('Hello world.');
        result = strip_tags_1.stripTags('<p>Hello <b class="balabambam aaa">world</b>.</p>');
        expect(result).toBe('Hello world.');
        result = strip_tags_1.stripTags('Hel<br />lo <p><a href="asdg#sda:asdg&asdg=asdg" target="_blank">world</a>.</p>');
        expect(result).toBe('Hello world.');
        result = strip_tags_1.stripTags('10 > 5 and 5 < 10');
        expect(result).toBe('10 > 5 and 5 < 10');
        result = strip_tags_1.stripTags('5<10 and 10>5');
        expect(result).toBe('5<10 and 10>5');
    });
});
//# sourceMappingURL=strip-tags.spec.js.map