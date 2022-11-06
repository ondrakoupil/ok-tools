import { createUrlCreator } from '../src/url-creator';

describe('UrlCreator', function () {

	it('should work with basic input', function () {

		let urlCreator = createUrlCreator({
			urlBase: ['abc', 'def'],
		});

		let url1 = urlCreator('10');

		let url2 = urlCreator({id: '103'});

		let url3 = urlCreator({id: '104', url: 'xyz'});

		let url4 = urlCreator({id: '105'}, 'pdef');

		let url5 = urlCreator('108', 'pdef');

		expect(url1.join('/')).toBe('/abc/def/10');
		expect(url2.join('/')).toBe('/abc/def/103');
		expect(url3.join('/')).toBe('/abc/def/104/xyz');
		expect(url4.join('/')).toBe('/abc/def/105/pdef');
		expect(url5.join('/')).toBe('/abc/def/108/pdef');

	});

	it('should work with advanced input', function () {

		let urlCreator = createUrlCreator({
			urlBase: ['abc', 'def'],
			slugKeyName: 'slug',
			idKeyName: 'number',
		});

		let url1 = urlCreator({id: '10', number: '20', slug: 'slug', url: 'url'});
		let url2 = urlCreator({id: '20', number: '30'});

		expect(url1.join('/')).toBe('/abc/def/20/slug');
		expect(url2.join('/')).toBe('/abc/def/30');

	});

	it('should work with array slugs as expected', function () {

		let urlCreator1 = createUrlCreator({
			urlBase: ['abc', 'def'],
			slugKeyName: 'slugs',
			idKeyName: 'number',
			addFirstSlash: false,
		});

		let url1 = urlCreator1({number: '10', slugs: ['slug1', 'slug2', 'slug3']});
		expect(url1.join('/')).toBe('abc/def/10/slug1-slug2-slug3');

		let urlCreator2 = createUrlCreator({
			urlBase: ['abc', 'def'],
			slugKeyName: 'slugs',
			idKeyName: 'number',
			firstSlugOnlyIfArray: true,
		});

		let url2 = urlCreator2({number: '20', slugs: ['slugX', 'slug2', 'slug3']});
		expect(url2.join('/')).toBe('/abc/def/20/slugX');

		let url3 = urlCreator2({number: '30'});
		expect(url3.join('/')).toBe('/abc/def/30');

		let url4 = urlCreator2('40', ['slug40', 'slug50']);
		expect(url3.join('/')).toBe('/abc/def/30');

	});

	it('should work without giving IDs or slugs into the URL if configured so', function () {

		let urlCreatorNoId = createUrlCreator({
			urlBase: ['abc', 'def'],
			idKeyName: false,
			slugKeyName: 'short'
		});

		let url1 = urlCreatorNoId('10');

		let url2 = urlCreatorNoId({id: '103', short: 'hellp'});

		let url3 = urlCreatorNoId('10', 'slugggo');

		expect(url1.join('/')).toBe('/abc/def/10');
		expect(url2.join('/')).toBe('/abc/def/hellp');
		expect(url3.join('/')).toBe('/abc/def/10/slugggo');


		let urlCreatorNoSlug = createUrlCreator({
			urlBase: ['abc', 'def'],
			idKeyName: 'aaa',
			slugKeyName: false
		});

		url1 = urlCreatorNoSlug('10');

		url2 = urlCreatorNoSlug({aaa: '103', id: '400', url: 'hellp', slug: 'dddddd'});

		url3 = urlCreatorNoSlug('20', 'slagg');

		expect(url1.join('/')).toBe('/abc/def/10');
		expect(url2.join('/')).toBe('/abc/def/103');
		expect(url3.join('/')).toBe('/abc/def/20/slagg');

	});

	it('should use ID as backup if slug is missing even if configured not to use IDs', function () {

		let urlCreatorNoId = createUrlCreator({
			urlBase: ['abc', 'def'],
			idKeyName: false,
			slugKeyName: 'short',
			idKeyNameIfSlugIsMissing: 'number',
			firstSlugOnlyIfArray: true,
		});

		let url1 = urlCreatorNoId({short: '', id: '10', number: '20'});
		expect(url1.join('/')).toBe('/abc/def/20');

		let url2 = urlCreatorNoId({short: 'slug', id: '10', number: '40'});
		expect(url2.join('/')).toBe('/abc/def/slug');

		let url3 = urlCreatorNoId({short: [], id: '10', number: '30'});
		expect(url3.join('/')).toBe('/abc/def/30');

		let url4 = urlCreatorNoId({short: ['some', 'slug'], id: '10', number: '50'});
		expect(url4.join('/')).toBe('/abc/def/some');

		let url5 = urlCreatorNoId({absolutely: 'nothing'});
		expect(url5.join('/')).toBe('/abc/def');

	});

});
