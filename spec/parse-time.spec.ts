import { parseTime } from '../src/parse-time';


describe('ParseTime function', function() {

	it('should accept date input', function() {

		let now = new Date();
		now.setHours(1);
		now.setDate(3);

		let res = parseTime(now);
		expect(res.getTime()).toBe(now.getTime());

	});

	it('should accept number input', function() {

		let now = new Date();
		now.setHours(1);
		now.setDate(3);

		let res = parseTime(now.getTime());
		expect(res.getTime()).toBe(now.getTime());

		res = parseTime(1325502732);
		expect(res.getTime()).toBe(1325502732000);

		res = parseTime('1325502732');
		expect(res.getTime()).toBe(1325502732000);
	});

	it('should accept various string inputs', function() {

		let res = parseTime('2015-04-12');
		expect(res.getFullYear()).toBe(2015);
		expect(res.getDate()).toBe(12);
		expect(res.getMonth()).toBe(3);

		res = parseTime('2015-04-12 15:12:16');
		expect(res.getFullYear()).toBe(2015);
		expect(res.getDate()).toBe(12);
		expect(res.getMonth()).toBe(3);
		expect(res.getHours()).toBe(15);
		expect(res.getMinutes()).toBe(12);
		expect(res.getSeconds()).toBe(16);

		res = parseTime('2015-04-12T11:12:13');

		expect(res.getFullYear()).toBe(2015);
		expect(res.getDate()).toBe(12);
		expect(res.getMonth()).toBe(3);
		expect(res.getHours()).toBe(Math.floor(11 - (new Date()).getTimezoneOffset() / 60));
		expect(res.getMinutes()).toBe(12);
		expect(res.getSeconds()).toBe(13);

	});

});
