import { boolean, date, factory, number, string, DefinitionForFactory } from '../src/data-factory';

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

		expect(date('2019-02-12T20:00:00+01:00')!.getTime()).toBe(1549998000000);
		expect(date('0')).toBe(null);
		expect(date('abcde')).toBe(null);
		expect(date(null)).toBe(null);
		expect(date('2019-01-10')!.getTime()).toBe((new Date('2019-01-10T00:00:00')).getTime());
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
				numMap: (v: any) => (v * 20),
				numMap2: (v: any) => (v * 20),
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
		expect(outcome.dateA.getTime()).toBe(date('2020-01-05 20:00:01')!.getTime());
		expect(outcome.dateX).toBe(null);
		expect(outcome.numMap).toBe(2000);
		expect(outcome.numMap2).toBe(30);
		expect(outcome.anything).toBe('ddd');
		expect(outcome.nothing).toBeUndefined();
		expect(outcome.someObject.a).toBe('1');
		expect(outcome.someObject.b).toBe('B');
		expect(outcome.someObject.c.getTime()).toBe(date('2020-01-01 20:00:01')!.getTime());
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
				a: (i: any) => i * 2,
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

	it('factory() should use "from" correctly', function () {

		let source = {
			hundred: '100',
			ten: 10,
			num: '1000',
		};

		let result = factory(
			source,
			{
				from: {
					deset: 'ten',
					sto: 'hundred',
					m: 'million',
					func: (s: any) => (s.ten * 2),
					onlyInFrom: () => 1234,
					onlyInFrom2: 'hundred',
					onlyInFrom3: (s: any) => s.num,
					stringFrom: 'ten'
				},
				default: {
					m: 1000000,
				},
				number: ['hundred', 'num', 'deset', 'm', 'func', 'sto'],
				string: ['stringFrom'],
			}
		);

		expect(result.deset).toBe(10);
		expect(result.sto).toBe(100);
		expect(result.num).toBe(1000);
		expect(result.m).toBe(1000000);
		expect(result.func).toBe(20);

		expect(result.onlyInFrom).toBe(1234);
		expect(result.onlyInFrom2).toBe('100');
		expect(result.onlyInFrom3).toBe('1000');
		expect(result.stringFrom).toBe('10');
	});

	it('factory() should handle "objects" in definition', function () {

		let source = {
			a: 100,
			stuff: [{num: '100', char: 1}, {num: 200, char: '2'}, {char: 3}],
			otherStuff: [{a: '1'}, {a: '2'}, {a: 3}],
		};

		let out = factory(source, {
			string: ['a'],
			objects: {
				stuff: {
					string: ['char'],
					number: ['num'],
					default: {
						num: 1000,
					}
				},
				otherStuff: {
					number: ['a', 'b'],
					map: {
						a: (s: any) => (s * 2),
					},
					default: {
						b: '5',
					},
				}
			}
		});

		expect(out.stuff.length).toBe(3);
		expect(out.stuff[0].num).toBe(100);
		expect(out.stuff[0].char).toBe('1');
		expect(out.stuff[1].num).toBe(200);
		expect(out.stuff[1].char).toBe('2');
		expect(out.stuff[2].num).toBe(1000);
		expect(out.stuff[2].char).toBe('3');

		expect(out.otherStuff.length).toBe(3);
		expect(out.otherStuff[0].a).toBe(2);
		expect(out.otherStuff[0].b).toBe(5);
		expect(out.otherStuff[1].a).toBe(4);
		expect(out.otherStuff[1].b).toBe(5);
		expect(out.otherStuff[2].a).toBe(6);
		expect(out.otherStuff[2].b).toBe(5);


	});


	it('should work with "extends" in definition', () => {

		let parentDef: DefinitionForFactory = {
			string: ['id', 'something'],
			number: ['price'],
			default: {
				firstUndef: 4,
				undef: 1,
			}
		};

		let parentFactory = (s: any) => factory(s, parentDef);

		let childDef: DefinitionForFactory = {
			number: ['something'],
			date: ['created'],
			extends: parentFactory,
			default: {
				undef: 2,
			}
		};


		let childFactory = (s: any) => factory(s, childDef);

		let childCreated = childFactory({
			id: 4,
			something: '2',
			price: '100,23',
			created: '2022-05-13T12:05:10'
		});

		expect(childCreated).toEqual({
			id: '4',
			something: 2,
			price: 100.23,
			created: date('2022-05-13T12:05:10'),
			undef: 2,
			firstUndef: 4,
		});

	});

});
