import { BlueBase, merge } from '@bluebase/core';

import { NavigatorProps as CoreNavigatorProps } from '@bluebase/components';

/**
 * Given a navigator object, resolves its screen options
 * @param navigator
 * @param BB
 */
export function resolveNavigatorScreenOptions(navigator: CoreNavigatorProps, _BB: BlueBase) {
	const { type, routes, screenOptions, defaultNavigationOptions, ...navigatorProps } = navigator;
	const resolvedScreenOptions = navigator.screenOptions || defaultNavigationOptions || {};
	return merge(navigatorProps, resolvedScreenOptions);
}
