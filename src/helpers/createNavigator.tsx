import { BlueBase, resolveThunk } from '@bluebase/core';
import { NavigationOptions, NavigatorProps, RouteConfig, } from '@bluebase/components';
import { NavigationRouteConfig, NavigationRouteConfigMap } from 'react-navigation';
import { createWrappedNavigator } from './createWrappedNavigator';
import { getNavigatorFn } from './getNavigatorFn';
import { navigationConverterHoc } from './navigationConverterHoc';

/**
 * This function is responsible to create a React Navigation "navigator"
 * component, and return it.
 *
 * @param options NavigatorProps
 * @param defaultNavigationOptions NavigationOptions
 */
export const createNavigator = (
	options: NavigatorProps,
	globalDefaultNavigationOptions: NavigationOptions,
	BB: BlueBase
) => {

	const { defaultNavigationOptions: _defaultNavigationOptions, routes: _routes, type, ...rest } = options;

	// If routes is a thunk, resolve it
	const routes: RouteConfig[] = resolveThunk(_routes);

	// Get appropriate navigator creator function
	const createNavigatorFn = getNavigatorFn(type);

	// Create an empty routes map
	const navigatorRoutes: NavigationRouteConfigMap = {};

	// Fill that navigatorRoutes map
	routes.forEach((element: RouteConfig) => {

		// react-navigation's route object
		const route: NavigationRouteConfig = {
			navigationOptions: element.navigationOptions,
			path: element.path,
		};

		// Screen component
		const Component = (typeof element.screen === 'string') ? BB.Components.resolve(element.screen) : element.screen;

		// Create navigator
		const Navigator = (element.navigator) ? createNavigator(element.navigator, globalDefaultNavigationOptions, BB) : null;

		// If we have both, a navigator and a screen, we wrap the navigator inside
		// the screen component
		if (Component && Navigator) {
			route.screen = createWrappedNavigator(Navigator, Component);
		}
		// If we have only a navigator, use it
		else if (Navigator) {
			route.screen = Navigator;
		}
		// If we have only a screen, use it
		else if (Component) {
			route.screen = navigationConverterHoc(Component);
		}

		// Add data from static props
		if (Component) {
			// debugger;
			route.navigationOptions = (Component as any).navigationOptions || route.navigationOptions;
		}

		// If theres a screen component, use this route
		if (route.screen) {
			navigatorRoutes[element.name] = route;
		}
	});

	// Create defaultNavigationOptions for navigator
	const defaultNavigationOptions = {
		...globalDefaultNavigationOptions,
		...resolveThunk(rest.defaultNavigationOptions)
	};

	// Create and return navigator
	return createNavigatorFn(navigatorRoutes, { ...rest, defaultNavigationOptions });
};
