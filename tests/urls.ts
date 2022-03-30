import { humanizeUrl, technicalizeUrl } from '../src/urls';

describe('humanizeUrl', function () {

	it('should convert URL', function () {

		let res;

		res = humanizeUrl('https://www.hranostaj.cz');
		expect(res).toBe('www.hranostaj.cz');

		res = humanizeUrl('HTTP://www.hranostaj.cz/game.html?aaa=10');
		expect(res).toBe('www.hranostaj.cz');

		res = humanizeUrl(' httPS://www.hranostaj.cz/game.html?aaa=10&ss[]=2dsfs#ssaa  ');
		expect(res).toBe('www.hranostaj.cz');

	});

});

describe('technicalizeUrl', function () {

	it('should convert URL', function () {

		let res;

		res = technicalizeUrl('www.hranostaj.cz');
		expect(res).toBe('http://www.hranostaj.cz');

		res = technicalizeUrl('http://www.hranostaj.cz');
		expect(res).toBe('http://www.hranostaj.cz');

		res = technicalizeUrl('https://www.hranostaj.cz');
		expect(res).toBe('https://www.hranostaj.cz');

		res = technicalizeUrl('www.hranostaj.cz?ss=10&du[]=1223#ISSKss');
		expect(res).toBe('http://www.hranostaj.cz?ss=10&du[]=1223#ISSKss');

	});
});
