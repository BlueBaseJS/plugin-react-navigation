import { resolveNavigatorScreenOptions } from '..';

describe('resolveNavigatorScreenOptions', () => {
	it('should resolve defaultNavigationOptions', async () => {
		const opts = resolveNavigatorScreenOptions({
			defaultNavigationOptions: { headerBackTitle: 'Foo' },
			headerMode: 'none',
		} as any);

		expect(opts).toMatchObject({ headerBackTitle: 'Foo' });
	});

	it('should recognise "screenOptions" prop', async () => {
		const opts = resolveNavigatorScreenOptions({
			screenOptions: { headerBackTitle: 'Foo' },
			headerMode: 'none',
		} as any);

		expect(opts).toMatchObject({ headerBackTitle: 'Foo' });
	});

	it('should return empty object if nothing suitable is provided', async () => {
		const opts = resolveNavigatorScreenOptions({} as any);

		expect(opts).toMatchObject({});
	});
});
