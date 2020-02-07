import { stubNavigationObject } from '../stubNavigationObject';

describe('stubNavigationObject', () => {
	it(`should have stub fns`, async () => {
		const actions = stubNavigationObject;

		expect(actions.push('some')).toBeUndefined();
	});
});
