import { nl2br } from '../src/nl2br';
import { paginatorSequence } from '../src/paginator';

describe('Function paginatorSequence()', function () {

	it('should generate paginator sequence', function () {

		let result;

		result = paginatorSequence(5, 5, 100);
		expect(result).toEqual([1, 2, 3, 4, 5]);

		result = paginatorSequence(10, 5, 100);
		expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

		result = paginatorSequence(12, 6, 7);
		expect(result).toEqual([1, null, 4, 5, 6, 7, 8, null, 12]);

		result = paginatorSequence(12, 6, 9);
		expect(result).toEqual([1, 2, null, 4, 5, 6, 7, 8, null, 11, 12]);

		result = paginatorSequence(12, 6, 9, false);
		expect(result).toEqual([1, 2, 4, 5, 6, 7, 8, 11, 12]);


	});

});
