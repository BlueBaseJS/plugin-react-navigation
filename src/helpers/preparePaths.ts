import { NavigatorProps, RouteConfig } from '@bluebase/components';

import { ScreenProps } from '../types';
import { getNavigatorFn } from './getNavigatorFn';
import { resolveThunk } from '@bluebase/core';

/**
 * Converts paths from react-navigation pattern to react-router pattern
 * @param navigator
 * @param parentPath
 */
export const preparePaths = (
	navigator: NavigatorProps,
	screenProps: ScreenProps
): NavigatorProps => {
	debugger;
	navigator.NavigatorComponent = getNavigatorFn(navigator.type);

	// If routes prop is a thunk, resolve it.
	// Then map it to have new paths
	const routes = resolveThunk(navigator.routes || [], screenProps).map((r: RouteConfig) => {
		// Do we have a navigator here, if yes then recurcively prepare its paths as well
		const resolvedNavigator = r.navigator ? preparePaths(r.navigator, screenProps) : undefined;

		// Return the final object
		return { ...r, navigator: resolvedNavigator };
	});

	// Merge and return incoming navigator with newer routes
	return { ...navigator, routes };
};
