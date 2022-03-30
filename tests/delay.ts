import { delay } from '../src/delay';
import * as FakeTimers from '@sinonjs/fake-timers';

describe('Function delay()', function () {

	let clock: any;

	beforeEach(
		() => {
			clock = FakeTimers.install();
		}
	);

	afterEach(
		() => {
			clock.uninstall();
		}
	);

	it('should return a promise that resolves after some time.', async function () {

		jest.spyOn(global, 'setTimeout');

		let d = delay(300);
		let theFunction = jest.fn();

		expect(d).toBeTruthy();

		expect(theFunction).not.toBeCalled();
		d.then(theFunction);
		expect(theFunction).not.toBeCalled();
		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 300);

		await clock.tickAsync(300);

		expect(theFunction).toBeCalled();
		expect(theFunction).toHaveBeenCalledTimes(1);

	});

});
