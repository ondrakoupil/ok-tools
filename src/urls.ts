export function humanizeUrl(input: string) {

	let matches = input.match(/^\s*(https?:\/\/)?([^\/]+)\/?(.*)\s*$/i);

	if (matches) {
		if (matches[2] && matches[2].length > 6) {
			return matches[2];
		}
		if (matches[3] || matches[2]) {
			return matches[2] + '/' + matches[3];
		}
	}

	return input;

}


export function technicalizeUrl(input: string) {

	var matches = input.match(/^\s*(\w{3,15}:\/\/).*$/);

	if (matches) {
		return input;
	}

	return 'http://' + input;

}
