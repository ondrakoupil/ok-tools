export function arraySum(arr: number[]): number {
	if (!arr) {
		return 0;
	}
	return arr.filter((a) => !!a).reduce((prev, curr) => (prev + curr), 0) || 0;
}
