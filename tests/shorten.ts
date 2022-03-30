import { shorten } from '../src/shorten';

describe('Function shorten()', function () {

	it('should change text', function () {

		let result;

		// Keep short text unchanged
		result = shorten('Hello, world!', 1000);
		expect(result).toBe('Hello, world!');

		result = shorten('Hello, world!', 1000, false);
		expect(result).toBe('Hello, world!');

		result = shorten('Hello, world!', 1000, true, 'xxx');
		expect(result).toBe('Hello, world!');

		result = shorten('Hello, world!', 1000, false, 'xxx');
		expect(result).toBe('Hello, world!');

		result = shorten('Hello, world!', 1000, false, '');
		expect(result).toBe('Hello, world!');

		// Shorten
		result = shorten('Hello dear world, how are you?', 12);
		expect(result).toBe('Hello dear');

		result = shorten('Hello dear world, how are you?', 16);
		expect(result).toBe('Hello dear world');

		result = shorten('Hello dear world, how are you?', 13, false);
		expect(result).toBe('Hello dear wo');

		result = shorten('Hello dear world, how are you?', 13, true, '...');
		expect(result).toBe('Hello dear...');

		result = shorten('Hello dear world, how are you?', 12, true, '...');
		expect(result).toBe('Hello...');

		result = shorten('Hello dear world, how are you?', 16, true, '...');
		expect(result).toBe('Hello dear...');

		result = shorten('Hello dear world, how are you?', 16, true, '');
		expect(result).toBe('Hello dear world');


	});

});
