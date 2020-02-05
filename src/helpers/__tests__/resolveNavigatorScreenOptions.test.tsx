import { BlueBase } from '@bluebase/core';
import { resolveNavigatorScreenOptions } from '..';

describe('resolveNavigatorScreenOptions', () => {
	it('should resolve defaultNavigationOptions', async () => {
		const BB = new BlueBase();

		const opts = resolveNavigatorScreenOptions(
			{ defaultNavigationOptions: { headerBackTitle: 'Foo' }, headerMode: 'none' } as any,
			BB
		);

		expect(opts).toMatchObject({ headerBackTitle: 'Foo', headerMode: 'none' });
	});

	it('should recognise "screenOptions" prop', async () => {
		const BB = new BlueBase();

		const opts = resolveNavigatorScreenOptions(
			{ screenOptions: { headerBackTitle: 'Foo' }, headerMode: 'none' } as any,
			BB
		);

		expect(opts).toMatchObject({ headerBackTitle: 'Foo', headerMode: 'none' });
	});

	it('should return empty object if nothing suitable is provided', async () => {
		const BB = new BlueBase();

		const opts = resolveNavigatorScreenOptions({} as any, BB);

		expect(opts).toMatchObject({});
	});
});
