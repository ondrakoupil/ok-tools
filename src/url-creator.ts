interface CreateUrlCreatorParams {
	urlBase: string[];
	slugKeyName?: string;
	idKeyName?: string;
	addFirstSlash?: boolean;
}

export type UrlCreatorFunction = (idOrObjectWithId: string | { id: string, [key: string]: any }, slug?: string) => string[];

export function createUrlCreator(params: CreateUrlCreatorParams): UrlCreatorFunction {

	if (!params.urlBase || !params.urlBase.length) {
		throw new Error('params.urlBase is required!');
	}
	let idKeyName = params.idKeyName || 'id';
	let slugKeyName = params.slugKeyName || 'url';
	let startUrlWith = params.urlBase;

	if (typeof params.addFirstSlash === 'undefined' || params.addFirstSlash) {
		if (startUrlWith.length < 1 || startUrlWith[0][0] !== '/') {
			startUrlWith[0] = '/' + startUrlWith[0];
		}
	}

	return (idOrObjectWithId: string | { id: string }, slug = '') => {
		if (typeof idOrObjectWithId === 'object' && idOrObjectWithId[idKeyName]) {
			if (idOrObjectWithId[slugKeyName]) {
				return [...startUrlWith, idOrObjectWithId[idKeyName], idOrObjectWithId[slugKeyName]];
			} else if (slug) {
				return [...startUrlWith, idOrObjectWithId[idKeyName], slug];
			} else {
				return [...startUrlWith, idOrObjectWithId[idKeyName]];
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
