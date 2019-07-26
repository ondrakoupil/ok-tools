export function delay(t): Promise<void> {
	return new Promise(function(resolve) {
		setTimeout(resolve.bind(null), t);
	});
}
