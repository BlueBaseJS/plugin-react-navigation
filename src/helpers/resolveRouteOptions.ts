import { BlueBase } from '@bluebase/core';
import { RouteConfig } from '@bluebase/components';

/**
 * Given a route object, resolves its navigation options
 * @param route
 * @param BB
 */
export function resolveRouteOptions(route: RouteConfig, _BB: BlueBase) {
	const options = route.options || route.navigationOptions || {};

	return {
		...options,
		header:
			typeof options.header === 'function' || options.header === undefined
				? options.header
				: () => options.header,
	};
}
