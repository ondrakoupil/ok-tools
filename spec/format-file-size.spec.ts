import { formatFileSize } from '../src/format-file-size';

describe('Function formatFileSize()', function () {

	it('should format size correctly.', function () {

		let result;

		result = formatFileSize(100);
		expect(result).toBe('100 B');

		result = formatFileSize(104.234);
		expect(result).toBe('104 B');

		result = formatFileSize(104.894);
		expect(result).toBe('105 B');

		result = formatFileSize(2048);
		expect(result).toBe('2 kB');

		result = formatFileSize(41432381);
		expect(result).toBe('41 MB');

		result = formatFileSize(3894738);
		expect(result).toBe('4 MB');

		result = formatFileSize(1000000000);
		expect(result).toBe('1 GB');

		result = formatFileSize(1000000000000);
		expect(result).toBe('1 TB');

		result = formatFileSize(0);
		expect(result).toBe('0 B');

		result = formatFileSize(-2736628);
		expect(result).toBe('-3 MB');

		result = formatFileSize(-1243);
		expect(result).toBe('-1 kB');

		result = formatFileSize(-8765433);
		expect(result).toBe('-9 MB');

	});

});
