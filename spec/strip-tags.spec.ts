import { formatFileSize } from '../src/format-file-size';
import { stripTags } from '../src/strip-tags';

describe('Function stripTags()', function () {

	it('should strip tags correctly.', function () {

		let result;

		result = stripTags('Hello world.');
		expect(result).toBe('Hello world.');

		result = stripTags('<p>Hello <b class="balabambam aaa">world</b>.</p>');
		expect(result).toBe('Hello world.');

		result = stripTags('Hel<br />lo <p><a href="asdg#sda:asdg&asdg=asdg" target="_blank">world</a>.</p>');
		expect(result).toBe('Hello world.');

		result = stripTags('10 > 5 and 5 < 10');
		expect(result).toBe('10 > 5 and 5 < 10');

		result = stripTags('5<10 and 10>5');
		expect(result).toBe('5<10 and 10>5');

	});

});
