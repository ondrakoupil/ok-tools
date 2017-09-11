/**
 * Generate string using czech pluralization rules.
 *
 * Can be called also as pluralize(number, [one, two, five], symbol);
 *
 * @param {number} number
 * @param {string} one
 * @param {string} two
 * @param {string} five
 * @param {string} symbol
 * @return {string}
 */
export function pluralize(number: number, one: string|string[], two = '', five = '', symbol: string = '%%') {

	if (one && typeof one == 'object' && one.length) {
		symbol = two;
		if (!symbol) {
			symbol = '%%';
		}
		two = one[1] ? one[1] : one[0];
		five = one[2] ? one[2] : two;
		one = one[0];
	}

	let oneAsString = <string>one;

	if (!two) {
		two = oneAsString;
	}

	if (!five) {
		five = two;
	}

	if (number > 0 && number <= 1) {
		return oneAsString.replace(symbol, number + '');
	}

	if (number > 1 && number <= 4) {
		return two.replace(symbol, number + '');
	}

	if (number >= -4 && number < -1) {
		return two.replace(symbol, number + '');
	}

	if (number >= -1 && number < 0) {
		return oneAsString.replace(symbol, number + '');
	}

	return five.replace(symbol, number + '');

}
