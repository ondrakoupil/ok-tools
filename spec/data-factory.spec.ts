import { boolean, date, factory, number, string } from '../src/data-factory';

describe('DataFactory', function () {

	it('should parse numbers', function () {

		expect(number(100)).toBe(100);
		expect(number(100.111)).toBe(100.111);
		expect(number('100')).toBe(100);
		expect(number('100.111')).toBe(100.111);
		expect(number('100,111')).toBe(100.111);
		expect(number('0')).toBe(0);
		expect(number('')).toBe(0);
		expect(number('sadgasdg')).toBe(0);
		expect(number([])).toBe(0);
		expect(number(['0'])).toBe(0);
		expect(number(['100'])).toBe(100);
		expect(number([100])).toBe(100);
		expect(number([100, 20, 1000])).toBe(0);

	});

	it('should parse string', function () {

		expect(string(100)).toBe('100');
		expect(string(100.5)).toBe('100.5');
		expect(string('a')).toBe('a');
		expect(string(['a'])).toBe('');
		expect(string([100])).toBe('');
		expect(string([])).toBe('');
		expect(string([100, 200, 300])).toBe('');

	});

	it('should parse booleans', function () {

		expect(boolean('aaaa')).toBe(true);
		expect(boolean('')).toBe(false);
		expect(boolean(1)).toBe(true);
		expect(boolean(0)).toBe(false);
		expect(boolean(true)).toBe(true);
		expect(boolean(false)).toBe(false);
		expect(boolean([])).toBe(false);
		expect(boolean([100])).toBe(true);
		expect(boolean([0])).toBe(true);
		expect(boolean({})).toBe(true);

	});

	it('should parse dates', function () {

		expect(date('2019-02-12T20:00:00+01:00').getTime()).toBe(1549998000000);
		expect(date('0')).toBe(null);
		expect(date('abcde')).toBe(null);
		expect(date(null)).toBe(null);
		expect(date('2019-01-10').getTime()).toBe((new Date('2019-01-10T00:00:00')).getTime());
		expect(() => {
			date('abcde', false);
		}).toThrow();

	});


	it('factory() method should do as expected', function () {

		let input = {
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

		let outcome = factory(input, {
			number: ['numA', 'numB', 'numC', 'numMap', 'numMap2'],
			string: ['strA', 'strB', 'strC'],
			boolean: ['v1', 'v2'],
			date: ['dateA', 'dateX'],
			any: ['anything'],
			objectMap: {
				someObjectMap: number,
				anotherObjectMap: string,
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
				numMap: (v) => (v * 20),
				numMap2: (v) => (v * 20),
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
		expect(outcome.dateA.getTime()).toBe(date('2020-01-05 20:00:01').getTime());
		expect(outcome.dateX).toBe(null);
		expect(outcome.numMap).toBe(2000);
		expect(outcome.numMap2).toBe(30);
		expect(outcome.anything).toBe('ddd');
		expect(outcome.nothing).toBeUndefined();
		expect(outcome.someObject.a).toBe('1');
		expect(outcome.someObject.b).toBe('B');
		expect(outcome.someObject.c.getTime()).toBe(date('2020-01-01 20:00:01').getTime());
		expect(Object.keys(outcome.someObjectMap).length).toBe(3);
		expect(outcome.someObjectMap.a).toBe(1);
		expect(outcome.someObjectMap.b).toBe(3);
		expect(outcome.someObjectMap.c).toBe(100);
		expect(JSON.stringify(outcome.anotherObjectMap)).toBe('{}');

		expect(JSON.stringify(factory('a', {default: {'b': 10}}))).toBe('{"b":10}');
		expect(JSON.stringify(factory('ahoj', {}))).toBe('{}');
		expect(JSON.stringify(factory(null, {}))).toBe('{}');

	});

	it('factory() method should not return unwanted keys', function () {

		let outcome = factory({a: 10}, {
			default: {
				b: '10',
			},
			number: ['b']
		});

		expect(outcome.b).toBe(10);
		expect(outcome.a).toBeUndefined();

	});

	it('factory() method should create a subitem', function () {

		let input = {
			a: 10
		};

		let outcome = factory(input, {
			subItem: {
				a: (i) => i * 2,
			},
		});

		expect(outcome.a).toBe(20);

		expect(() => {

			factory(input, {
				subItem: {
					a: 10
				}
			} as any);

		}).toThrow();

	});

	it('factory() method should create subitems', function () {

		let createSub = (input: any) => {
			return factory(input, {
				number: ['a'],
				string: ['b'],
				default: {
					a: 10,
					b: 'AAA',
				}
			});
		};

		let inputMain = {
			num: '10',
			subs: [{a: '100'}, {a: 200, b: 'a'}, {b: 'c'}, {}]
		};

		let outcome = factory(inputMain, {
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

		let input = {
			ok: 'ok',
			number: '9',
			float: '9,54',
			string: 10,
			withDefault: 100,
			mustBeNull: 100
		};

		let outcome = factory(input, {
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

});
