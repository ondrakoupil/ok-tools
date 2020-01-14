"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var random_string_1 = require("../src/random-string");
describe('Function generateRandomIdentifier()', function () {
    it('should generate correct text', function () {
        var result;
        result = random_string_1.generateRandomIdentifier(4);
        expect(result).toMatch(/[0-9a-z]{4}/);
        result = random_string_1.generateRandomIdentifier(10);
        expect(result).toMatch(/[0-9a-z]{10}/);
        result = random_string_1.generateRandomIdentifier(0);
        expect(result).toBe('');
        result = random_string_1.generateRandomIdentifier(123);
        expect(result).toMatch(/[0-9a-z]{123}/);
        expect(function () {
            random_string_1.generateRandomIdentifier(-4);
        }).toThrow();
    });
});
//# sourceMappingURL=random-string.spec.js.map