"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var languages_enum_1 = require("./languages.enum");
var time_constants_1 = require("./time-constants");
var pluralize_1 = require("./pluralize");
function relativeTime(input, language, now) {
    if (language === void 0) { language = languages_enum_1.Languages.CZECH; }
    if (now === void 0) { now = null; }
    var date;
    if (!now) {
        now = new Date();
    }
    switch (typeof input) {
        case "object":
            if (!(input instanceof Date)) {
                throw new Error('Given input must be a Date, parsable string or a number timestamp.');
            }
            date = input;
            break;
        case "string":
            date = new Date(input);
            break;
        case "number":
            var fixedInput = void 0;
            if (input < 2000000000) {
                fixedInput = input * 1000;
            }
            else {
                fixedInput = input;
            }
            date = new Date(fixedInput);
    }
    if (!date.getTime() || isNaN(date.getTime())) {
        throw new Error('Given input could not be parsed into a Date.');
    }
    var thatTime = date.getTime();
    var diff = now.getTime() - thatTime;
    // Budoucí datum - asi jen omylem, zaokrouhlíme na 0
    if (diff < 0 && diff > -60000) {
        diff = 0;
    }
    if (diff < 0) {
        throw new Error('RelativeTime can\'t handle future dates. Diff = ' + diff + ', now = ' + now.getTime() + ', date = ' + thatTime);
    }
    // Do 5 sekund
    if (diff < 5) {
        return time_constants_1.Words.now[language];
    }
    // do 1 minuty
    if (diff < 60000) {
        return time_constants_1.Words.momentAgo[language];
    }
    // do 1 hodiny
    if (diff < 3600000) {
        var minutes = Math.round(diff / 60000);
        return pluralize_1.pluralize(minutes, time_constants_1.Words.minutesAgo[language]);
    }
    // do 10 hodin
    if (diff < 3600 * 1000 * 10) {
        var hours = Math.round(diff / (3600 * 1000));
        return pluralize_1.pluralize(hours, time_constants_1.Words.hoursAgo[language]);
    }
    // do 24 hodin
    if (diff < 3600 * 1000 * 24) {
        var yesterdayText = "";
        if (date.getDay() == now.getDay() - 1) {
            yesterdayText = time_constants_1.Words.yesterdayAt[language] + ' ';
        }
        return yesterdayText + formatTimeOfDay(date);
    }
    // do 6 dnů
    if (diff < 3600 * 1000 * 24 * 6) {
        var yesterdayText = "";
        if (date.getDay() == now.getDay() - 1) {
            yesterdayText = time_constants_1.Words.yesterdayAt[language] + ' ';
        }
        if (date.getDay() == 6 && now.getDay() == 0) {
            yesterdayText = time_constants_1.Words.yesterdayAt[language] + ' ';
        }
        if (!yesterdayText) {
            var dayInWeek = date.getDay();
            yesterdayText = time_constants_1.Days.localAt[language][dayInWeek] + ' ';
        }
        return yesterdayText + formatTimeOfDay(date);
    }
    var yearStart = new Date();
    yearStart.setTime(now.getTime());
    yearStart.setDate(1);
    yearStart.setMonth(1);
    // tento rok
    if (yearStart.getFullYear() == date.getFullYear()) {
        if (language == languages_enum_1.Languages.CZECH) {
            return (date.getDate()) + '. ' + time_constants_1.Months.namesGenitive[language][date.getMonth() + 1];
        }
        else {
            return time_constants_1.Months.names[language][date.getMonth() + 1] + ' ' + (date.getDate());
        }
    }
    // ještě dříve
    if (language == languages_enum_1.Languages.CZECH) {
        return (date.getDate()) + '. ' + time_constants_1.Months.namesGenitive[language][date.getMonth() + 1] + ' ' + (date.getFullYear());
    }
    else {
        return time_constants_1.Months.names[language][date.getMonth() + 1] + ' ' + (date.getDate()) + ', ' + (date.getFullYear());
    }
}
exports.relativeTime = relativeTime;
function formatTimeOfDay(date) {
    var m = (date.getMinutes()) + "";
    if (m.length == 1) {
        m = "0" + m;
    }
    var h = (date.getHours()) + "";
    if (h.length == 1) {
        h = "0" + h;
    }
    return h + ':' + m;
}
//# sourceMappingURL=relative-time.js.map