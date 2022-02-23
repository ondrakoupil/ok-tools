"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paginator_1 = require("../src/paginator");
describe('Function paginatorSequence()', function () {
    it('should generate paginator sequence', function () {
        var result;
        result = paginator_1.paginatorSequence(5, 5, 100);
        expect(result).toEqual([1, 2, 3, 4, 5]);
        result = paginator_1.paginatorSequence(10, 5, 100);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        result = paginator_1.paginatorSequence(12, 6, 7);
        expect(result).toEqual([1, null, 4, 5, 6, 7, 8, null, 12]);
        result = paginator_1.paginatorSequence(12, 6, 9);
        expect(result).toEqual([1, 2, null, 4, 5, 6, 7, 8, null, 11, 12]);
        result = paginator_1.paginatorSequence(12, 6, 9, false);
        expect(result).toEqual([1, 2, 4, 5, 6, 7, 8, 11, 12]);
    });
});
//# sourceMappingURL=paginator.spec.js.map