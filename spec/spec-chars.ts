import { specChars } from '../src/spec-chars';

describe('function specChars', function () {

	it('should convert chars correctly.', function () {

		let result;
		result = specChars('Say "No" to <b>brown</b> M&M\'s!');
		expect(result).toBe('Say &quot;No&quot; to &lt;b&gt;brown&lt;/b&gt; M&amp;M&#039;s!');

	});

})
