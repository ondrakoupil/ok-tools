"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse_time_1 = require("./parse-time");
function number(input) {
    if (typeof input === 'string') {
        input = input.replace(/,/, '.');
    }
    return (Number(input).valueOf() || 0);
}
exports.number = number;
function string(input) {
    if (!input) {
        return '';
    }
    if (typeof input === 'string') {
        return input;
    }
    if (typeof input === 'number') {
        return input + '';
    }
    return '';
}
exports.string = string;
function boolean(input) {
    if (input && Array.isArray(input) && input.length === 0) {
        return false;
    }
    return !!input;
}
exports.boolean = boolean;
function date(input, returnNullOnError) {
    if (returnNullOnError === void 0) { returnNullOnError = true; }
    if (!input) {
        return null;
    }
    return parse_time_1.parseTime(input, returnNullOnError);
}
exports.date = date;
function factory(input, definitions) {
    if (!input || typeof input !== 'object') {
        return Object.assign({}, definitions.default);
    }
    var response = Object.assign({}, definitions.default);
    var clonedInput = Object.assign({}, definitions.default, input);
    if (definitions.any) {
        definitions.any.map(function (name) {
            response[name] = clonedInput[name];
        });
    }
    if (definitions.number) {
        definitions.number.map(function (name) {
            response[name] = number(clonedInput[name]);
        });
    }
    if (definitions.string) {
        definitions.string.map(function (name) {
            response[name] = string(clonedInput[name]);
        });
    }
    if (definitions.boolean) {
        definitions.boolean.map(function (name) {
            response[name] = boolean(clonedInput[name]);
        });
    }
    if (definitions.date) {
        definitions.date.map(function (name) {
            response[name] = date(clonedInput[name]);
        });
    }
    if (definitions.object) {
        var keys = Object.keys(definitions.object);
        keys.map(function (key) {
            response[key] = factory(clonedInput[key], definitions.object[key]);
        });
    }
    if (definitions.objectMap) {
        var keys = Object.keys(definitions.objectMap);
        keys.map(function (key) {
            response[key] = {};
            if (clonedInput[key]) {
                Object.keys(clonedInput[key]).map(function (itemKey) {
                    response[key][itemKey] = definitions.objectMap[key](clonedInput[key][itemKey]);
                });
            }
        });
    }
    if (definitions.subItem) {
        var keys = Object.keys(definitions.subItem);
        keys.map(function (key) {
            if (typeof definitions.subItem[key] !== 'function') {
                throw new Error('subItem[' + key + '] must be a function!');
            }
            response[key] = definitions.subItem[key](clonedInput[key]);
        });
    }
    if (definitions.subItems) {
        var keys = Object.keys(definitions.subItems);
        keys.map(function (key) {
            if (typeof definitions.subItems[key] !== 'function') {
                throw new Error('subItems[' + key + '] must be a function!');
            }
            var inputArray = clonedInput[key];
            if (!inputArray) {
                inputArray = [];
            }
            else if (!Array.isArray(inputArray)) {
                throw new Error(key + ' is not an array.');
            }
            response[key] = inputArray.map(function (v) { return definitions.subItems[key](v); });
        });
    }
    if (definitions.map) {
        var keys = Object.keys(definitions.map);
        keys.map(function (key) {
            if (!definitions.map[key] || typeof definitions.map[key] !== 'function') {
                throw new Error('Not a function: definitions.map[' + key + ']');
            }
            response[key] = definitions.map[key](response[key]);
        });
    }
    return response;
}
exports.factory = factory;
//# sourceMappingURL=data-factory.js.map