export function range(upperBound: number): number[];
// tslint:disable-next-line:unified-signatures
export function range(from: number, to: number): number[];
// tslint:disable-next-line:unified-signatures
export function range(from: number, to: number, step: number): number[];
export function range(from: number, to?: number, step = 1): number[] {

	if (to === undefined && step === 1) {
		to = from - 1;
		from = 0;
	}

	if (from > to) {
		throw new Error('[from] must be less than [to]');
	}

	let count = Math.floor((to - from) / step);
	let a = Array(count);

	for (let i = from, index = 0; i <= to; i += step, index++) {
		a[index] = i;
	}

	return a;
}
