import { BlueBase, merge } from '@bluebase/core';

import { NavigatorProps as CoreNavigatorProps } from '@bluebase/components';

/**
 * Given a navigator object, resolves its screen options
 * @param navigator
 * @param BB
 */
export function resolveNavigatorScreenOptions(navigator: CoreNavigatorProps, _BB: BlueBase) {
	const { type, routes, ...navigatorProps } = navigator;

	const screenOptions = navigator.screenOptions || navigator.defaultNavigationOptions || {};
	return merge(navigatorProps, screenOptions);
}
