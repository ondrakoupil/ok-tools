import { exportDate, exportDateAsNgb, exportDateTime } from '../src/export-date';
import { DateStructNgbLike, parseTime } from '../src/parse-time';

describe('Function exportDate()', function () {

	it('should return proper values', function () {

		let date = new Date('2021-05-13T23:56:11');
		expect(
			exportDate(date)
		).toBe('2021-05-13');

		let dateTime = new Date('2021-05-13');
		dateTime.setHours(21);
		dateTime.setMinutes(15);
		dateTime.setSeconds(12);
		expect(
			exportDateTime(dateTime)
		).toBe('2021-05-13T21:15:12');

	});

	it('should export ngb-like dates correctly', function () {

		let date = parseTime('2021-05-11');
		let out = exportDateAsNgb(date!);
		expect(out).toEqual({day: 11, month: 5, year: 2021} as DateStructNgbLike);

	});

});
