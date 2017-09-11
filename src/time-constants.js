"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Months = (function () {
    function Months() {
    }
    Months.names = {
        'cs': {
            1: "Leden",
            2: "Únor",
            3: "Březen",
            4: "Duben",
            5: "Květen",
            6: "Červen",
            7: "Červenec",
            8: "Srpen",
            9: "Září",
            10: "Říjen",
            11: "Listopad",
            12: "Prosinec"
        },
        'en': {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }
    };
    Months.namesGenitive = {
        'cs': {
            1: "ledna",
            2: "února",
            3: "března",
            4: "dubna",
            5: "května",
            6: "června",
            7: "července",
            8: "srpna",
            9: "září",
            10: "října",
            11: "listopadu",
            12: "prosince"
        },
        'en': {
            1: "january",
            2: "february",
            3: "march",
            4: "april",
            5: "may",
            6: "june",
            7: "july",
            8: "august",
            9: "september",
            10: "october",
            11: "november",
            12: "december"
        }
    };
    Months.short = {
        'cs': {
            1: "Led",
            2: "Úno",
            3: "Bře",
            4: "Dub",
            5: "Kvě",
            6: "Črn",
            7: "Črc",
            8: "Srp",
            9: "Zář",
            10: "Říj",
            11: "Lis",
            12: "Pro"
        },
        'en': {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        }
    };
    return Months;
}());
exports.Months = Months;
var Days = (function () {
    function Days() {
    }
    Days.names = {
        'cs': {
            1: "Pondělí",
            2: "Úterý",
            3: "Středa",
            4: "Čtvrtek",
            5: "Pátek",
            6: "Sobota",
            7: "Neděle",
        },
        'en': {
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
            7: "Sunday",
        }
    };
    Days.short = {
        'cs': {
            1: "Po",
            2: "Út",
            3: "St",
            4: "Čt",
            5: "Pá",
            6: "So",
            7: "Ne",
        },
        'en': {
            1: "Mon",
            2: "Tue",
            3: "Wed",
            4: "Thu",
            5: "Fri",
            6: "Sat",
            7: "Sun",
        }
    };
    Days.local = {
        'cs': {
            1: "v pondělí",
            2: "v úterý",
            3: "ve středu",
            4: "ve čtvrtek",
            5: "v pátek",
            6: "v sobotu",
            7: "v neděli",
        },
        'en': {
            1: "on Monday",
            2: "on Tuesday",
            3: "on Wednesday",
            4: "on Thursday",
            5: "on Friday",
            6: "on Saturday",
            7: "on Sunday",
        }
    };
    Days.localAt = {
        'cs': {
            1: "v pondělí v",
            2: "v úterý v",
            3: "ve středu v",
            4: "ve čtvrtek v",
            5: "v pátek v",
            6: "v sobotu v",
            7: "v neděli v",
        },
        'en': {
            1: "on Monday at",
            2: "on Tuesday at",
            3: "on Wednesday at",
            4: "on Thursday at",
            5: "on Friday at",
            6: "on Saturday at",
            7: "on Sunday at",
        }
    };
    return Days;
}());
exports.Days = Days;
var Words = (function () {
    function Words() {
    }
    Words.now = {
        'cs': 'teď',
        'en': 'now'
    };
    Words.momentAgo = {
        'cs': 'před chvílí',
        'en': 'a moment ago'
    };
    Words.minutesAgo = {
        'cs': ['před %% minutou', 'před %% minutami', 'před %% minutami'],
        'en': ['%% minute ago', '%% minutes ago', '%% minutes ago']
    };
    Words.hoursAgo = {
        'cs': ['před %% hodinou', 'před %% hodinami', 'před %% hodinami'],
        'en': ['%% hour ago', '%% hours ago', '%% hours ago']
    };
    Words.yesterday = {
        'cs': 'včera',
        'en': 'yesterday'
    };
    Words.yesterdayAt = {
        'cs': 'včera v',
        'en': 'yesterday at'
    };
    return Words;
}());
exports.Words = Words;
//# sourceMappingURL=time-constants.js.map