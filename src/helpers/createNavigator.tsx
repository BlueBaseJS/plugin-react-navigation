import { BlueBase, resolveThunk } from '@bluebase/core';
import { NavigatorProps, RouteConfig } from '@bluebase/components';
import { applyNavigationContext, applyThemedBackground } from './screenWrappers';

import { NavigationScreenComponent } from 'react-navigation';
import { createWrappedNavigator } from './createWrappedNavigator';
import deepmerge from 'deepmerge';
import { getNavigatorFn } from './getNavigatorFn';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { navigationConverterHoc } from './navigationConverterHoc';
import { resolveNavigationOptions } from './resolveNavigationOptions';

/**
 * This function is responsible to create a React Navigation "navigator"
 * component, and return it.
 *
 * @param options NavigatorProps
 * @param defaultNavigationOptions NavigationOptions
 */
export const createNavigator = (options: NavigatorProps, BB: BlueBase) => {
	const {
		defaultNavigationOptions: _defaultNavigationOptions,
		routes: _routes,
		type,
		...rest
	} = options;

	// If routes is a thunk, resolve it
	const routes: RouteConfig[] = resolveThunk(_routes);

	// Get appropriate navigator creator function
	const createNavigatorFn = getNavigatorFn(type);

	// Create an empty routes map
	const navigatorRoutes: any = {};

	// Fill that navigatorRoutes map
	routes.forEach((element: RouteConfig) => {
		const { screen, navigator, ...extras } = element;

		// react-navigation's route object
		const route = extras;

		// Screen component
		const rawComponent = (typeof screen === 'string'
			? BB.Components.resolve(screen)
			: screen) as NavigationScreenComponent<any, any>;

		let Component = rawComponent;

		// Screen static navigationOptions object/function
		if (Component) {
			Component = applyNavigationContext(applyThemedBackground(Component));
			Component.navigationOptions = resolveNavigationOptions(rawComponent.navigationOptions);
		}

		// Route navigationOptions object/function
		if (route.navigationOptions) {
			route.navigationOptions = resolveNavigationOptions((route as any).navigationOptions) as any;
		}

		// Create navigator
		const Navigator = navigator ? createNavigator(navigator, BB) : null;

		// If we have both, a navigator and a screen, we wrap the navigator inside
		// the screen component
		if (Component && Navigator) {
			route.screen = createWrappedNavigator(Navigator, Component);
			route.screen = hoistNonReactStatics(route.screen, Component, { contextType: true });
		}
		// If we have only a navigator, use it
		else if (Navigator) {
			route.screen = Navigator;
		}
		// If we have only a screen, use it
		else if (Component) {
			route.screen = navigationConverterHoc(Component);
			route.screen = hoistNonReactStatics(route.screen, Component, { contextType: true });
		}

		// If theres a screen component, use this route
		if (route.screen) {
			navigatorRoutes[element.name] = route;
		}
	});

	// Create defaultNavigationOptions for navigator
	const navigatorConfigs = deepmerge(rest, {
		defaultNavigationOptions: resolveNavigationOptions(rest.defaultNavigationOptions),
		navigationOptions: resolveNavigationOptions(rest.navigationOptions),
	} as any);

	// Create and return navigator
	return createNavigatorFn(navigatorRoutes, navigatorConfigs);
};