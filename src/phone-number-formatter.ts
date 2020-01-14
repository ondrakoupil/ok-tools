export function phoneNumberFormatter(
	input: string,
	international = true,
	spaces = '',
	internationalPrefix = '+',
	defaultInternational = '420',
): string {

	if (!input) {
		return '';
	}

	let filteredInput = input.replace(/\D/g, '');

	let parsedInternational = '';
	let parsedMain = '';

	if (filteredInput.length > 9) {
		parsedInternational = filteredInput.substr(0, filteredInput.length - 9);
		parsedMain = filteredInput.substr(filteredInput.length - 9);
	} else {
		parsedMain = filteredInput;
	}

	if (internationalPrefix) {
		let escapedPrefix = internationalPrefix.replace(/([\[\\^$.|?*+()])/g, '\\$1');
		let regexpPrefix = new RegExp('^' + escapedPrefix, 'i');

		if (parsedInternational.match(regexpPrefix)) {
			parsedInternational = parsedInternational.substr(internationalPrefix.length);
		}
	}

	let spacedMain = '';

	if (spaces) {
		let len = parsedMain.length;
		for (let i = len; i > -3; i -= 3) {
			spacedMain = parsedMain.substr((i >= 0 ? i : 0), (i >= 0 ? 3 : (3 - i * -1)))
				+ (spacedMain ? (spaces + spacedMain) : '');
		}
	} else {
		spacedMain = parsedMain;
	}

	let output = '';
	if (international) {
		if (!parsedInternational) {
			parsedInternational = defaultInternational;
		}

		output += internationalPrefix + parsedInternational;
		if (spaces) {
			output += spaces;
		}
	}
	output += spacedMain;

	return output;

}
