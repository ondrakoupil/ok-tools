import { parseTime } from '../src/parse-time';


describe('ParseTime function', function() {

	it('should accept date input', function() {

		let now = new Date();
		now.setHours(1);
		now.setDate(3);

		let res = parseTime(now)!;
		expect(res.getTime()).toBe(now.getTime());

	});

	it('should accept number input', function() {

		let now = new Date();
		now.setHours(1);
		now.setDate(3);

		let res = parseTime(now.getTime())!;
		expect(res.getTime()).toBe(now.getTime());

		res = parseTime(1325502732)!;
		expect(res.getTime()).toBe(1325502732000);

		res = parseTime('1325502732')!;
		expect(res.getTime()).toBe(1325502732000);
	});

	it('should accept various string inputs', function() {

		let res = parseTime('2015-04-12')!;
		expect(res.getFullYear()).toBe(2015);
		expect(res.getDate()).toBe(12);
		expect(res.getMonth()).toBe(3);

		res = parseTime('2015-04-12 15:12:16')!;
		expect(res.getFullYear()).toBe(2015);
		expect(res.getDate()).toBe(12);
		expect(res.getMonth()).toBe(3);
		expect(res.getHours()).toBe(15);
		expect(res.getMinutes()).toBe(12);
		expect(res.getSeconds()).toBe(16);

		res = parseTime('2015-04-12T11:12:13')!;

		expect(res.getFullYear()).toBe(2015);
		expect(res.getDate()).toBe(12);
		expect(res.getMonth()).toBe(3);
		expect(res.getHours()).toBe(11);
		expect(res.getMinutes()).toBe(12);
		expect(res.getSeconds()).toBe(13);

	});

	it('should handle correctly czech string input', function() {

		let res = parseTime('2. 5. 2021')!;
		expect(res.getMonth()).toBe(4); // May, not Febuary!
		expect(res.getDate()).toBe(2);
		expect(res.getFullYear()).toBe(2021);

		let res2 = parseTime('10. 4. 2022   10:23:01')!;
		expect(res2.getMonth()).toBe(3);
		expect(res2.getDate()).toBe(10);
		expect(res2.getFullYear()).toBe(2022);
		expect(res2.getHours()).toBe(10);
		expect(res2.getMinutes()).toBe(23);
		expect(res2.getSeconds()).toBe(1);

		let res3 = parseTime('10. 4. 2022 10.23')!;
		expect(res3.getMonth()).toBe(3);
		expect(res3.getDate()).toBe(10);
		expect(res3.getFullYear()).toBe(2022);
		expect(res3.getHours()).toBe(10);
		expect(res3.getMinutes()).toBe(23);
		expect(res3.getSeconds()).toBe(0);

	});

});
