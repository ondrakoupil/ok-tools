"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spec_chars_1 = require("../src/spec-chars");
describe('function specChars', function () {
    it('should convert chars correctly.', function () {
        var result;
        result = spec_chars_1.specChars('Say "No" to <b>brown</b> M&M\'s!');
        expect(result).toBe('Say &quot;No&quot; to &lt;b&gt;brown&lt;/b&gt; M&amp;M&#039;s!');
    });
});
