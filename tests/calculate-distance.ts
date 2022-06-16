import { calculateDistance, Coords } from '../src/calculate-distance';

describe('Function calculateDistance()', function () {

	it('should return proper values', function () {

		let result: number;

		result = calculateDistance({lat: 50, lng: 15}, {lat: 50, lng: 15});
		expect(result).toBe(0);

		result = calculateDistance({lat: 50.5, lng: 15}, {lat: 50, lng: 15.5});
		expect(result).toBeGreaterThan(0);
		expect(result).toBeCloseTo(65000, -4);

		// @ts-ignore
		expect(calculateDistance(null, 10)).toBeNaN();

	});

});
