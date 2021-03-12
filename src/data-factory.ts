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

	/**
	 * Use data from original key in source for another key in created object
	 *
	 * from: { "target": "source" } means that source's "source" property will be copied into returned object's "target" property.
	 *
	 * Also, you can supply a function that receives the source object and returns expected value.
	 */
	from?: { [key: string]: (string | ((any) => any)) };

	/**
	 * Property should be object. Supply their own DefinitionForFactory.
	 * Similar to subItem, but here, give just a definition of the subobject.
	 */
	object?: { [key: string]: DefinitionForFactory };

	/**
	 * Property should be object. Apply a function for every its property to normalize it.
	 */
	objectMap?: { [key: string]: (any) => any };

	/**
	 * Property should be object. Apply a factory function for it.
	 * Similar to object, but here, give a factory function.
	 */
	subItem?: { [key: string]: (any) => any };

	/**
	 * Property should be an array of objects. Apply a factory function to each item.
	 */
	subItems?: { [key: string]: (any) => any };

	/**
	 * After applying all other rules and checks, apply a map function to resulting values.
	 */
	map?: { [key: string]: (any) => any };

	/**
	 * The value must be in array of given options. It also normalizes strings/numbers.
	 */
	enum?: { [key: string]: (string | number)[] };

	/**
	 * Anything can be in there properties. Do not check anything.
	 */
	any?: string[];
}

export function factory<T = any>(input: any, definitions: DefinitionForFactory): T {

	if (!input || typeof input !== 'object') {
		return Object.assign({}, definitions.default);
	}

	let response = Object.assign({}, definitions.default);
	let clonedInput = Object.assign({}, definitions.default, input);

	if (definitions.from) {
		let keys = Object.keys(definitions.from);
		keys.forEach(
			(key) => {
				let value = definitions.from[key];
				if (typeof value === 'function') {
					let out = value(clonedInput);
					clonedInput[key] = out;
				} else {
					if (typeof clonedInput[value] !== 'undefined') {
						clonedInput[key] = clonedInput[value];
					} else {
						if (definitions.default && typeof definitions.default[value] !== 'undefined') {
							clonedInput[key] = definitions.default[value];
						}
					}
				}
			}
		);
	}

	if (definitions.any) {
		definitions.any.map(
			(name) => {
				response[name] = clonedInput[name];
			},
		);
	}

	if (definitions.number) {
		definitions.number.map(
			(name) => {
				response[name] = number(clonedInput[name]);
			},
		);
	}

	if (definitions.string) {
		definitions.string.map(
			(name) => {
				response[name] = string(clonedInput[name]);
			},
		);
	}

	if (definitions.boolean) {
		definitions.boolean.map(
			(name) => {
				response[name] = boolean(clonedInput[name]);
			},
		);
	}

	if (definitions.date) {
		definitions.date.map(
			(name) => {
				response[name] = date(clonedInput[name]);
			},
		);
	}

	if (definitions.object) {
		let keys = Object.keys(definitions.object);
		keys.map(
			(key) => {
				response[key] = factory(clonedInput[key], definitions.object[key]);
			},
		);
	}

	if (definitions.objectMap) {
		let keys = Object.keys(definitions.objectMap);
		keys.map(
			(key) => {
				response[key] = {};
				if (clonedInput[key]) {
					Object.keys(clonedInput[key]).map(
						(itemKey) => {
							response[key][itemKey] = definitions.objectMap[key](clonedInput[key][itemKey]);
						},
					);
				}
			},
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
			},
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
			},
		);
	}

	if (definitions.enum) {
		let keys = Object.keys(definitions.enum);
		keys.map(
			(key) => {
				let allowedValues = definitions.enum[key];
				if (!Array.isArray(allowedValues)) {
					throw new Error('Not an array: definitions.enum[' + key + ']');
				}
				if (allowedValues.indexOf(clonedInput[key]) === -1) {
					let foundAlternative = false;
					if (typeof clonedInput[key] === 'number') {
						let stringVersion = string(clonedInput[key]);
						if (allowedValues.indexOf(stringVersion) !== -1) {
							response[key] = stringVersion;
							foundAlternative = true;
						}
					} else if (typeof clonedInput[key] === 'string') {
						let numericVersion = number(clonedInput[key]);
						if (allowedValues.indexOf(numericVersion) !== -1) {
							response[key] = numericVersion;
							foundAlternative = true;
						}
					}
					if (!foundAlternative) {
						if (definitions.default && typeof definitions?.default[key] !== 'undefined') {
							response[key] = definitions.default[key];
						} else {
							response[key] = null;
						}
					}
				} else {
					response[key] = clonedInput[key];
				}
			},
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
			},
		);
	}

	if (definitions.from) {
		let keys = Object.keys(definitions.from);
		keys.forEach(
			(key) => {
				if (typeof response[key] === 'undefined') {
					response[key] = clonedInput[key];
				}
			}
		);
	}


	return response;

}
