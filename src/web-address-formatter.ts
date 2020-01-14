export function formatWebAddress(input: string, mode: ('link' | 'short' | 'full') = 'link', defaultScheme = 'http') {

	let domain = '';
	let scheme = '';
	let path = '';

	let match = input.match(/^\s*((\w{3,10}):\/\/)?([^\/]+)(\/(.*))?$/);

	scheme = match[2] || '';
	domain = match[3] || '';
	path = match[5] || '';

	if (!scheme) {
		scheme = defaultScheme;
	}

	switch (mode) {
		case 'link':
			return scheme + '://' + domain + '/' + path;

		case 'full':
			return domain + (path ? ('/' + path) : '');

		case 'short':
			return domain;
	}

}
