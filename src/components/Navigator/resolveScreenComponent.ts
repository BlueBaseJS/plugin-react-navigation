import { Noop, RouteConfig } from '@bluebase/components';
import { BlueBase } from '@bluebase/core';
import React from 'react';

/**
 * Given a route object, resolves and returns a screen component
 * @param route
 * @param BB
 */
export const resolveScreenComponent = (route: RouteConfig, BB: BlueBase) => {
	const componentName: string | React.ComponentType<any> =
		route.component || route.screen || Noop;
	return typeof componentName === 'string'
		? BB.Components.resolveFromCache(componentName)
		: componentName;
};
