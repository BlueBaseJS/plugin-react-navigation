import { RouteConfig } from '@bluebase/components';
import { resolveThunk } from '@bluebase/core';

import { NavigationData } from '../types';
import { resolveScreenComponent } from './resolveScreenComponent';

/**
 * Given a route object, resolves its navigation options
 * @param route
 * @param BB
 */
export const resolveRouteOptions = (
	route: RouteConfig,
	navigationData: NavigationData
) => {
	const ScreenComponent = resolveScreenComponent(
		route,
		navigationData.screenProps.BB
	);

	if (route.options) {
		return route.options;
	}

	if (route.navigationOptions) {
		// eslint-disable-next-line max-len
		console.warn(
			`route.navigationOptions is deprecated. Refactor ${route.name} route to use route.options instead.`
		);
	}

	const options = resolveThunk(
		route.navigationOptions || (ScreenComponent as any).navigationOptions || {},
		navigationData
	);

	return {
		// FIXME: missing navigation
		...options,

		header:
			typeof options.header === 'function' || options.header === undefined
				? options.header
				: () => options.header,
	};
};
