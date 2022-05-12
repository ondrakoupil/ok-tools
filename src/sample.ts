import arrayShuffle from 'array-shuffle';

export function sample<T = any>(inputArray: T[]): T {
	return inputArray[Math.trunc(Math.random() * inputArray.length)];
}

export function samples<T = any>(inputArray: T[], count: number): T[] {
	let copy = [...inputArray];
	let copyShuffled = arrayShuffle(copy);
	return copyShuffled.slice(0, count);
}
