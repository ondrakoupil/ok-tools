export interface Coords {
	lat: number;
	lng: number;
}

function toRadians(degrees: number): number {
	return degrees / 180 * Math.PI;
}

/**
 * @param a
 * @param b
 * @return number Distance in meters
 */
export function calculateDistance(a: Coords, b: Coords): number {
	if (!a || !b || typeof a.lat !== 'number' || typeof a.lng !== 'number' || typeof b.lat !== 'number' || typeof b.lng !== 'number') {
		return NaN;
	}
	let R = 6371e3;
	let lat1 = toRadians(a.lat);
	let lat2 = toRadians(b.lat);
	let deltaLat = (lat2 - lat1);
	let deltaLng = toRadians(b.lng - a.lng);

	let stepA: number = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		Math.cos(lat1) * Math.cos(lat2) *
		Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
	let c = 2 * Math.atan2(Math.sqrt(stepA), Math.sqrt(1 - stepA));

	return R * c;
}

