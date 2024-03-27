import { emailTypo } from '../src/email-typo';

describe('Function emailTypo()', function () {

	it('should find typos in e-mail', function () {

		expect(emailTypo('info@ondrakoupil.cz')).toBe('');
		expect(emailTypo('ondra@gmail.com')).toBe('');
		expect(emailTypo('ondra@gmial.com')).toBe('ondra@gmail.com');
		expect(emailTypo('gmail.cz@gmail.com')).toBe('');
		expect(emailTypo('seynam.cz@seynam.cz')).toBe('seynam.cz@seznam.cz');
		expect(emailTypo('pepa.z.depa1221+sssdd12@emai.cz')).toBe('pepa.z.depa1221+sssdd12@email.cz');

	});

});
