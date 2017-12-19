export function numberFormat(input: number|string, decimals = 0, decPoint = '.', thousandsSep = '') {

	if (typeof input === 'string') {
		input = parseFloat(input);
		if (isNaN(input)) {
			input = 0;
		}
	}

	let number = input + '';

	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	let n = !isFinite(+number) ? 0 : +number;
	let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
	let sep = thousandsSep;
	let dec = decPoint;
	let s = [];
	let toFixedFix = function (num, precision) {
		let k = Math.pow(10, prec);
		return '' + (Math.round(num * k) / k)
			.toFixed(precision);
	};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);

}
