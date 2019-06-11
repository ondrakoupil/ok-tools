export type OpeningHour = number;

export interface OpeningHoursInterval {
	open: OpeningHour;
	close: OpeningHour;
}

export type OpeningHoursDay = OpeningHoursInterval[];

export interface OpeningHoursWeek {
	1: OpeningHoursDay;
	2: OpeningHoursDay;
	3: OpeningHoursDay;
	4: OpeningHoursDay;
	5: OpeningHoursDay;
	6: OpeningHoursDay;
	7: OpeningHoursDay;
}

export enum OpeningHoursStatus {
	CLOSED = 0,
	OPEN = 1,
}

export interface OpeningHoursResult {
	currentStatus: OpeningHoursStatus;
	nextStatus: OpeningHoursStatus;
	nextChangeDay: number;
	nextChangeTime: OpeningHour;
	nextChangeIsToday: boolean;
	nextChangeIsTomorrow: boolean;
}

export interface OpeningHoursFormattedRow {
	dayFrom: number;
	dayTo: number;
	hours: string;
	isSingleDay: boolean;
	isCurrent: boolean;
	isOpen: boolean;
}

export type OpeningHoursFormatted = OpeningHoursFormattedRow[];

export function parseWeek(input: { [key: number]: string }, returnNullIfEmpty = false): OpeningHoursWeek|null {
	let r = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: [],
		7: [],
	};

	if (Array.isArray(input) && !(input.length === 8 && !input[0] && (input[7] || input[7] === ''))) {
		for (let i = 6; i >= 0; i--) {
			input[i + 1] = input[i];
		}
		delete input[0];
	}

	let isAnything = false;
	for (let i = 1; i <= 7; i++) {
		r[i] = parseDay(input[i]);
		if (r[i].length > 0) {
			isAnything = true;
		}
	}

	if (!isAnything && returnNullIfEmpty) {
		return null;
	}

	return r;
}

export function parseDay(input: string): OpeningHoursDay {
	if (!input) {
		return [];
	}
	let intervals = input.split(/[,;]+/).filter((r) => !!r);
	let ints: OpeningHoursInterval[] = intervals.map(
		(i) => {
			let r;
			try {
				r = parseInterval(i);
				return r;
			} catch (e) {
				return null;
			}
		}
	).filter(r => !!r);

	ints.sort(
		(i1, i2) => {
			return i1.open - i2.open;
		}
	);

	ints.forEach(
		(interval: OpeningHoursInterval, index) => {
			let next = ints[index + 1];
			if (!next) {
				return;
			}
			if (interval.close > next.open) {
				throw new Error('Invalid sequence in intervals: ' + input);
			}
		}
	);

	return ints;
}

export function parseInterval(input: string): OpeningHoursInterval {
	if (!input) {
		return null;
	}
	let parts = input.trim().split(/[\s-]+/).filter((r) => !!r);
	if (parts.length === 2) {
		let p = {
			open: parseHour(parts[0]),
			close: parseHour(parts[1]),
		};

		if (p.open === p.close) {
			throw new Error('Interval is meaningless - ' + input);
		}

		if (p.open > p.close) {
			p.close += 24;
		}

		return p;
	}
	throw new Error('Can not parse interval: ' + input);
}

export function parseHour(input: string): OpeningHour {
	let parts = input.trim().split(/[:\.]+/).filter((r) => !!r);
	if (parts.length === 2) {
		let hour = clamp(parseInt(parts[0], 10), 0, 24);
		let minute = clamp(parseInt(parts[1], 10), 0, 60);
		if (isNaN(hour) || isNaN(minute)) {
			throw new Error('Can not parse hour');
		}
		if (minute >= 60) {
			minute = 0;
			hour++;
		}
		if (hour === 24) {
			minute = 0;
		}
		return hour + (minute / 60);
	}
	if (parts.length === 1) {
		let t = parseInt(parts[0], 10);
		if (isNaN(t)) {
			throw new Error('Can not parse hour: ' + input);
		}
		return clamp(t, 0, 24);
	}
	throw new Error('Can not parse hour: ' + input);
}

export function formatHour(input: OpeningHour): string {
	let fixedInput = input;
	if (fixedInput > 24) {
		fixedInput -= 24;
	}
	if (fixedInput > 24) {
		throw new Error('Invalid input time - ' + input);
	}

	let hour = Math.floor(fixedInput);
	let hourString = hour + '';
	if (hour < 10) {
		if (!hour) {
			hourString = '00';
		} else {
			hourString = '0' + hourString;
		}
	}
	let minutes = Math.round((fixedInput - hour) * 60);
	let minutesString = minutes + '';
	if (minutes < 10) {
		if (!minutes) {
			minutesString = '00';
		} else {
			minutesString = '0' + minutesString;
		}
	}
	return hourString + ':' + minutesString;
}

