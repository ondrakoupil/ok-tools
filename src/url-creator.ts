interface CreateUrlCreatorParams {
	urlBase: string[];
	slugKeyName?: string | false;
	idKeyName?: string | false;
	addFirstSlash?: boolean;
	firstSlugOnlyIfArray?: boolean;
	idKeyNameIfSlugIsMissing?: string;
}

export type UrlCreatorFunction = (idOrObjectWithId: string | object, slug?: string | string[]) => string[];

export function createUrlCreator(params: CreateUrlCreatorParams): UrlCreatorFunction {

	if (!params.urlBase || !params.urlBase.length) {
		throw new Error('params.urlBase is required!');
	}
	let idKeyName = params.idKeyName;
	let idKeyNameDefinite: string | false;
	let slugKeyName = params.slugKeyName;
	if (!idKeyName && idKeyName !== false) {
		idKeyNameDefinite = 'id';
	} else {
		idKeyNameDefinite = idKeyName;
	}
	if (!slugKeyName && slugKeyName !== false) {
		slugKeyName = 'url';
	}
	let startUrlWith = params.urlBase;

	if (typeof params.addFirstSlash === 'undefined' || params.addFirstSlash) {
		if (startUrlWith.length < 1 || startUrlWith[0][0] !== '/') {
			startUrlWith[0] = '/' + startUrlWith[0];
		}
	}

	// @ts-ignore
	return (idOrObjectWithId: string | { [key: string]: any }, slug: string | string[] = '') => {
		if (
			typeof idOrObjectWithId === 'object'
			&& ((idKeyNameDefinite !== false && idOrObjectWithId[idKeyNameDefinite] as string) || idKeyNameDefinite === false)
		) {
			let theSlugValueAsStringOrArray: string | string[] = slugKeyName ? (idOrObjectWithId[slugKeyName] || '') : '';
			let theSlugValue: string;
			if (Array.isArray(theSlugValueAsStringOrArray)) {
				if (params.firstSlugOnlyIfArray) {
					theSlugValue = theSlugValueAsStringOrArray[0];
				} else {
					theSlugValue = theSlugValueAsStringOrArray.join('-');
				}
			} else {
				theSlugValue = theSlugValueAsStringOrArray;
			}
			let theIdValue: string = idKeyNameDefinite ? (idOrObjectWithId[idKeyNameDefinite] || '') : '';
			if (params.idKeyNameIfSlugIsMissing && !theSlugValue) {
				theIdValue = idOrObjectWithId[params.idKeyNameIfSlugIsMissing] || '';
			}
			if (theSlugValue || slug) {
				let slugValue = theSlugValue || slug;
				if (theIdValue) {
					return [...startUrlWith, theIdValue, slugValue];
				} else {
					return [...startUrlWith, slugValue];
				}
			} else {
				if (theIdValue) {
					return [...startUrlWith, theIdValue];
				} else {
					return [...startUrlWith];
				}
			}
		}
		if (typeof idOrObjectWithId === 'string') {
			if (slug) {
				return [...startUrlWith, idOrObjectWithId, slug];
			} else {
				return [...startUrlWith, idOrObjectWithId];
			}
		}
		throw new Error('Invalid parameters to create URL.');
	};

}
