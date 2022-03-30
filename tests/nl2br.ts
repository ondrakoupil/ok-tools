import { nl2br } from '../src/nl2br';

describe('Function nl2br()', function () {

	it('should change text', function () {

		let result;

		result = nl2br('Hello,\nMy name is John');
		expect(result).toBe('Hello,<br />\nMy name is John');

		result = nl2br('Hello,\n\n\nMy name is John');
		expect(result).toBe('Hello,<br />\n<br />\n<br />\nMy name is John');

		result = nl2br('Hello,\r\nMy name is John');
		expect(result).toBe('Hello,<br />\r\nMy name is John');

		result = nl2br('Hello,\r\n\r\nMy name is John');
		expect(result).toBe('Hello,<br />\r\n<br />\r\nMy name is John');

		result = nl2br('Hello,\n\r\n\rMy name is John');
		expect(result).toBe('Hello,<br />\n\r<br />\n\rMy name is John');

	});

});
