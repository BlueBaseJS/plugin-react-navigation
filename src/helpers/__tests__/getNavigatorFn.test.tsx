import { getNavigatorFn } from '..';

describe('getNavigatorFn', () => {
	it('should return undefined for unknown navigators', async () => {
		const opts = getNavigatorFn('foo', 'bar');

		expect(opts).toBeUndefined();
	});

	it('should return stack navigator if no type is defined', async () => {
		const opts = getNavigatorFn('123');

		expect(opts.Navigator).toBeTruthy();
		expect(opts.Screen).toBeTruthy();
	});

	it('should return a navigator for a known type', async () => {
		const opts = getNavigatorFn('123', 'drawer');

		expect(opts.Navigator).toBeTruthy();
		expect(opts.Screen).toBeTruthy();
	});
});
