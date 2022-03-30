import { pluralize } from '../src/pluralize';

describe('Pluralize function', function () {

	it('should work as expected.', function pluralizeTest() {

		let result = pluralize(1, 'A', 'B', 'c');
		expect(result).toBe('A');

		result = pluralize(3, 'A', 'B', 'c');
		expect(result).toBe('B');

		result = pluralize(7, 'A', 'B', 'c');
		expect(result).toBe('c');

		result = pluralize(0, 'A', 'B', 'c');
		expect(result).toBe('c');

		result = pluralize(-1, 'A', 'B', 'c');
		expect(result).toBe('A');

		result = pluralize(-2, 'A', 'B', 'c');
		expect(result).toBe('B');

		result = pluralize(-10, 'A', 'B', 'c');
		expect(result).toBe('c');

		result = pluralize(1, '%% rohlík', '%% rohlíky', '%% rohlíků');
		expect(result).toBe('1 rohlík');

		result = pluralize(2, '%% rohlík', '%% rohlíky', '%% rohlíků');
		expect(result).toBe('2 rohlíky');

		result = pluralize(5, '%% rohlík', '%% rohlíky', '%% rohlíků');
		expect(result).toBe('5 rohlíků');

		result = pluralize(10, 'XX%% rohlík', 'XX%% rohlíky', 'XX%% rohlíků', 'XX');
		expect(result).toBe('10%% rohlíků');

	});

	it('should cope with less args', function () {

		let result = pluralize(10, 'A');
		expect(result).toBe('A');

		result = pluralize(2, 'A');
		expect(result).toBe('A');

		result = pluralize(2, 'A', 'B');
		expect(result).toBe('B');

		result = pluralize(10, 'A', 'B');
		expect(result).toBe('B');

	});

	it('should accept array argument', function () {

		let result = pluralize(3, ['a', 'b', 'c']);
		expect(result).toBe('b');

		result = pluralize(10, ['X', 'Y']);
		expect(result).toBe('Y');

		result = pluralize(10, ['X']);
		expect(result).toBe('X');

		result = pluralize(1, ['X%%', 'Y%%', 'Z%%']);
		expect(result).toBe('X1');

		result = pluralize(6, ['X', 'Z%%Z']);
		expect(result).toBe('Z6Z');

		result = pluralize(3, ['X%%R']);
		expect(result).toBe('X3R');

		result = pluralize(3, ['pX%%R'], 'p');
		expect(result).toBe('3X%%R');

		result = pluralize(21, ['pX%%R', 'fpr%%', 'dpn%%h'], 'p');
		expect(result).toBe('d21n%%h');


	});

});
