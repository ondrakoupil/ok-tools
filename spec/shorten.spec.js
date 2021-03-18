"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shorten_1 = require("../src/shorten");
describe('Function shorten()', function () {
    it('should change text', function () {
        var result;
        // Keep short text unchanged
        result = shorten_1.shorten('Hello, world!', 1000);
        expect(result).toBe('Hello, world!');
        result = shorten_1.shorten('Hello, world!', 1000, false);
        expect(result).toBe('Hello, world!');
        result = shorten_1.shorten('Hello, world!', 1000, true, 'xxx');
        expect(result).toBe('Hello, world!');
        result = shorten_1.shorten('Hello, world!', 1000, false, 'xxx');
        expect(result).toBe('Hello, world!');
        result = shorten_1.shorten('Hello, world!', 1000, false, '');
        expect(result).toBe('Hello, world!');
        // Shorten
        result = shorten_1.shorten('Hello dear world, how are you?', 12);
        expect(result).toBe('Hello dear');
        result = shorten_1.shorten('Hello dear world, how are you?', 16);
        expect(result).toBe('Hello dear world');
        result = shorten_1.shorten('Hello dear world, how are you?', 13, false);
        expect(result).toBe('Hello dear wo');
        result = shorten_1.shorten('Hello dear world, how are you?', 13, true, '...');
        expect(result).toBe('Hello dear...');
        result = shorten_1.shorten('Hello dear world, how are you?', 12, true, '...');
        expect(result).toBe('Hello...');
        result = shorten_1.shorten('Hello dear world, how are you?', 16, true, '...');
        expect(result).toBe('Hello dear...');
        result = shorten_1.shorten('Hello dear world, how are you?', 16, true, '');
        expect(result).toBe('Hello dear world');
    });
});
//# sourceMappingURL=shorten.spec.js.map