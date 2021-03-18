export function stripTags(input: string): string {
	return input.replace(/<[a-z\/][^><]*>/ig, '');
}
