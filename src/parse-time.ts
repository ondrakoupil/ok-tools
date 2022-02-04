export function parseTime(input: string | Date | number, returnNullOnInvalid = true) {

	let date = new Date();

	if (typeof input === 'string') {
		let number = parseInt(input, 10);
		if (!isNaN(number) && (number + '') === input) {
			input = number;
		}
	}

	switch (typeof input) {
		case 'object':
			if (!(input instanceof Date)) {
				if (returnNullOnInvalid) {
					return null;
				}
				throw new Error('Given input must be a Date, parsable string or a number timestamp.');
			}
			date = input;
			break;

		case 'string':
			let stringInput = <string>input;
			let alreadyCreatedDate = false;

			// mysql format
			let match = (stringInput).trim().match(/^(\d{4})-(\d{2})-(\d{2})([\sT]+(\d{2}):(\d{2}):(\d{2}))?$/);
			if (match) {
				stringInput = match[2] + '/' + match[3] + '/' + match[1];
				if (match[4]) {
					stringInput += ' ' + match[5] + ':' + match[6] + ':' + match[7];
				}
			}

			// czech human format
			let matchHuman = (stringInput).trim().match(/^(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{2,4})(\s+(\d{2})[:.](\d{2})([:.](\d{2}))?)?$/);
			if (matchHuman) {
				alreadyCreatedDate = true;
				date = new Date(
					parseInt(matchHuman[3]),
					parseInt(matchHuman[2]) - 1,
					parseInt(matchHuman[1]),
					parseInt(matchHuman[5]) || 12,
					parseInt(matchHuman[6]) || 0,
					parseInt(matchHuman[8]) || 0,
				);
			}

			if (!alreadyCreatedDate) {
				date = new Date(stringInput);
			}

			if (!date.getTime() || isNaN(date.getTime())) {
				if (returnNullOnInvalid) {
					return null;
				}
				throw new Error('Given input could not be parsed into a Date: ' + stringInput);
			}
			break;

		case 'number':
			let fixedInput: number;
			if (input < 2000000000) {
				fixedInput = <number>input * 1000;
			} else {
				fixedInput = <number>input;
			}
			date = new Date(fixedInput);
			if (!date.getTime() || isNaN(date.getTime())) {
				if (returnNullOnInvalid) {
					return null;
				}
				throw new Error('Given input could not be parsed into a Date: ' + input);
			}

	}

	if (!date.getTime() || isNaN(date.getTime())) {
		if (returnNullOnInvalid) {
			return null;
		}
		throw new Error('Given input could not be parsed into a Date.');
	}

	return date;

}
