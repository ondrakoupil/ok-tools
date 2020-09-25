import { parseTime } from './parse-time';

export function number(input: any) {
	if (typeof input === 'string') {
		input = input.replace(/,/, '.');
	}
	return (Number(input).valueOf() || 0);
}


export function string(input: any) {
	if (!input) {
		return '';
	}
	if (typeof input === 'string') {
		return input;
	}
	if (typeof input === 'number') {
		return input + '';
	}
	return '';
}

export function boolean(input: any) {
	if (input && Array.isArray(input) && input.length === 0) {
		return false;
	}
	return !!input;
}

export function date(input: any, returnNullOnError = true): Date | null {
	if (!input) {
		return null;
	}
	return parseTime(input, returnNullOnError);
}

interface DefinitionForFactory {
	default?: any;
	number?: string[];
	string?: string[];
	date?: string[];
	boolean?: string[];
	object?: { [key: string]: DefinitionForFactory };
	subItem?: { [key: string]: (any) => any };
	subItems?: { [key: string]: (any) => any };
	map?: { [key: string]: (any) => any };
	any?: string[];
}

export function factory(input: any, definitions: DefinitionForFactory): any {

	if (!input || typeof input !== 'object') {
		return Object.assign({}, definitions.default);
	}

	let response = Object.assign({}, definitions.default);
	let clonedInput = Object.assign({}, definitions.default, input);

	if (definitions.any) {
		definitions.any.map(
			(name) => {
				response[name] = clonedInput[name];
			}
		);
	}

	if (definitions.number) {
		definitions.number.map(
			(name) => {
				response[name] = number(clonedInput[name]);
			}
		);
	}

	if (definitions.string) {
		definitions.string.map(
			(name) => {
				response[name] = string(clonedInput[name]);
			}
		);
	}

	if (definitions.boolean) {
		definitions.boolean.map(
			(name) => {
				response[name] = boolean(clonedInput[name]);
			}
		);
	}

	if (definitions.date) {
		definitions.date.map(
			(name) => {
				response[name] = date(clonedInput[name]);
			}
		);
	}

	if (definitions.object) {
		let keys = Object.keys(definitions.object);
		keys.map(
			(key) => {
				response[key] = factory(clonedInput[key], definitions.object[key]);
			}
		);
	}

	if (definitions.subItem) {
		let keys = Object.keys(definitions.subItem);
		keys.map(
			(key) => {
				if (typeof definitions.subItem[key] !== 'function') {
					throw new Error('subItem[' + key + '] must be a function!');
				}
				response[key] = definitions.subItem[key](clonedInput[key]);
			}
		);
	}

	if (definitions.subItems) {
		let keys = Object.keys(definitions.subItems);
		keys.map(
			(key) => {
				if (typeof definitions.subItems[key] !== 'function') {
					throw new Error('subItems[' + key + '] must be a function!');
				}
				let inputArray = clonedInput[key];
				if (!inputArray) {
					inputArray = [];
				} else if (!Array.isArray(inputArray)) {
					throw new Error(key + ' is not an array.');
				}
				response[key] = inputArray.map((v) => definitions.subItems[key](v));
			}
		);
	}

	if (definitions.map) {
		let keys = Object.keys(definitions.map);
		keys.map(
			(key) => {
				if (!definitions.map[key] || typeof definitions.map[key] !== 'function') {
					throw new Error('Not a function: definitions.map[' + key + ']');
				}
				response[key] = definitions.map[key](response[key]);
			}
		);
	}

	return response;

}
