import { phoneNumberFormatter } from '../src/phone-number-formatter';


describe('phoneNumberFormatter function', function () {


	it('should convert strings correctly.', function () {

		expect(phoneNumberFormatter('721374431')).toBe('+420721374431');
		expect(phoneNumberFormatter('+420721374431')).toBe('+420721374431');
		expect(phoneNumberFormatter('+421721374431')).toBe('+421721374431');
		expect(phoneNumberFormatter('+88721374431')).toBe('+88721374431');

		expect(phoneNumberFormatter('tel: 721.3-744/31')).toBe('+420721374431');
		expect(phoneNumberFormatter('tel: 721.3-744/31', false)).toBe('721374431');
		expect(phoneNumberFormatter('tel: 721.3-744/31', false, ' ')).toBe('721 374 431');
		expect(phoneNumberFormatter('tel: 721.3-744/31', true, ' ')).toBe('+420 721 374 431');

		expect(phoneNumberFormatter('721374431', false)).toBe('721374431');
		expect(phoneNumberFormatter('721374431', false, ' ')).toBe('721 374 431');
		expect(phoneNumberFormatter('721374431', false, '/')).toBe('721/374/431');

	});

});
