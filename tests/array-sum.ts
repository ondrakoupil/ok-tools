import { arraySum } from '../src/array-sum';

describe('Function arraySum()', function () {

	it('should calculate proper values', function () {

		let result: number;

		expect(arraySum([1, 2, 100, 0, -5, 3])).toBe(101);
		expect(arraySum([1])).toBe(1);
		expect(arraySum([])).toBe(0);
		expect(arraySum([0])).toBe(0);

		// @ts-ignore
		expect(arraySum([1, 2, 5, null, 10])).toBe(18);

		// @ts-ignore
		expect(arraySum(null)).toBe(0);

	});

});
