import { Languages } from './languages.enum';
import { Days, Months, Words } from './time-constants';
import { pluralize } from './pluralize';
import { parseTime } from './parse-time';

export function relativeTime(
	input: Date | number | string,
	language: Languages = Languages.CZECH,
	now: Date | null = null
): string {

	let date = parseTime(input);

	if (!date) {
		return '';
	}

	let thatTime = date!.getTime();

	if (!now) {
		now = new Date();
	}

	let diff = now.getTime() - thatTime;

	// Budoucí datum - asi jen omylem, zaokrouhlíme na 0
	if (diff < 0 && diff > -100) {
		diff = 0;
	}

	// Future dates support
	if (diff < 0) {

		if (diff > -5000) {
			return Words.now[language];
		}
		if (diff > -60000) {
			return Words.momentLater[language];
		}
		if (diff > -3600000) {
			let minutes = -1 * Math.round(diff / 60000);
			return pluralize(minutes, Words.minutesLater[language]);
		}
		if (diff > -3600000 * 5) {
			let hours = -1 * Math.round(diff / (3600 * 1000));
			return pluralize(hours, Words.hoursLater[language]);
		}
		if (diff > -3600 * 1000 * 23) {
			let tomorrow = '';
			if (date.getDay() === now.getDay() + 1 || (now.getDay() === 6 && date.getDay() === 0)) {
				tomorrow = Words.tomorrowAt[language] + ' ';
			} else {
				tomorrow = Words.todayAt[language] + ' ';
			}
			return tomorrow + formatTimeOfDay(date);
		}

		// tento rok
		if (now.getFullYear() === date.getFullYear()) {
			if (language === Languages.CZECH) {
				// @ts-ignore
				return (date.getDate()) + '. ' + Months.namesGenitive[language][date.getMonth() + 1];
			} else {
				// @ts-ignore
				return Months.names[language][date.getMonth() + 1] + ' ' + (date.getDate());
			}
		}

		// ještě později
		if (language === Languages.CZECH) {
			// @ts-ignore
			return (date.getDate()) + '. ' + Months.namesGenitive[language][date.getMonth() + 1] + ' ' + (date.getFullYear());
		} else {
			// @ts-ignore
			return Months.names[language][date.getMonth() + 1] + ' ' + (date.getDate()) + ', ' + (date.getFullYear());
		}

	}

	// Before now dates

	// Do 5 sekund
	if (diff < 5) {
		return Words.now[language];
	}

	// do 1 minuty
	if (diff < 60000) {
		return Words.momentAgo[language];
	}

	// do 1 hodiny
	if (diff < 3600000) {
		let minutes = Math.round(diff / 60000);
		return pluralize(minutes, Words.minutesAgo[language]);
	}

	// do 10 hodin
	if (diff < 3600 * 1000 * 10) {
		let hours = Math.round(diff / (3600 * 1000));
		return pluralize(hours, Words.hoursAgo[language]);
	}

	// do 24 hodin
	if (diff < 3600 * 1000 * 24) {
		let yesterdayText = '';
		if (date.getDay() === now.getDay() - 1) {
			yesterdayText = Words.yesterdayAt[language] + ' ';
		}
		return yesterdayText + formatTimeOfDay(date);
	}

	// do 6 dnů
	if (diff < 3600 * 1000 * 24 * 6) {
		let yesterdayText = '';
		if (date.getDay() === now.getDay() - 1) {
			yesterdayText = Words.yesterdayAt[language] + ' ';
		}
		if (date.getDay() === 6 && now.getDay() === 0) {
			yesterdayText = Words.yesterdayAt[language] + ' ';
		}
		if (!yesterdayText) {
			let dayInWeek = date.getDay();
			// @ts-ignore
			yesterdayText = Days.localAt[language][dayInWeek] + ' ';
		}

		return yesterdayText + formatTimeOfDay(date);
	}

	let yearStart = new Date();
	yearStart.setTime(now.getTime());
	yearStart.setDate(1);
	yearStart.setMonth(1);

	// tento rok
	if (yearStart.getFullYear() === date.getFullYear()) {
		if (language === Languages.CZECH) {
			// @ts-ignore
			return (date.getDate()) + '. ' + Months.namesGenitive[language][date.getMonth() + 1];
		} else {
			// @ts-ignore
			return Months.names[language][date.getMonth() + 1] + ' ' + (date.getDate());
		}
	}

	// ještě dříve
	if (language === Languages.CZECH) {
		// @ts-ignore
		return (date.getDate()) + '. ' + Months.namesGenitive[language][date.getMonth() + 1] + ' ' + (date.getFullYear());
	} else {
		// @ts-ignore
		return Months.names[language][date.getMonth() + 1] + ' ' + (date.getDate()) + ', ' + (date.getFullYear());
	}

}

function formatTimeOfDay(date: Date) {
	let m = (date.getMinutes()) + '';
	if (m.length === 1) {
		m = '0' + m;
	}
	let h = (date.getHours()) + '';
	// if (h.length === 1) {
	// 	h = '0' + h;
	// }
	return h + ':' + m;
}
