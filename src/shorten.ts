export function shorten(input: string, maxLength: number, wholeWords = true, addedString = ''): string {
	if (input.length <= maxLength) {
		return input;
	}
	if (!wholeWords) {
		return input.substr(0, maxLength - addedString.length).trim() + addedString;
	}
	let strippedPart = input.substr(0, maxLength - addedString.length + 1);
	let matches = strippedPart.match(/(.*)[\W]\w*$/);
	if (matches) {
		return matches[1].trim() + addedString;
	} else {
		return shorten(input, maxLength, false, addedString);
	}

}
