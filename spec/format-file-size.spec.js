"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var format_file_size_1 = require("../src/format-file-size");
describe('Function formatFileSize()', function () {
    it('should format size correctly.', function () {
        var result;
        result = format_file_size_1.formatFileSize(100);
        expect(result).toBe('100 B');
        result = format_file_size_1.formatFileSize(104.234);
        expect(result).toBe('104 B');
        result = format_file_size_1.formatFileSize(104.894);
        expect(result).toBe('105 B');
        result = format_file_size_1.formatFileSize(2048);
        expect(result).toBe('2 kB');
        result = format_file_size_1.formatFileSize(41432381);
        expect(result).toBe('41 MB');
        result = format_file_size_1.formatFileSize(3894738);
        expect(result).toBe('4 MB');
        result = format_file_size_1.formatFileSize(1000000000);
        expect(result).toBe('1 GB');
        result = format_file_size_1.formatFileSize(1000000000000);
        expect(result).toBe('1 TB');
        result = format_file_size_1.formatFileSize(0);
        expect(result).toBe('0 B');
        result = format_file_size_1.formatFileSize(-2736628);
        expect(result).toBe('-3 MB');
        result = format_file_size_1.formatFileSize(-1243);
        expect(result).toBe('-1 kB');
        result = format_file_size_1.formatFileSize(-8765433);
        expect(result).toBe('-9 MB');
    });
});
//# sourceMappingURL=format-file-size.spec.js.map