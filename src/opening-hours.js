"use strict";
(function (OpeningHoursStatus) {
    OpeningHoursStatus[OpeningHoursStatus["CLOSED"] = 0] = "CLOSED";
    OpeningHoursStatus[OpeningHoursStatus["OPEN"] = 1] = "OPEN";
})(exports.OpeningHoursStatus || (exports.OpeningHoursStatus = {}));
var OpeningHoursStatus = exports.OpeningHoursStatus;
function parseWeek(input) {
    var r = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: []
    };
    if (input[0] && !input[7]) {
        for (var i = 6; i >= 0; i--) {
            input[i + 1] = input[i];
        }
        delete input[0];
    }
    for (var i = 1; i <= 7; i++) {
        r[i] = parseDay(input[i]);
    }
    return r;
}
exports.parseWeek = parseWeek;
function parseDay(input) {
    if (!input) {
        return [];
    }
    var intervals = input.split(/[,;]+/).filter(function (r) { return !!r; });
    var ints = intervals.map(function (i) {
        var r;
        try {
            r = parseInterval(i);
            return r;
        }
        catch (e) {
            return null;
        }
    }).filter(function (r) { return !!r; });
    ints.sort(function (i1, i2) {
        return i1.open - i2.open;
    });
    ints.forEach(function (interval, index) {
        var next = ints[index + 1];
        if (!next) {
            return;
        }
        if (interval.close > next.open) {
            throw new Error('Invalid sequence in intervals: ' + input);
        }
    });
    return ints;
}
exports.parseDay = parseDay;
function parseInterval(input) {
    if (!input) {
        return null;
    }
    var parts = input.trim().split(/[\s-]+/).filter(function (r) { return !!r; });
    if (parts.length === 2) {
        var p = {
            open: parseHour(parts[0]),
            close: parseHour(parts[1])
        };
        if (p.open >= p.close) {
            throw new Error('Can not parse interval: ' + input);
        }
        return p;
    }
    throw new Error('Can not parse interval: ' + input);
}
exports.parseInterval = parseInterval;
function parseHour(input) {
    var parts = input.trim().split(/[:\.]+/).filter(function (r) { return !!r; });
    if (parts.length === 2) {
        var hour = clamp(parseInt(parts[0], 10), 0, 24);
        var minute = clamp(parseInt(parts[1], 10), 0, 60);
        if (isNaN(hour) || isNaN(minute)) {
            throw new Error('Can not parse hour');
        }
        if (minute >= 60) {
            minute = 0;
            hour++;
        }
        if (hour === 24) {
            minute = 0;
        }
        return hour + (minute / 60);
    }
    if (parts.length === 1) {
        var t = parseInt(parts[0], 10);
        if (isNaN(t)) {
            throw new Error('Can not parse hour: ' + input);
        }
        return clamp(t, 0, 24);
    }
    throw new Error('Can not parse hour: ' + input);
}
exports.parseHour = parseHour;
function formatHour(input) {
    var hour = Math.floor(input);
    var hourString = hour + '';
    if (hour < 10) {
        if (!hour) {
            hourString = '00';
        }
        else {
            hourString = '0' + hourString;
        }
    }
    var minutes = Math.round((input - hour) * 60);
    var minutesString = minutes + '';
    if (minutes < 10) {
        if (!minutes) {
            minutesString = '00';
        }
        else {
            minutesString = '0' + minutesString;
        }
    }
    return hourString + ':' + minutesString;
}
exports.formatHour = formatHour;
function formatInterval(input) {
    return formatHour(input.open) + ' - ' + formatHour(input.close);
}
exports.formatInterval = formatInterval;
function formatDay(input) {
    return input.map(function (r) { return formatInterval(r); }).join(', ');
}
exports.formatDay = formatDay;
function formatWeek(input, now) {
    if (now === void 0) { now = null; }
    if (!now) {
        now = new Date();
    }
    var day = now.getDay();
    if (!day) {
        day = 7;
    }
    var result = [];
    var currentRow;
    var currentFormatted = '';
    for (var i = 1; i <= 7; i++) {
        var thisDayFormatted = formatDay(input[i]);
        if (!currentRow || thisDayFormatted !== currentRow.hours) {
            if (currentRow) {
                result.push(currentRow);
            }
            currentRow = {
                dayFrom: i,
                dayTo: i,
                isSingleDay: true,
                hours: thisDayFormatted,
                isCurrent: false,
                isOpen: !!thisDayFormatted
            };
            currentFormatted = thisDayFormatted;
        }
        else if (currentRow) {
            currentRow.isSingleDay = false;
            currentRow.dayTo = i;
        }
    }
    if (currentRow) {
        result.push(currentRow);
    }
    result.map(function (row) {
        if (row.dayFrom <= day && row.dayTo >= day) {
            row.isCurrent = true;
        }
    });
    return result;
}
exports.formatWeek = formatWeek;
function processHours(hours, now) {
    if (now === void 0) { now = null; }
    if (!now) {
        now = new Date();
    }
    var day = now.getDay();
    if (!day) {
        day = 7;
    }
    var todayRules = hours[day];
    var thisTime = now.getHours() + now.getMinutes() / 60;
    var isOpen = false;
    var nextChange = null;
    var nextChangeDay = null;
    var nextChangeIsOpening = null;
    var nextChangeIsToday = false;
    var nextChangeIsTomorrow = false;
    for (var _i = 0, todayRules_1 = todayRules; _i < todayRules_1.length; _i++) {
        var interval = todayRules_1[_i];
        if (interval.open < thisTime && interval.close > thisTime) {
            isOpen = true;
            nextChangeIsOpening = false;
            nextChange = interval.close;
            nextChangeDay = day;
            nextChangeIsToday = true;
        }
        else if (interval.open > thisTime) {
            if (nextChange === null) {
                nextChangeIsOpening = true;
                nextChange = interval.open;
                nextChangeIsToday = true;
                nextChangeDay = day;
            }
        }
    }
    if (nextChange === null) {
        var followingDays = [];
        var tomorrow = day + 1;
        if (tomorrow >= 8) {
            tomorrow = 1;
        }
        for (var i = day + 1; i <= 7; i++) {
            followingDays.push(i);
        }
        for (var i = 1; i < day; i++) {
            followingDays.push(i);
        }
        for (var _a = 0, followingDays_1 = followingDays; _a < followingDays_1.length; _a++) {
            var nextDay = followingDays_1[_a];
            if (nextChange !== null) {
                break;
            }
            for (var _b = 0, _c = hours[nextDay]; _b < _c.length; _b++) {
                var interval = _c[_b];
                if (nextChange !== null) {
                    break;
                }
                if (interval.open) {
                    nextChange = interval.open;
                    nextChangeIsOpening = true;
                    nextChangeIsTomorrow = (nextDay === tomorrow);
                    nextChangeDay = nextDay;
                }
            }
        }
    }
    return {
        currentStatus: isOpen ? OpeningHoursStatus.OPEN : OpeningHoursStatus.CLOSED,
        nextStatus: nextChangeIsOpening ? OpeningHoursStatus.OPEN : OpeningHoursStatus.CLOSED,
        nextChangeDay: nextChangeDay,
        nextChangeTime: nextChange,
        nextChangeIsToday: nextChangeIsToday,
        nextChangeIsTomorrow: nextChangeIsTomorrow
    };
}
exports.processHours = processHours;
function clamp(n, low, high) {
    if (n < low) {
        return low;
    }
    if (n > high) {
        return high;
    }
    return n;
}
