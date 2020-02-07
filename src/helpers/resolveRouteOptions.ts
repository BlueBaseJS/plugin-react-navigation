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

	const options =
		route.options || route.navigationOptions || (ScreenComponent as any).navigationOptions || {};

	return {
		// FIXME: missing navigation
		...resolveThunk(options, navigationData),
		header:
			typeof options.header === 'function' || options.header === undefined
				? options.header
				: () => options.header,
	};
};
