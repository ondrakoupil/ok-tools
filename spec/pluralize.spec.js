"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pluralize_1 = require("../src/pluralize");
describe("Pluralize function", function () {
    it("should work as expected.", function pluralizeTest() {
        var result = pluralize_1.pluralize(1, 'A', 'B', 'c');
        expect(result).toBe('A');
        result = pluralize_1.pluralize(3, 'A', 'B', 'c');
        expect(result).toBe('B');
        result = pluralize_1.pluralize(7, 'A', 'B', 'c');
        expect(result).toBe('c');
        result = pluralize_1.pluralize(0, 'A', 'B', 'c');
        expect(result).toBe('c');
        result = pluralize_1.pluralize(-1, 'A', 'B', 'c');
        expect(result).toBe('A');
        result = pluralize_1.pluralize(-2, 'A', 'B', 'c');
        expect(result).toBe('B');
        result = pluralize_1.pluralize(-10, 'A', 'B', 'c');
        expect(result).toBe('c');
        result = pluralize_1.pluralize(1, '%% rohlík', '%% rohlíky', '%% rohlíků');
        expect(result).toBe('1 rohlík');
        result = pluralize_1.pluralize(2, '%% rohlík', '%% rohlíky', '%% rohlíků');
        expect(result).toBe('2 rohlíky');
        result = pluralize_1.pluralize(5, '%% rohlík', '%% rohlíky', '%% rohlíků');
        expect(result).toBe('5 rohlíků');
        result = pluralize_1.pluralize(10, 'XX%% rohlík', 'XX%% rohlíky', 'XX%% rohlíků', 'XX');
        expect(result).toBe('10%% rohlíků');
    });
    it("should cope with less args", function () {
        var result = pluralize_1.pluralize(10, 'A');
        expect(result).toBe('A');
        result = pluralize_1.pluralize(2, 'A');
        expect(result).toBe('A');
        result = pluralize_1.pluralize(2, 'A', 'B');
        expect(result).toBe('B');
        result = pluralize_1.pluralize(10, 'A', 'B');
        expect(result).toBe('B');
    });
    it("should accept array argument", function () {
        var result = pluralize_1.pluralize(3, ['a', 'b', 'c']);
        expect(result).toBe('b');
        result = pluralize_1.pluralize(10, ['X', 'Y']);
        expect(result).toBe('Y');
        result = pluralize_1.pluralize(10, ['X']);
        expect(result).toBe('X');
        result = pluralize_1.pluralize(1, ['X%%', 'Y%%', 'Z%%']);
        expect(result).toBe('X1');
        result = pluralize_1.pluralize(6, ['X', 'Z%%Z']);
        expect(result).toBe('Z6Z');
        result = pluralize_1.pluralize(3, ['X%%R']);
        expect(result).toBe('X3R');
        result = pluralize_1.pluralize(3, ['pX%%R'], 'p');
        expect(result).toBe('3X%%R');
        result = pluralize_1.pluralize(21, ['pX%%R', 'fpr%%', 'dpn%%h'], 'p');
        expect(result).toBe('d21n%%h');
    });
});
//# sourceMappingURL=pluralize.spec.js.map