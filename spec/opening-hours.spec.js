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
        expect(oh.formatHour(26)).toBe('02:00');
        expect(oh.formatHour(30)).toBe('06:00');
        expect(function () { oh.formatHour(50); }).toThrow();
    });
    it('should parse intervals', function () {
        expect(oh.parseInterval(' 10 - 12 ')).toEqual({ open: 10, close: 12 });
        expect(oh.parseInterval('10-12')).toEqual({ open: 10, close: 12 });
        expect(oh.parseInterval('12:00 - 15:30')).toEqual({ open: 12, close: 15.5 });
        expect(oh.parseInterval('1 - 2')).toEqual({ open: 1, close: 2 });
        expect(function () { return oh.parseInterval('a-b'); }).toThrow();
        expect(function () { return oh.parseInterval('1 - 2 - 3'); }).toThrow();
        expect(oh.parseInterval('10-2')).toEqual({ open: 10, close: 26 });
        expect(oh.parseInterval('23:30 - 06:15')).toEqual({ open: 23.5, close: 30.25 });
        expect(function () { return oh.parseInterval('10-10'); }).toThrow();
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
    it('should parse week', function () {
        var parsed = oh.parseWeek(['1-19', '9-20', '9-20', '9-20', '', '9-20, 21-23', '']);
        expect(parsed[1][0].open).toBe(1);
        expect(parsed[5]).toEqual([]);
        expect(parsed[6]).toEqual([{ open: 9, close: 20 }, { open: 21, close: 23 }]);
        expect(parsed[7]).toEqual([]);
    });
    it('should parse week with different formats', function () {
        var parsed = oh.parseWeek(['', '1-10', '2-20', '3-10', '4-20', '5-10', '6-20', '7-10']);
        expect(parsed[1][0].open).toBe(1);
        expect(parsed[5][0].open).toBe(5);
        expect(parsed[7][0].open).toBe(7);
        var parsed2 = oh.parseWeek({ 1: '1-10', 2: '2-10', 3: '3-10', 4: '4-10', 5: '5-10', 6: '6-10', 7: '7-10' });
        expect(parsed2[1][0].open).toBe(1);
        expect(parsed2[5][0].open).toBe(5);
        expect(parsed2[7][0].open).toBe(7);
        var parsed3 = oh.parseWeek(['', '1-10', '2-20']);
        expect(parsed3[1].length).toBe(0);
        expect(parsed3[2][0].open).toBe(1);
        expect(parsed3[3][0].open).toBe(2);
        expect(parsed3[4].length).toBe(0);
        var parsed4 = oh.parseWeek({ 2: '1-10', 4: '2-10', 6: '3-10' });
        expect(parsed4[2][0].open).toBe(1);
        expect(parsed4[4][0].open).toBe(2);
        expect(parsed4[6][0].open).toBe(3);
    });
    it('should handle empty input when parsing week', function () {
        var parsed1 = oh.parseWeek([]);
        expect(Object.keys(parsed1).length).toBe(7);
        expect(parsed1[1].length).toBe(0);
        var parsed2 = oh.parseWeek(['', '', '', '', '', '', '']);
        expect(Object.keys(parsed2).length).toBe(7);
        expect(parsed2[1].length).toBe(0);
        var parsed3 = oh.parseWeek([], true);
        var parsed4 = oh.parseWeek(['', '', '', '', '', '', ''], true);
        expect(parsed3).toBeNull();
        expect(parsed4).toBeNull();
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
    it('should correctly analyze opening hours overflowing to next day', function () {
        var week = {
            1: [{ open: 10, close: 26 }],
            2: [{ open: 10, close: 26 }],
            3: [{ open: 5, close: 22 }],
            4: [{ open: 5, close: 27 }],
            5: [],
            6: [],
            7: [],
        };
        var res = opening_hours_1.processHours(week, new Date('2019-05-13 16:00:00')); // Monday
        expect(res.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res.nextChangeDay).toBe(2);
        expect(res.nextChangeTime).toBe(2);
        expect(res.nextChangeIsToday).toBe(false);
        expect(res.nextChangeIsTomorrow).toBe(true);
        var res4 = opening_hours_1.processHours(week, new Date('2019-05-14 01:00:00')); // Monday
        expect(res4.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res4.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res4.nextChangeDay).toBe(2);
        expect(res4.nextChangeTime).toBe(2);
        expect(res4.nextChangeIsToday).toBe(true);
        expect(res4.nextChangeIsTomorrow).toBe(false);
        var res2 = opening_hours_1.processHours(week, new Date('2019-05-14 4:00:00')); // Tuesday
        expect(res2.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res2.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res2.nextChangeDay).toBe(2);
        expect(res2.nextChangeTime).toBe(10);
        expect(res2.nextChangeIsToday).toBe(true);
        expect(res2.nextChangeIsTomorrow).toBe(false);
        var res3 = opening_hours_1.processHours(week, new Date('2019-05-17 16:00:00')); // Friday
        expect(res3.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res3.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res3.nextChangeDay).toBe(1);
        expect(res3.nextChangeTime).toBe(10);
        expect(res3.nextChangeIsToday).toBe(false);
        expect(res3.nextChangeIsTomorrow).toBe(false);
    });
    it('should correctly analyze opening hours in complicated scenarios', function () {
        var hours = opening_hours_1.parseWeek(['10-22', '10-05', '15-20, 23-3', '10-03', '10-03', '', '']);
        var res = opening_hours_1.processHours(hours, new Date('2019-05-13 05:00')); // Monday before opening
        expect(res.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res.nextChangeTime).toBe(10);
        expect(res.nextChangeDay).toBe(1);
        expect(res.nextChangeIsTomorrow).toBe(false);
        expect(res.nextChangeIsToday).toBe(true);
        var res2 = opening_hours_1.processHours(hours, new Date('2019-05-13 15:00')); // Monday during hours
        expect(res2.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res2.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res2.nextChangeTime).toBe(22);
        expect(res2.nextChangeDay).toBe(1);
        expect(res2.nextChangeIsTomorrow).toBe(false);
        expect(res2.nextChangeIsToday).toBe(true);
        var res3 = opening_hours_1.processHours(hours, new Date('2019-05-13 22:30')); // Monday after closing
        expect(res3.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res3.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res3.nextChangeTime).toBe(10);
        expect(res3.nextChangeDay).toBe(2);
        expect(res3.nextChangeIsTomorrow).toBe(true);
        expect(res3.nextChangeIsToday).toBe(false);
        var res4 = opening_hours_1.processHours(hours, new Date('2019-05-14 15:00')); // Tuesday during hours
        expect(res4.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res4.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res4.nextChangeTime).toBe(5);
        expect(res4.nextChangeDay).toBe(3);
        expect(res4.nextChangeIsTomorrow).toBe(true);
        expect(res4.nextChangeIsToday).toBe(false);
        var res5 = opening_hours_1.processHours(hours, new Date('2019-05-15 03:00')); // Wednesday still in tuesday's hours
        expect(res5.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res5.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res5.nextChangeTime).toBe(5);
        expect(res5.nextChangeDay).toBe(3);
        expect(res5.nextChangeIsTomorrow).toBe(false);
        expect(res5.nextChangeIsToday).toBe(true);
        var res6 = opening_hours_1.processHours(hours, new Date('2019-05-15 10:00')); // Wednesday before first opening
        expect(res6.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res6.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res6.nextChangeTime).toBe(15);
        expect(res6.nextChangeDay).toBe(3);
        expect(res6.nextChangeIsTomorrow).toBe(false);
        expect(res6.nextChangeIsToday).toBe(true);
        var res7 = opening_hours_1.processHours(hours, new Date('2019-05-15 16:00')); // Wednesday during first opening
        expect(res7.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res7.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res7.nextChangeTime).toBe(20);
        expect(res7.nextChangeDay).toBe(3);
        expect(res7.nextChangeIsTomorrow).toBe(false);
        expect(res7.nextChangeIsToday).toBe(true);
        var res8 = opening_hours_1.processHours(hours, new Date('2019-05-15 21:00')); // Wednesday between both openings
        expect(res8.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res8.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res8.nextChangeTime).toBe(23);
        expect(res8.nextChangeDay).toBe(3);
        expect(res8.nextChangeIsTomorrow).toBe(false);
        expect(res8.nextChangeIsToday).toBe(true);
        var res9 = opening_hours_1.processHours(hours, new Date('2019-05-15 23:30')); // Wednesday during second opening
        expect(res9.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res9.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res9.nextChangeTime).toBe(3);
        expect(res9.nextChangeDay).toBe(4);
        expect(res9.nextChangeIsTomorrow).toBe(true);
        expect(res9.nextChangeIsToday).toBe(false);
        var res10 = opening_hours_1.processHours(hours, new Date('2019-05-16 01:30')); // Thursday still in wednesday's hours
        expect(res10.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res10.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res10.nextChangeTime).toBe(3);
        expect(res10.nextChangeDay).toBe(4);
        expect(res10.nextChangeIsTomorrow).toBe(false);
        expect(res10.nextChangeIsToday).toBe(true);
        var res11 = opening_hours_1.processHours(hours, new Date('2019-05-16 05:30')); // Thursday before opening
        expect(res11.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res11.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res11.nextChangeTime).toBe(10);
        expect(res11.nextChangeDay).toBe(4);
        expect(res11.nextChangeIsTomorrow).toBe(false);
        expect(res11.nextChangeIsToday).toBe(true);
        var res12 = opening_hours_1.processHours(hours, new Date('2019-05-17 20:30')); // Friday
        expect(res12.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res12.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res12.nextChangeTime).toBe(3);
        expect(res12.nextChangeDay).toBe(6);
        expect(res12.nextChangeIsTomorrow).toBe(true);
        expect(res12.nextChangeIsToday).toBe(false);
        var res13 = opening_hours_1.processHours(hours, new Date('2019-05-18 02:00')); // Saturday still in friday's hours
        expect(res13.currentStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res13.nextStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res13.nextChangeTime).toBe(3);
        expect(res13.nextChangeDay).toBe(6);
        expect(res13.nextChangeIsTomorrow).toBe(false);
        expect(res13.nextChangeIsToday).toBe(true);
        var res14 = opening_hours_1.processHours(hours, new Date('2019-05-18 12:00')); // Saturday later in day
        expect(res14.currentStatus).toBe(oh.OpeningHoursStatus.CLOSED);
        expect(res14.nextStatus).toBe(oh.OpeningHoursStatus.OPEN);
        expect(res14.nextChangeTime).toBe(10);
        expect(res14.nextChangeDay).toBe(1);
        expect(res14.nextChangeIsTomorrow).toBe(false);
        expect(res14.nextChangeIsToday).toBe(false);
    });
});
//# sourceMappingURL=opening-hours.spec.js.map