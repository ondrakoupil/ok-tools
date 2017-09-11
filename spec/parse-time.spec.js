"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse_time_1 = require("../src/parse-time");
describe('ParseTime function', function () {
    it('should accept date input', function () {
        var now = new Date();
        now.setHours(1);
        now.setDate(3);
        var res = parse_time_1.parseTime(now);
        expect(res.getTime()).toBe(now.getTime());
    });
    it('should accept number input', function () {
        var now = new Date();
        now.setHours(1);
        now.setDate(3);
        var res = parse_time_1.parseTime(now.getTime());
        expect(res.getTime()).toBe(now.getTime());
        res = parse_time_1.parseTime(1325502732);
        expect(res.getTime()).toBe(1325502732000);
        res = parse_time_1.parseTime('1325502732');
        expect(res.getTime()).toBe(1325502732000);
    });
    it('should accept various string inputs', function () {
        var res = parse_time_1.parseTime('2015-04-12');
        expect(res.getFullYear()).toBe(2015);
        expect(res.getDate()).toBe(12);
        expect(res.getMonth()).toBe(3);
        res = parse_time_1.parseTime('2015-04-12 15:12:16');
        expect(res.getFullYear()).toBe(2015);
        expect(res.getDate()).toBe(12);
        expect(res.getMonth()).toBe(3);
        expect(res.getHours()).toBe(15, 'Hours - parse string with time');
        expect(res.getMinutes()).toBe(12);
        expect(res.getSeconds()).toBe(16);
        res = parse_time_1.parseTime('2015-04-12T11:12:13');
        expect(res.getFullYear()).toBe(2015);
        expect(res.getDate()).toBe(12);
        expect(res.getMonth()).toBe(3);
        expect(res.getHours()).toBe(11, 'Hours - parse string with time and T');
        expect(res.getMinutes()).toBe(12);
        expect(res.getSeconds()).toBe(13);
    });
});
//# sourceMappingURL=parse-time.spec.js.map