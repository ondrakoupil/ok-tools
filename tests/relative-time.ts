import { relativeTime } from '../src/relative-time';
import { Words } from '../src/time-constants';
import { Languages } from '../src/languages.enum';
import { parseTime } from '../src/parse-time';

describe('Relative Time function', function () {

	it('should handle correct inputs', function () {

		let now = new Date();
		let someDate = new Date();
		someDate.setDate(Math.round(Math.random() * 27));
		someDate.setFullYear(someDate.getFullYear() - 1);

		expect(
			relativeTime(now)
		).toBeTruthy();

		expect(
			relativeTime(someDate)
		).toBeTruthy();

		expect(
			relativeTime(someDate.getTime())
		).toBeTruthy();

		expect(
			relativeTime(someDate.getTime() / 1000)
		).toBe(
			relativeTime(someDate.getTime())
		);

		expect(
			relativeTime('2015-01-23')
		).toBeTruthy();

	});

	it('should work without giving exact time.', function () {

		// seconds ago
		let someTimeAgo = new Date();
		someTimeAgo.setTime(someTimeAgo.getTime() - 1000 * 5);

		expect(
			relativeTime(someTimeAgo)
		).toBe(
			Words.momentAgo[Languages.CZECH]
		);

		expect(
			relativeTime(someTimeAgo, Languages.ENGLISH)
		).toBe(
			Words.momentAgo[Languages.ENGLISH]
		);

		// yesterday
		let yesterday = new Date();
		yesterday.setTime(yesterday.getTime() - 1000 * 86400);

		expect(
			relativeTime(yesterday)
		).toContain(
			Words.yesterday[Languages.CZECH]
		);

		let timeNextSecond = new Date();
		timeNextSecond.setTime(timeNextSecond.getTime() + 1000);
		expect(
			relativeTime(timeNextSecond, Languages.ENGLISH)
		).toBe(Words.now[Languages.ENGLISH]);

		let timeNext20Seconds = new Date();
		timeNext20Seconds.setTime(timeNext20Seconds.getTime() + 1000 * 20);
		expect(
			relativeTime(timeNext20Seconds)
		).toBe(Words.momentLater[Languages.CZECH]);

		let timeNext10Minutes = new Date();
		timeNext10Minutes.setTime(timeNext10Minutes.getTime() + 10 * 60 * 1000 + 123);
		expect(
			relativeTime(timeNext10Minutes)
		).toBe('za 10 minut');

		let timeNext3hours = new Date();
		timeNext3hours.setTime(timeNext3hours.getTime() + 1000 * 60 * 60 * 3 * 1.02);
		expect(
			relativeTime(timeNext3hours)
		).toBe('za 3 hodiny');

		expect(
			relativeTime(
				'2023-05-14 09:28:43',
				Languages.CZECH,
				parseTime('2023-05-13 14:23:43'),
			)
		).toBe('zítra v 9:28');

		expect(
			relativeTime('2023-12-25 05:00:00', Languages.CZECH, parseTime('2023-08-11 09:00:05'))
		).toBe('25. prosince');

		expect(
			relativeTime('2025-12-25 05:00:00', Languages.CZECH, parseTime('2023-08-11 09:00:05'))
		).toBe('25. prosince 2025');

	});

	it('should return correct values for these test scenarios', function () {

		let basicTime = parseTime('2017-05-13 12:00:00')!;

		// Nyní
		expect(
			relativeTime(basicTime, Languages.CZECH, basicTime)
		).toBe(
			Words.now[Languages.CZECH]
		);

		expect(
			relativeTime('2017-05-13 12:00:02', Languages.ENGLISH, basicTime)
		).toBe(
			Words.now[Languages.ENGLISH]
		);


		// Před chvílí - před 30 sekundami
		expect(
			relativeTime('2017-05-13 11:59:30', Languages.CZECH, basicTime)
		).toBe(
			Words.momentAgo[Languages.CZECH]
		);

		// Před 1 minutou - do 1 hodiny
		expect(
			relativeTime('2017-05-13 11:58:56', Languages.CZECH, basicTime)
		).toBe(
			'před 1 minutou'
		);

		// Před 3 minutami - do 1 hodiny
		expect(
			relativeTime('2017-05-13 11:57:05', Languages.CZECH, basicTime)
		).toBe(
			'před 3 minutami'
		);

		// Před 43 minutami - do 1 hodiny
		expect(
			relativeTime('2017-05-13 11:17:05', Languages.CZECH, basicTime)
		).toBe(
			'před 43 minutami'
		);

		// Před 1 hodinou - do 10 hodin
		expect(
			relativeTime('2017-05-13 11:17:05', Languages.CZECH, basicTime)
		).toBe(
			'před 43 minutami'
		);

		// Před 8 hodinami - do 10 hodin
		expect(
			relativeTime('2017-05-13 04:03:05', Languages.CZECH, basicTime)
		).toBe(
			'před 8 hodinami'
		);

		// Před 11 hodinami - dnes, do 1 dne
		expect(
			relativeTime('2017-05-13 01:03:05', Languages.CZECH, basicTime)
		).toBe(
			'1:03'
		);

		// Před 15 hodinami - včera, do 1 dne
		expect(
			relativeTime('2017-05-12 15:24:21', Languages.CZECH, basicTime)
		).toBe(
			'včera v 15:24'
		);

		// Před 15 hodinami - včera, do 1 dne
		expect(
			relativeTime('2017-05-12 15:24:21', Languages.ENGLISH, basicTime)
		).toBe(
			'yesterday at 15:24'
		);

		// Před více dny - do týdne - včera
		expect(
			relativeTime('2017-05-12 09:10:21', Languages.CZECH, basicTime)
		).toBe(
			'včera v 9:10'
		);


		// Před více dny - do týdne
		expect(
			relativeTime('2017-05-10 11:24:21', Languages.CZECH, basicTime)
		).toBe(
			've středu v 11:24'
		);

		// Před více dny - do týdne
		expect(
			relativeTime('2017-05-08 11:24:21', Languages.ENGLISH, basicTime)
		).toBe(
			'on Monday at 11:24'
		);

		// Před více dny, tento rok
		expect(
			relativeTime('2017-02-06 11:24:21', Languages.CZECH, basicTime)
		).toBe(
			'6. února'
		);

		expect(
			relativeTime('2017-02-06 11:24:21', Languages.ENGLISH, basicTime)
		).toBe(
			'February 6'
		);

		// Minulý rok
		expect(
			relativeTime('2015-09-28 11:21:21', Languages.CZECH, basicTime)
		).toBe(
			'28. září 2015'
		);

		expect(
			relativeTime('2015-09-28 11:21:21', Languages.ENGLISH, basicTime)
		).toBe(
			'September 28, 2015'
		);


	});

});
