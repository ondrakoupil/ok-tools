import { range } from '../src/range';

describe('Function range()', function () {

	it('should create range.', function () {

		expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
		expect(range(4, 10, 2)).toEqual([4, 6, 8, 10]);
		expect(range(4, 11, 2)).toEqual([4, 6, 8, 10]);

		expect(() => {
			range(10, 9);
		}).toThrow();

		expect(range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);


	});

});
