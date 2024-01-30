export function onReady(fn: () => any) {
	if (typeof fn === 'string') {
		console.warn('This is not jQuery! Use $() function only for adding callbacks that should fire on page initialisation. ' +
			'Use $$() to search for an element.');
		return;
	}
	if (document.readyState === 'complete') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

export const $ = onReady;
