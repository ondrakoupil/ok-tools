"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_factory_1 = require("../src/data-factory");
describe('DataFactory', function () {
    it('should parse numbers', function () {
        expect(data_factory_1.number(100)).toBe(100);
        expect(data_factory_1.number(100.111)).toBe(100.111);
        expect(data_factory_1.number('100')).toBe(100);
        expect(data_factory_1.number('100.111')).toBe(100.111);
        expect(data_factory_1.number('100,111')).toBe(100.111);
        expect(data_factory_1.number('0')).toBe(0);
        expect(data_factory_1.number('')).toBe(0);
        expect(data_factory_1.number('sadgasdg')).toBe(0);
        expect(data_factory_1.number([])).toBe(0);
        expect(data_factory_1.number(['0'])).toBe(0);
        expect(data_factory_1.number(['100'])).toBe(100);
        expect(data_factory_1.number([100])).toBe(100);
        expect(data_factory_1.number([100, 20, 1000])).toBe(0);
    });
    it('should parse string', function () {
        expect(data_factory_1.string(100)).toBe('100');
        expect(data_factory_1.string(100.5)).toBe('100.5');
        expect(data_factory_1.string('a')).toBe('a');
        expect(data_factory_1.string(['a'])).toBe('');
        expect(data_factory_1.string([100])).toBe('');
        expect(data_factory_1.string([])).toBe('');
        expect(data_factory_1.string([100, 200, 300])).toBe('');
    });
    it('should parse booleans', function () {
        expect(data_factory_1.boolean('aaaa')).toBe(true);
        expect(data_factory_1.boolean('')).toBe(false);
        expect(data_factory_1.boolean(1)).toBe(true);
        expect(data_factory_1.boolean(0)).toBe(false);
        expect(data_factory_1.boolean(true)).toBe(true);
        expect(data_factory_1.boolean(false)).toBe(false);
        expect(data_factory_1.boolean([])).toBe(false);
        expect(data_factory_1.boolean([100])).toBe(true);
        expect(data_factory_1.boolean([0])).toBe(true);
        expect(data_factory_1.boolean({})).toBe(true);
    });
    it('should parse dates', function () {
        expect(data_factory_1.date('2019-02-12T20:00:00+01:00').getTime()).toBe(1549998000000);
        expect(data_factory_1.date('0')).toBe(null);
        expect(data_factory_1.date('abcde')).toBe(null);
        expect(data_factory_1.date(null)).toBe(null);
        expect(data_factory_1.date('2019-01-10').getTime()).toBe((new Date('2019-01-10T00:00:00')).getTime());
        expect(function () {
            data_factory_1.date('abcde', false);
        }).toThrow();
    });
    it('factory() method should do as expected', function () {
        var input = {
            numA: 10,
            numB: '20',
            numMap: 100,
            strA: 20,
            strB: 'xx',
            v1: 'true',
            dateA: '2020-01-05 20:00:01',
            anything: 'ddd',
            nothing: 'aaa',
            someObjectMap: {
                a: '1',
                b: '3',
                c: 100,
            },
            someObject: {
                a: 1,
                b: 'B',
                c: '2020-01-01 20:00:01',
            }
        };
        var outcome = data_factory_1.factory(input, {
            number: ['numA', 'numB', 'numC', 'numMap', 'numMap2'],
            string: ['strA', 'strB', 'strC'],
            boolean: ['v1', 'v2'],
            date: ['dateA', 'dateX'],
            any: ['anything'],
            objectMap: {
                someObjectMap: data_factory_1.number,
                anotherObjectMap: data_factory_1.string,
            },
            object: {
                someObject: {
                    string: ['a', 'b'],
                    date: ['c'],
                },
            },
            default: {
                zzz: 100,
                numA: 20,
                numMap2: 1.5,
            },
            map: {
                numMap: function (v) { return (v * 20); },
                numMap2: function (v) { return (v * 20); },
            }
        });
        expect(outcome.zzz).toBe(100);
        expect(outcome.numA).toBe(10);
        expect(outcome.numB).toBe(20);
        expect(outcome.numC).toBe(0);
        expect(outcome.strA).toBe('20');
        expect(outcome.strB).toBe('xx');
        expect(outcome.strC).toBe('');
        expect(outcome.v1).toBe(true);
        expect(outcome.v2).toBe(false);
        expect(outcome.dateA.getTime()).toBe(data_factory_1.date('2020-01-05 20:00:01').getTime());
        expect(outcome.dateX).toBe(null);
        expect(outcome.numMap).toBe(2000);
        expect(outcome.numMap2).toBe(30);
        expect(outcome.anything).toBe('ddd');
        expect(outcome.nothing).toBeUndefined();
        expect(outcome.someObject.a).toBe('1');
        expect(outcome.someObject.b).toBe('B');
        expect(outcome.someObject.c.getTime()).toBe(data_factory_1.date('2020-01-01 20:00:01').getTime());
        expect(Object.keys(outcome.someObjectMap).length).toBe(3);
        expect(outcome.someObjectMap.a).toBe(1);
        expect(outcome.someObjectMap.b).toBe(3);
        expect(outcome.someObjectMap.c).toBe(100);
        expect(JSON.stringify(outcome.anotherObjectMap)).toBe('{}');
        expect(JSON.stringify(data_factory_1.factory('a', { default: { 'b': 10 } }))).toBe('{"b":10}');
        expect(JSON.stringify(data_factory_1.factory('ahoj', {}))).toBe('{}');
        expect(JSON.stringify(data_factory_1.factory(null, {}))).toBe('{}');
    });
    it('factory() method should not return unwanted keys', function () {
        var outcome = data_factory_1.factory({ a: 10 }, {
            default: {
                b: '10',
            },
            number: ['b']
        });
        expect(outcome.b).toBe(10);
        expect(outcome.a).toBeUndefined();
    });
    it('factory() method should create a subitem', function () {
        var input = {
            a: 10
        };
        var outcome = data_factory_1.factory(input, {
            subItem: {
                a: function (i) { return i * 2; },
            },
        });
        expect(outcome.a).toBe(20);
        expect(function () {
            data_factory_1.factory(input, {
                subItem: {
                    a: 10
                }
            });
        }).toThrow();
    });
    it('factory() method should create subitems', function () {
        var createSub = function (input) {
            return data_factory_1.factory(input, {
                number: ['a'],
                string: ['b'],
                default: {
                    a: 10,
                    b: 'AAA',
                }
            });
        };
        var inputMain = {
            num: '10',
            subs: [{ a: '100' }, { a: 200, b: 'a' }, { b: 'c' }, {}]
        };
        var outcome = data_factory_1.factory(inputMain, {
            number: ['num'],
            default: {
                x: 'ww',
            },
            subItems: {
                subs: createSub,
            }
        });
        expect(outcome.num).toBe(10);
        expect(outcome.x).toBe('ww');
        expect(outcome.subs.length).toBe(4);
        expect(outcome.subs[0].a).toBe(100);
        expect(outcome.subs[0].b).toBe('AAA');
        expect(outcome.subs[1].a).toBe(200);
        expect(outcome.subs[1].b).toBe('a');
        expect(outcome.subs[2].a).toBe(10);
        expect(outcome.subs[2].b).toBe('c');
        expect(outcome.subs[3].a).toBe(10);
        expect(outcome.subs[3].b).toBe('AAA');
    });
    it('factory() method should handle enums', function () {
        var input = {
            ok: 'ok',
            number: '9',
            float: '9,54',
            string: 10,
            withDefault: 100,
            mustBeNull: 100
        };
        var outcome = data_factory_1.factory(input, {
            enum: {
                ok: ['ok', 'hello'],
                number: [7, 8, 9, 10],
                float: [9.52, 9.53, 9.54, 9.55],
                string: ['9', '10', '11'],
                withDefault: [1, 2, 3],
                withAnotherDefault: [10, 20, 30],
                mustBeNull: [1, 2, 3],
            },
            default: {
                withDefault: 2,
                withAnotherDefault: 20,
            },
        });
        expect(outcome.ok).toBe('ok');
        expect(outcome.number).toBe(9);
        expect(outcome.float).toBe(9.54);
        expect(outcome.string).toBe('10');
        expect(outcome.withDefault).toBe(2);
        expect(outcome.mustBeNull).toBe(null);
        expect(outcome.withAnotherDefault).toBe(20);
    });
    it('factory() should use "from" correctly', function () {
        var source = {
            hundred: '100',
            ten: 10,
            num: '1000',
        };
        var result = data_factory_1.factory(source, {
            from: {
                hundred: 'ten',
                deset: 'ten',
                m: 'million',
            },
            default: {
                m: 1000000,
            },
            number: ['hundred', 'num', 'deset', 'm'],
        });
        expect(result.hundred).toBe(10);
        expect(result.deset).toBe(10);
        expect(result.num).toBe(1000);
        expect(result.m).toBe(1000000);
    });
});
//# sourceMappingURL=data-factory.spec.js.map