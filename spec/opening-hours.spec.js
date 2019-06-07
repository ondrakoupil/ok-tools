"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oh = require("../src/opening-hours");
var opening_hours_1 = require("../src/opening-hours");
describe('Opening hours calculator', function () {
    it('should parse hours', function () {
        expect(oh.parseHour('10')).toBe(10);
        expect(oh.parseHour(' 10 ')).toBe(10);
        expect(oh.parseHour(' 10a:30b')).toBe(10.5);
        expect(oh.parseHour('10:30')).toBe(10.5);
        expect(oh.parseHour('05:00')).toBe(5);
        expect(oh.parseHour('14:06')).toBe(14.1);
        expect(oh.parseHour('14:80')).toBe(15);
        expect(oh.parseHour('24:30')).toBe(24);
        expect(oh.parseHour('1')).toBe(1);
        expect(oh.parseHour('100')).toBe(24);
        expect(oh.parseHour('10.30')).toBe(10.5);
        expect(oh.parseHour('10:30')).toBe(10.5);
        expect(function () { return oh.parseHour('abc'); }).toThrow();
        expect(function () { return oh.parseHour('10:20:30'); }).toThrow();
        expect(function () { return oh.parseHour('10:a'); }).toThrow();
        expect(function () { return oh.parseHour('a:10'); }).toThrow();
    });
    it('should format hours', function () {
        expect(oh.formatHour(10)).toBe('10:00');
        expect(oh.formatHour(5)).toBe('05:00');
        expect(oh.formatHour(0)).toBe('00:00');
        expect(oh.formatHour(24)).toBe('24:00');
        expect(oh.formatHour(5.5)).toBe('05:30');
        expect(oh.formatHour(10.25)).toBe('10:15');
        expect(oh.formatHour(11.75)).toBe('11:45');
    });
    it('should parse intervals', function () {
        expect(oh.parseInterval(' 10 - 12 ')).toEqual({ open: 10, close: 12 });
        expect(oh.parseInterval('10-12')).toEqual({ open: 10, close: 12 });
        expect(oh.parseInterval('12:00 - 15:30')).toEqual({ open: 12, close: 15.5 });
        expect(oh.parseInterval('1 - 2')).toEqual({ open: 1, close: 2 });
        expect(function () { return oh.parseInterval('a-b'); }).toThrow();
        expect(function () { return oh.parseInterval('10-5'); }).toThrow();
        expect(function () { return oh.parseInterval('1 - 2 - 3'); }).toThrow();
    });
    it('should format intervals', function () {
        expect(oh.formatInterval({ open: 1, close: 10 })).toBe('01:00 - 10:00');
    });
    it('should parse day', function () {
        expect(oh.parseDay('10:00 - 12:30; 14:00 - 20:00')).toEqual([{ open: 10, close: 12.5 }, { open: 14, close: 20 }]);
        expect(oh.parseDay('8 - 16')).toEqual([{ open: 8, close: 16 }]);
        expect(oh.parseDay('10:00 - 12:30, 14:00 - 20:00')).toEqual([{ open: 10, close: 12.5 }, { open: 14, close: 20 }]);
        expect(oh.parseDay('10:00 - 12:30, abcdefff, 14:00 - 20:00, asdfads')).toEqual([{ open: 10, close: 12.5 }, { open: 14, close: 20 }]);
        expect(oh.parseDay('14:00 - 20:00, 8 - 12')).toEqual([{ open: 8, close: 12 }, { open: 14, close: 20 }]);
        expect(function () { return oh.parseDay('8-20, 15-18'); }).toThrow();
        expect(function () { return oh.parseDay('8-20, 6-9'); }).toThrow();
        expect(function () { return oh.parseDay('8-20, 18-22'); }).toThrow();
    });
    it('should format day', function () {
        expect(oh.formatDay([{ open: 5, close: 10 }, { open: 12, close: 15.5 }])).toBe('05:00 - 10:00, 12:00 - 15:30');
    });
    it('should format week intelligently', function () {
        var week = oh.formatWeek({
            1: [{ open: 8, close: 12 }],
            2: [{ open: 8, close: 12 }],
            3: [{ open: 8, close: 12 }],
            4: [{ open: 8, close: 12 }],
            5: [{ open: 8, close: 15 }, { open: 16, close: 17 }],
            6: [{ open: 8, close: 10 }],
            7: [],
        }, new Date('2019-05-13')); // monday
        expect(week.length).toBe(4);
        expect(week.map((function (r) { return r.isCurrent; }))).toEqual([true, false, false, false]);
        expect(week.map((function (r) { return r.isSingleDay; }))).toEqual([false, true, true, true]);
        expect(week.map((function (r) { return r.isOpen; }))).toEqual([true, true, true, false]);
        expect(week[0].dayFrom).toBe(1);
        expect(week[0].dayTo).toBe(4);
        expect(week[1].dayFrom).toBe(5);
        expect(week[1].dayTo).toBe(5);
        expect(week[2].dayFrom).toBe(6);
        expect(week[2].dayTo).toBe(6);
        expect(week[3].dayTo).toBe(7);
        expect(week[3].dayTo).toBe(7);
        expect(week[0].hours).toBe('08:00 - 12:00');
        expect(week[1].hours).toBe('08:00 - 15:00, 16:00 - 17:00');
        expect(week[2].hours).toBe('08:00 - 10:00');
        expect(week[3].hours).toBe('');
        var week2 = oh.formatWeek({
            1: [{ open: 8, close: 12 }],
            2: [{ open: 8, close: 12 }],
            3: [{ open: 8, close: 12 }],
            4: [{ open: 8, close: 12 }],
            5: [{ open: 8, close: 12 }],
            6: [{ open: 8, close: 12 }],
            7: [{ open: 8, close: 12 }],
        }, new Date('2019-05-13'));
        expect(week2.length).toBe(1);
        expect(week2[0].isSingleDay).toBe(false);
        expect(week2[0].isCurrent).toBe(true);
        expect(week2[0].dayFrom).toBe(1);
        expect(week2[0].dayTo).toBe(7);
        expect(week2[0].hours).toBe('08:00 - 12:00');
    });
    it('should analyze opening hours', function () {
        var week = {
            1: [{ open: 8, close: 12 }],
            2: [{ open: 8, close: 12 }],
            3: [{ open: 8, close: 12 }],
            4: [{ open: 8, close: 12 }],
            5: [{ open: 8, close: 15 }, { open: 16, close: 17 }],
            6: [{ open: 8, close: 10 }],
            7: [],
        };
        var res1 = opening_hours_1.processHours(week, new Date('2019-05-13T05:00:00')); // Monday
        expect(res1.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res1.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res1.nextChangeIsToday).toBe(true);
        expect(res1.nextChangeIsTomorrow).toBe(false);
        expect(res1.nextChangeDay).toBe(1);
        expect(res1.nextChangeTime).toBe(8);
        var res2 = opening_hours_1.processHours(week, new Date('2019-05-13T10:00:00')); // Monday
        expect(res2.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res2.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res2.nextChangeIsToday).toBe(true);
        expect(res2.nextChangeIsTomorrow).toBe(false);
        expect(res2.nextChangeDay).toBe(1);
        expect(res2.nextChangeTime).toBe(12);
        var res3 = opening_hours_1.processHours(week, new Date('2019-05-17T15:30:00')); // Friday
        expect(res3.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res3.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res3.nextChangeIsToday).toBe(true);
        expect(res3.nextChangeIsTomorrow).toBe(false);
        expect(res3.nextChangeDay).toBe(5);
        expect(res3.nextChangeTime).toBe(16);
        var res4 = opening_hours_1.processHours(week, new Date('2019-05-12T15:30:00')); // Sunday
        expect(res4.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res4.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res4.nextChangeIsToday).toBe(false);
        expect(res4.nextChangeIsTomorrow).toBe(true);
        expect(res4.nextChangeDay).toBe(1);
        expect(res4.nextChangeTime).toBe(8);
        var res5 = opening_hours_1.processHours(week, new Date('2019-05-13T22:00:00')); // Monday
        expect(res5.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res5.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res5.nextChangeIsToday).toBe(false);
        expect(res5.nextChangeIsTomorrow).toBe(true);
        expect(res5.nextChangeDay).toBe(2);
        expect(res5.nextChangeTime).toBe(8);
    });
});
//# sourceMappingURL=opening-hours.spec.js.map