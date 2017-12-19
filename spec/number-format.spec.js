"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var number_format_1 = require("../src/number-format");
describe('Function numberFormat()', function () {
    it('should properly format string', function () {
        var result;
        result = number_format_1.numberFormat(1234, 2);
        expect(result).toBe('1234.00');
        result = number_format_1.numberFormat(1234, 2);
        expect(result).toBe('1234.00');
        result = number_format_1.numberFormat(1234.232, 0);
        expect(result).toBe('1234');
        result = number_format_1.numberFormat('1234.932', 0);
        expect(result).toBe('1235');
        result = number_format_1.numberFormat(123456789, 0, '.', ' ');
        expect(result).toBe('123 456 789');
        result = number_format_1.numberFormat(1234567890, 0, '.', ' ');
        expect(result).toBe('1 234 567 890');
        result = number_format_1.numberFormat(12345, 0, '.', ',');
        expect(result).toBe('12,345');
        result = number_format_1.numberFormat(12345.56748, 3, ',', ' ');
        expect(result).toBe('12 345,567');
        result = number_format_1.numberFormat(12345.5674867, 5, ',', ' ');
        expect(result).toBe('12 345,56749');
        result = number_format_1.numberFormat(-123, 5, ',', ' ');
        expect(result).toBe('-123,00000');
        result = number_format_1.numberFormat(-123, 5, ',', ' ');
        expect(result).toBe('-123,00000');
        result = number_format_1.numberFormat(-123.24252, 2, ',', ' ');
        expect(result).toBe('-123,24');
        result = number_format_1.numberFormat(-1234567, 0, ',', ' ');
        expect(result).toBe('-1 234 567');
    });
});
//# sourceMappingURL=number-format.spec.js.map