var units = [
	'B',
	'kB',
	'MB',
	'GB',
	'TB',
	'PB'
];

export function formatFileSize(bytes: number) {

	let unit = 0;

	let bytesSize = bytes;
	let inverted = false;

	if (bytesSize < 0) {
		bytesSize *= -1;
		inverted = true;
	}

	while (bytesSize >= 1000) {
		bytesSize /= 1000;
		unit++;
	}

	if (inverted) {
		bytesSize *= -1;
	}

	return Math.round(bytesSize) + ' ' + units[unit];

}
