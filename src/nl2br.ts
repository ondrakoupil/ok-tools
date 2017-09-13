export function nl2br(input: string) {
	let output = input;
	output = output.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2');
	return output;
}
