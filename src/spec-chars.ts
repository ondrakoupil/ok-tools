let map = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	'\'': '&#039;'
};

export function specChars(input: string) {
	return input.replace(
		/[&<>"']/g,
		// @ts-ignore
		m => map[m]
	);
}
