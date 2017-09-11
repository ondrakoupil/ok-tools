"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var relative_time_1 = require("../src/relative-time");
var time_constants_1 = require("../src/time-constants");
var languages_enum_1 = require("../src/languages.enum");
describe("Relative Time function", function () {
    it("should handle correct inputs", function () {
        var now = new Date();
        var someDate = new Date();
        someDate.setDate(Math.round(Math.random() * 27));
        expect(relative_time_1.relativeTime(now)).toBeTruthy();
        expect(relative_time_1.relativeTime(someDate)).toBeTruthy();
        expect(relative_time_1.relativeTime(someDate.getTime())).toBeTruthy();
        expect(relative_time_1.relativeTime(someDate.getTime() / 1000)).toBe(relative_time_1.relativeTime(someDate.getTime()));
        expect(relative_time_1.relativeTime('2015-01-23')).toBeTruthy();
        expect(function () {
            relative_time_1.relativeTime('foo');
        }).toThrow();
        expect(function () {
            var futureTime = new Date(now.getTime() + 10000000);
            relative_time_1.relativeTime(futureTime);
        }).toThrow();
    });
    it("should work without giving exact time.", function () {
        // seconds ago
        var someTimeAgo = new Date();
        someTimeAgo.setTime(someTimeAgo.getTime() - 1000 * 5);
        expect(relative_time_1.relativeTime(someTimeAgo)).toBe(time_constants_1.Words.momentAgo[languages_enum_1.Languages.CZECH]);
        expect(relative_time_1.relativeTime(someTimeAgo, languages_enum_1.Languages.ENGLISH)).toBe(time_constants_1.Words.momentAgo[languages_enum_1.Languages.ENGLISH]);
        // yesterday
        var yesterday = new Date();
        yesterday.setTime(yesterday.getTime() - 1000 * 86400);
        expect(relative_time_1.relativeTime(yesterday)).toContain(time_constants_1.Words.yesterday[languages_enum_1.Languages.CZECH]);
    });
    it("should return correct values for these test scenarios", function () {
        var basicTime = new Date('2017-05-13 12:00:00');
        // Nyní
        expect(relative_time_1.relativeTime(basicTime, languages_enum_1.Languages.CZECH, basicTime)).toBe(time_constants_1.Words.now[languages_enum_1.Languages.CZECH]);
        expect(relative_time_1.relativeTime('2017-05-13 12:00:02', languages_enum_1.Languages.ENGLISH, basicTime)).toBe(time_constants_1.Words.now[languages_enum_1.Languages.ENGLISH]);
        // Před chvílí - před 30 sekundami
        expect(relative_time_1.relativeTime('2017-05-13 11:59:30', languages_enum_1.Languages.CZECH, basicTime)).toBe(time_constants_1.Words.momentAgo[languages_enum_1.Languages.CZECH]);
        // Před 1 minutou - do 1 hodiny
        expect(relative_time_1.relativeTime('2017-05-13 11:58:56', languages_enum_1.Languages.CZECH, basicTime)).toBe('před 1 minutou');
        // Před 3 minutami - do 1 hodiny
        expect(relative_time_1.relativeTime('2017-05-13 11:57:05', languages_enum_1.Languages.CZECH, basicTime)).toBe('před 3 minutami');
        // Před 43 minutami - do 1 hodiny
        expect(relative_time_1.relativeTime('2017-05-13 11:17:05', languages_enum_1.Languages.CZECH, basicTime)).toBe('před 43 minutami');
        // Před 1 hodinou - do 10 hodin
        expect(relative_time_1.relativeTime('2017-05-13 11:17:05', languages_enum_1.Languages.CZECH, basicTime)).toBe('před 43 minutami');
        // Před 8 hodinami - do 10 hodin
        expect(relative_time_1.relativeTime('2017-05-13 04:03:05', languages_enum_1.Languages.CZECH, basicTime)).toBe('před 8 hodinami');
        // Před 11 hodinami - dnes, do 1 dne
        expect(relative_time_1.relativeTime('2017-05-13 01:03:05', languages_enum_1.Languages.CZECH, basicTime)).toBe('01:03');
        // Před 15 hodinami - včera, do 1 dne
        expect(relative_time_1.relativeTime('2017-05-12 15:24:21', languages_enum_1.Languages.CZECH, basicTime)).toBe('včera v 15:24');
        // Před 15 hodinami - včera, do 1 dne
        expect(relative_time_1.relativeTime('2017-05-12 15:24:21', languages_enum_1.Languages.ENGLISH, basicTime)).toBe('yesterday at 15:24');
        // Před více dny - do týdne - včera
        expect(relative_time_1.relativeTime('2017-05-12 09:10:21', languages_enum_1.Languages.CZECH, basicTime)).toBe('včera v 09:10');
        // Před více dny - do týdne
        expect(relative_time_1.relativeTime('2017-05-10 11:24:21', languages_enum_1.Languages.CZECH, basicTime)).toBe('ve středu v 11:24');
        // Před více dny - do týdne
        expect(relative_time_1.relativeTime('2017-05-08 11:24:21', languages_enum_1.Languages.ENGLISH, basicTime)).toBe('on Monday at 11:24');
        // Před více dny, tento rok
        expect(relative_time_1.relativeTime('2017-02-06 11:24:21', languages_enum_1.Languages.CZECH, basicTime)).toBe('6. února');
        expect(relative_time_1.relativeTime('2017-02-06 11:24:21', languages_enum_1.Languages.ENGLISH, basicTime)).toBe('February 6');
        // Minulý rok
        expect(relative_time_1.relativeTime('2015-09-28 11:21:21', languages_enum_1.Languages.CZECH, basicTime)).toBe('28. září 2015');
        expect(relative_time_1.relativeTime('2015-09-28 11:21:21', languages_enum_1.Languages.ENGLISH, basicTime)).toBe('September 28, 2015');
    });
});
//# sourceMappingURL=relative-time.spec.js.map