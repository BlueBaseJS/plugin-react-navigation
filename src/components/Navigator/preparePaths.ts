
import { BlueBase, makeId, resolveThunk } from '@bluebase/core';

import { BlueBaseContextPack, NavigatorProps, RouteConfig } from '../../new-types';
import { createNavigatorScreenComponent } from './createNavigatorScreenComponent';
import { getNavigatorFn } from './getNavigatorFn';

export type PreparedNavigatorProps = NavigatorProps & {
	NavigatorComponent: { [key: string]: any };
};

/**
 * Converts paths from react-navigation pattern to react-router pattern
 * @param navigator
 * @param parentPath
 */
export const preparePaths = (
	navigatorProps: NavigatorProps,
	contextPack: BlueBaseContextPack,
	BB: BlueBase
): PreparedNavigatorProps => {
	const navigator = { ...navigatorProps };

	if (!navigator.id) {
		navigator.id = makeId();
	}

	const NavigatorComponent = getNavigatorFn(navigator.id, navigator.type);

	// If routes prop is a thunk, resolve it.
	// Then map it to have new paths
	const routes: any = resolveThunk(
		navigator?.routes || [],
		contextPack
	).map((r: RouteConfig) => {
		// Do we have a navigator here? If yes then recurcively prepare its paths as well
		const resolvedNavigator = r.navigator
			? preparePaths(r.navigator, contextPack, BB)
			: undefined;

		// Do we have a screen here? If yes then resolve the screen component
		const component = createNavigatorScreenComponent(r, BB);

		// Return the final object
		return { ...r, navigator: resolvedNavigator, component } as RouteConfig;
	});

	// Merge and return incoming navigator with newer routes
	return { ...navigator, NavigatorComponent, routes };
};
