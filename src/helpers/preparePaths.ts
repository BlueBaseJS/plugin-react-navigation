import { BlueBase, makeId, resolveThunk } from '@bluebase/core';
import { NavigatorProps, RouteConfig } from '@bluebase/components';

import { ScreenProps } from '../types';
import { createNavigatorScreenComponent } from './createNavigatorScreenComponent';
import { getNavigatorFn } from './getNavigatorFn';

export interface PreparedNavigatorProps extends NavigatorProps {
	NavigatorComponent: { [key: string]: any };
}

/**
 * Converts paths from react-navigation pattern to react-router pattern
 * @param navigator
 * @param parentPath
 */
export const preparePaths = (
	navigatorProps: NavigatorProps,
	screenProps: ScreenProps,
	BB: BlueBase
): PreparedNavigatorProps => {
	const navigator = { ...navigatorProps };

	if (!navigator.key) {
		navigator.key = makeId();
	}

	const NavigatorComponent = getNavigatorFn(navigator.key, navigator.type);

	// If routes prop is a thunk, resolve it.
	// Then map it to have new paths
	const routes = resolveThunk(navigator.routes || [], screenProps).map((r: RouteConfig) => {
		// Do we have a navigator here? If yes then recurcively prepare its paths as well
		const resolvedNavigator = r.navigator ? preparePaths(r.navigator, screenProps, BB) : undefined;

		// Do we have a screen here? If yes then resolve the screen component
		const component = createNavigatorScreenComponent(r, BB);

		// Return the final object
		return { ...r, navigator: resolvedNavigator, component };
	});

	// Merge and return incoming navigator with newer routes
	return { ...navigator, NavigatorComponent, routes };
};
