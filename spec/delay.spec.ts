import { delay } from '../src/delay';

describe('Function delay()', function () {

	it('should return a promise that resolves after some time.', function () {

		let now = new Date();

		let d = delay(300);
		let wasResolved = false;

		expect(d).toBeTruthy();

		d.then(
			() => {
				let after = new Date();
				expect(after.getTime() - now.getTime()).toBeGreaterThan(200);
				wasResolved = true;
			}
		);

		setTimeout(
			() => {
				expect(wasResolved).toBe(true);
			},
			500
		);


	});

});