export function formatInterval(input: OpeningHoursInterval): string {
	return formatHour(input.open) + ' - ' + formatHour(input.close);
}

export function formatDay(input: OpeningHoursDay): string {
	return input.map((r) => formatInterval(r)).join(', ');
}

export function formatWeek(input: OpeningHoursWeek, now: Date = null): OpeningHoursFormatted {
	if (!now) {
		now = new Date();
	}
	let day = now.getDay();
	if (!day) {
		day = 7;
	}
	let result: OpeningHoursFormatted = [];

	let currentRow: OpeningHoursFormattedRow;
	let currentFormatted = '';

	for (let i = 1; i <= 7; i++) {
		let thisDayFormatted = formatDay(input[i]);
		if (!currentRow || thisDayFormatted !== currentRow.hours) {
			if (currentRow) {
				result.push(currentRow);
			}
			currentRow = {
				dayFrom: i,
				dayTo: i,
				isSingleDay: true,
				hours: thisDayFormatted,
				isCurrent: false,
				isOpen: !!thisDayFormatted,
			};
			currentFormatted = thisDayFormatted;
		} else if (currentRow) {
			currentRow.isSingleDay = false;
			currentRow.dayTo = i;
		}
	}

	if (currentRow) {
		result.push(currentRow);
	}

	result.map(
		(row) => {
			if (row.dayFrom <= day && row.dayTo >= day) {
				row.isCurrent = true;
			}
		}
	);

	return result;
}

export function processHours(hours: OpeningHoursWeek, now: Date = null): OpeningHoursResult {
	if (!now) {
		now = new Date();
	}
	let day = now.getDay();
	if (!day) {
		day = 7;
	}
	let todayRules: OpeningHoursDay = hours[day];
	let yesterdayRules: OpeningHoursDay = day === 1 ? hours[7] : hours[day - 1];
	let thisTime = now.getHours() + now.getMinutes() / 60;

	let isOpen = false;
	let nextChange = null;
	let nextChangeDay = null;
	let nextChangeIsOpening = null;
	let nextChangeIsToday = false;
	let nextChangeIsTomorrow = false;

	// Standard scenario - today is just open or we open this day later
	for (let interval of todayRules) {
		if (interval.open <= thisTime && interval.close >= thisTime) {
			isOpen = true;
			nextChangeIsOpening = false;
			nextChange = interval.close;
			nextChangeDay = day;
			nextChangeIsToday = true;
		} else if (interval.open > thisTime) {
			if (nextChange === null) {
				nextChangeIsOpening = true;
				nextChange = interval.open;
				nextChangeIsToday = true;
				nextChangeDay = day;
			}
		}
	}

	// Special scenario - we opened yesterday and still are open
	if (!nextChange !== null && yesterdayRules.length) {
		let thisTimeOverlapped = thisTime + 24;
		for (let interval of yesterdayRules) {
			if (interval.open <= thisTimeOverlapped && interval.close >= thisTimeOverlapped) {
				isOpen = true;
				nextChangeIsOpening = false;
				nextChange = interval.close - 24;
				nextChangeDay = day;
				nextChangeIsToday = true;
			}
		}
	}

	// Special scenario - we are open and we close tomorrow
	if (nextChange > 24) {
		nextChange -= 24;
		nextChangeDay += 1;
		nextChangeIsToday = false;
		nextChangeIsTomorrow = true;
		if (nextChangeDay > 7) {
			nextChangeDay -= 7;
		}
	}

	// Standard scenario - we open tomorrow or some later day
	if (nextChange === null) {
		let followingDays = [];
		let tomorrow = day + 1;
		if (tomorrow >= 8) {
			tomorrow = 1;
		}
		for (let i = day + 1; i <= 7; i++) {
			followingDays.push(i);
		}
		for (let i = 1; i < day; i++) {
			followingDays.push(i);
		}
		for (let nextDay of followingDays) {
			if (nextChange !== null) {
				break;
			}
			for (let interval of hours[nextDay]) {
				if (nextChange !== null) {
					break;
				}
				if (interval.open) {
					nextChange = interval.open;
					nextChangeIsOpening = true;
					nextChangeIsTomorrow = (nextDay === tomorrow);
					nextChangeDay = nextDay;
				}
			}
		}
	}

	return {
		currentStatus: isOpen ? OpeningHoursStatus.OPEN : OpeningHoursStatus.CLOSED,
		nextStatus: nextChangeIsOpening ? OpeningHoursStatus.OPEN : OpeningHoursStatus.CLOSED,
		nextChangeDay: nextChangeDay,
		nextChangeTime: nextChange,
		nextChangeIsToday: nextChangeIsToday,
		nextChangeIsTomorrow: nextChangeIsTomorrow,
	};

}

function clamp(n: number, low: number, high: number) {
	if (n < low) {
		return low;
	}
	if (n > high) {
		return high;
	}
	return n;
}
