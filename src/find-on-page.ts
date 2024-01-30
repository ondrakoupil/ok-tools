export function findOnPage<ExpectedResultType extends HTMLElement>
	(selector: string, parent?: HTMLElement | Document): ExpectedResultType | null;
export function findOnPage<ExpectedResultType extends SVGElement>
	(selector: string, parent?: HTMLElement | Document): ExpectedResultType | null;
export function findOnPage<ExpectedResultType extends SVGElement | HTMLElement>
	(selector: string, parent?: HTMLElement | Document): ExpectedResultType | null {
	if (!parent) {
		parent = document;
	}
	return parent.querySelector(selector);
}

export const $$ = findOnPage;
