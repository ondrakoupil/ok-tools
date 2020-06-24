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
        };
        var outcome = data_factory_1.factory(input, {
            number: ['numA', 'numB', 'numC', 'numMap', 'numMap2'],
            string: ['strA', 'strB', 'strC'],
            boolean: ['v1', 'v2'],
            date: ['dateA', 'dateX'],
            any: ['anything'],
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
});
//# sourceMappingURL=data-factory.spec.js.map