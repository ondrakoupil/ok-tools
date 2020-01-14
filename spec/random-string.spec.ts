import { generateRandomIdentifier } from '../src/random-string';

describe('Function generateRandomIdentifier()', function () {

	it('should generate correct text', function () {

		let result;

		result = generateRandomIdentifier(4);
		expect(result).toMatch(/[0-9a-z]{4}/);

		result = generateRandomIdentifier(10);
		expect(result).toMatch(/[0-9a-z]{10}/);

		result = generateRandomIdentifier(0);
		expect(result).toBe('');

		result = generateRandomIdentifier(123);
		expect(result).toMatch(/[0-9a-z]{123}/);

		expect(function () {
			generateRandomIdentifier(-4);
		}).toThrow();

	});

});
