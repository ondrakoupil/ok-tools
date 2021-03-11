"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = exports.date = exports.boolean = exports.string = exports.number = void 0;
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
    if (definitions.from) {
        var keys = Object.keys(definitions.from);
        keys.forEach(function (key) {
            var value = definitions.from[key];
            if (typeof value === 'function') {
                var out = value(clonedInput);
                clonedInput[key] = out;
            }
            else {
                if (typeof clonedInput[value] !== 'undefined') {
                    clonedInput[key] = clonedInput[value];
                }
                else {
                    if (definitions.default && typeof definitions.default[value] !== 'undefined') {
                        clonedInput[key] = definitions.default[value];
                    }
                }
            }
        });
    }
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
    if (definitions.enum) {
        var keys = Object.keys(definitions.enum);
        keys.map(function (key) {
            var allowedValues = definitions.enum[key];
            if (!Array.isArray(allowedValues)) {
                throw new Error('Not an array: definitions.enum[' + key + ']');
            }
            if (allowedValues.indexOf(clonedInput[key]) === -1) {
                var foundAlternative = false;
                if (typeof clonedInput[key] === 'number') {
                    var stringVersion = string(clonedInput[key]);
                    if (allowedValues.indexOf(stringVersion) !== -1) {
                        response[key] = stringVersion;
                        foundAlternative = true;
                    }
                }
                else if (typeof clonedInput[key] === 'string') {
                    var numericVersion = number(clonedInput[key]);
                    if (allowedValues.indexOf(numericVersion) !== -1) {
                        response[key] = numericVersion;
                        foundAlternative = true;
                    }
                }
                if (!foundAlternative) {
                    if (definitions.default && typeof (definitions === null || definitions === void 0 ? void 0 : definitions.default[key]) !== 'undefined') {
                        response[key] = definitions.default[key];
                    }
                    else {
                        response[key] = null;
                    }
                }
            }
            else {
                response[key] = clonedInput[key];
            }
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
    if (definitions.from) {
        var keys = Object.keys(definitions.from);
        keys.forEach(function (key) {
            if (typeof response[key] === 'undefined') {
                response[key] = clonedInput[key];
            }
        });
    }
    return response;
}
exports.factory = factory;
//# sourceMappingURL=data-factory.js.map