export function generateRandomIdentifier(length = 8): string {
	if (length === 0) {
		return '';
	}
	if (length < 0 || typeof length !== 'number') {
		throw new Error('Length must be positive integer');
	}
	if (length <= 10) {
		return Math.random().toString(36).substr(2, length).toLowerCase();
	}
	return generateRandomIdentifier(10) + generateRandomIdentifier(length - 10);
}
