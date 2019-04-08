import { NavigationRouteConfig, NavigationRouteConfigMap } from 'react-navigation';
import { NavigatorProps, RouteConfig, Theme, getComponent } from '@bluebase/core';
import React from 'react';
import { getNavigatorFn } from './getNavigatorFn';
import { navigationConverterHoc } from './navigationConverterHoc';
import { navigationToActionObject } from './navigationToActionObject';

export const createNavigator = (options: NavigatorProps, theme: Theme) => {

	const { type, routes, ...rest } = options;

	// If routes is a thunk, resolve it
	const resolvedRoutes: RouteConfig[] = (typeof routes === 'function') ? routes() : routes;

	// Get appropriate navigator creator function
	const createNavigatorFn = getNavigatorFn(type);

	const navigatorRoutes: NavigationRouteConfigMap = {};

	resolvedRoutes.forEach((element: RouteConfig) => {

		// react-navigation's route object
		const route: NavigationRouteConfig = {
			navigationOptions: element.navigationOptions,
			path: element.path,
		};

		// Screen component
		const Component = (typeof element.screen === 'string') ? getComponent(element.screen) : element.screen;

		// Create navigator
		const Navigator = (element.navigator) ? createNavigator(element.navigator, theme) : null;

		// If we have both, a navigator and a screen, we wrap the navigator inside
		// the screen component
		if (Component && Navigator) {
			route.screen = class WrappedNavigator extends React.PureComponent<any> {

				static router = Navigator.router;

				render() {

					const { navigation: n, ...others } = this.props;
					const navigation = this.props.navigation
					? navigationToActionObject(this.props.navigation)
					: undefined;

					const props = { ...this.props, navigation };

					return (
						<Component {...others} navigation={navigation}>
							<Navigator {...props} />
						</Component>
					);
				}
			};

		}
		// If we have only a navigator, use it
		else if (Navigator) {
			route.screen = Navigator;
		}
		// If we have only a screen, use it
		else if (Component) {
			route.screen = navigationConverterHoc(Component);
		}

		// If theres a screen component, use this route
		if (route.screen) {
			navigatorRoutes[element.name] = route;
		}
	});

	// Add Theme styles
	const defaultNavigationOptions = theme? {
		headerBackTitleStyle: {
			color: theme.palette.primary.contrastText,
		},
		headerStyle: {
			backgroundColor: theme.palette.primary.main,
			...theme.elevation(4)
		},
		headerTitleStyle: {
			color: theme.palette.primary.contrastText,
		},

		headerTintColor: theme.palette.primary.contrastText,

		...rest.defaultNavigationOptions,
	} : {};

	return createNavigatorFn(navigatorRoutes, { ...rest, defaultNavigationOptions });
};