interface CreateUrlCreatorParams {
	urlBase: string[];
	slugKeyName?: string | false;
	idKeyName?: string | false;
	addFirstSlash?: boolean;
}

export type UrlCreatorFunction = (idOrObjectWithId: string | { id: string, [key: string]: any }, slug?: string) => string[];

export function createUrlCreator(params: CreateUrlCreatorParams): UrlCreatorFunction {

	if (!params.urlBase || !params.urlBase.length) {
		throw new Error('params.urlBase is required!');
	}
	let idKeyName = params.idKeyName;
	let slugKeyName = params.slugKeyName;
	if (!idKeyName && idKeyName !== false) {
		idKeyName = 'id';
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

	return (idOrObjectWithId: string | { id: string }, slug = '') => {
		// @ts-ignore
		if (typeof idOrObjectWithId === 'object' && (idOrObjectWithId[idKeyName] || idKeyName === false)) {
			// @ts-ignore
			let theSlugValue: string = slugKeyName ? (idOrObjectWithId[slugKeyName] || '') : '';
			// @ts-ignore
			let theIdValue: string = idKeyName ? (idOrObjectWithId[idKeyName] || '') : '';
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
