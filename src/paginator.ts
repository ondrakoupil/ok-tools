import { range } from './range';

export type PaginatorItem = number | null;

export function paginatorSequence(
	totalPages: number,
	currentPage: number,
	preferredNumberOfLinks: number,
	addSeparators = true,
): PaginatorItem[] {

	if (preferredNumberOfLinks < 5) {
		throw new Error('preferredNumberOfLinks must be >= 5');
	}

	if (totalPages <= preferredNumberOfLinks) {
		return range(1, totalPages);
	}

	let output = new Set<number>();
	let lastAdded = 0;
	let minPage = 1;

	output.add(currentPage);

	if (currentPage !== totalPages) {
		output.add(currentPage + 1);
	}
	if (currentPage > 1) {
		output.add(currentPage - 1);
	}
	output.add(totalPages);
	output.add(1);

	let i = 2;
	while (output.size < preferredNumberOfLinks) {

		if (currentPage + i < totalPages) {
			output.add(currentPage + i);
		}
		if (output.size >= preferredNumberOfLinks) {
			break;
		}

		if (currentPage - i > 1) {
			output.add(currentPage - i);
		}
		if (output.size >= preferredNumberOfLinks) {
			break;
		}

		if (i % 2 === 0) {
			let stepFromExtreme = Math.floor(i / 2);
			output.add(stepFromExtreme + 1);
			if (output.size >= preferredNumberOfLinks) {
				break;
			}

			output.add(totalPages - stepFromExtreme);
			if (output.size >= preferredNumberOfLinks) {
				break;
			}
		}
		i++;
	}

	let numbers = Array.from(output);
	numbers.sort((a, b) => (a - b));

	let outputNumbers: PaginatorItem[] = [];

	if (addSeparators) {
		let prev = 0;
		for (let num of numbers) {
			if (num - 1 !== prev) {
				outputNumbers.push(null);
			}
			outputNumbers.push(num);
			prev = num;
		}
	} else {
		outputNumbers = numbers;
	}

	return outputNumbers;

}
