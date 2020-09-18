import { NavigationData } from '../types';
import { RouteConfig } from '@bluebase/components';
import { resolveScreenComponent } from './resolveScreenComponent';
import { resolveThunk } from '@bluebase/core';

/**
 * Given a route object, resolves its navigation options
 * @param route
 * @param BB
 */
export const resolveRouteOptions = (route: RouteConfig, navigationData: NavigationData) => {
	const ScreenComponent = resolveScreenComponent(route, navigationData.screenProps.BB);

	if (route.options) {
		return route.options;
	}

	if (route.navigationOptions) {
		console.warn('route.navigationOptions is deprecated');
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
