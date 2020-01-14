import { formatWebAddress } from '../src/web-address-formatter';


describe('formatWebAddress function', function () {


	it('should convert strings correctly.', function () {

		let input = 'https://www.hranostaj.cz/ahoj.html';

		expect(formatWebAddress(input, 'link')).toBe('https://www.hranostaj.cz/ahoj.html');
		expect(formatWebAddress(input, 'short')).toBe('www.hranostaj.cz');
		expect(formatWebAddress(input, 'full')).toBe('www.hranostaj.cz/ahoj.html');

		input = 'http://www.hranostaj.cz/';

		expect(formatWebAddress(input, 'link')).toBe('http://www.hranostaj.cz/');
		expect(formatWebAddress(input, 'short')).toBe('www.hranostaj.cz');
		expect(formatWebAddress(input, 'full')).toBe('www.hranostaj.cz');

		input = 'https://www.hranostaj.cz';
		expect(formatWebAddress(input, 'link')).toBe('https://www.hranostaj.cz/');
		expect(formatWebAddress(input, 'short')).toBe('www.hranostaj.cz');
		expect(formatWebAddress(input, 'full')).toBe('www.hranostaj.cz');

		input = 'hranostaj.cz/search';
		expect(formatWebAddress(input, 'link')).toBe('http://hranostaj.cz/search');
		expect(formatWebAddress(input, 'short')).toBe('hranostaj.cz');
		expect(formatWebAddress(input, 'full')).toBe('hranostaj.cz/search');

		expect(formatWebAddress(input, 'link', 'https')).toBe('https://hranostaj.cz/search');
		expect(formatWebAddress(input, 'short', 'https')).toBe('hranostaj.cz');
		expect(formatWebAddress(input, 'full', 'https')).toBe('hranostaj.cz/search');

		input = 'ftp://1.2.3.4:80@ahoj:password/1/2/3/4/5/6';
		expect(formatWebAddress(input, 'link', 'https')).toBe('ftp://1.2.3.4:80@ahoj:password/1/2/3/4/5/6');
		expect(formatWebAddress(input, 'short', 'https')).toBe('1.2.3.4:80@ahoj:password');
		expect(formatWebAddress(input, 'full', 'https')).toBe('1.2.3.4:80@ahoj:password/1/2/3/4/5/6');

	});

});
