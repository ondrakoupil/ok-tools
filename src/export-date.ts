import { DateStructNgbLike, parseTime } from './parse-time';

export function exportDate(input: Date | string | number): string | null {
	let time = parseTime(input);
	if (time) {
		return padNum4(time.getFullYear()) + '-' + padNum2(time.getMonth() + 1) + '-' + padNum2(time.getDate());
	}
	return null;
}

export function exportDateTime(input: Date | string | number): string | null {
	let time = parseTime(input);
	if (time) {
		return padNum4(time.getFullYear()) + '-' + padNum2(time.getMonth() + 1) + '-' + padNum2(time.getDate())
			+ 'T' + padNum2(time.getHours()) + ':' + padNum2(time.getMinutes()) + ':' + padNum2(time.getSeconds())
			;
	}
	return null;
}

export function exportDateAsNgb(input: Date): DateStructNgbLike {
	return {
		day: input.getDate(),
		month: input.getMonth() + 1,
		year: input.getFullYear(),
	};
}


function padNum2(num: number): string {
	return (num + '').padStart(2, '0');
}

function padNum4(num: number): string {
	return (num + '').padStart(4, '0');
}
