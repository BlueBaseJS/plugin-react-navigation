import { BlueBase } from '@bluebase/core';
import { resolveRouteOptions } from '..';

describe('resolveRouteOptions', () => {
	it('should convert header:null to a thunk', async () => {
		const BB = new BlueBase();

		const opts = resolveRouteOptions(
			{ navigationOptions: { header: null } } as any,
			{ screenProps: { BB } } as any
		);

		expect(opts.header()).toBe(null);
	});

	it('should recognise "options" prop', async () => {
		const BB = new BlueBase();

		const opts = resolveRouteOptions(
			{ options: { headerBackTitle: 'Back' } } as any,
			{ screenProps: { BB } } as any
		);

		expect(opts).toMatchObject({ headerBackTitle: 'Back' });
	});

	it('should return empty object if nothing suitable is provided', async () => {
		const BB = new BlueBase();

		const opts = resolveRouteOptions({} as any, { screenProps: { BB } } as any);

		expect(opts).toMatchObject({});
	});
});
