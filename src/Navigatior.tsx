import { BlueBase, merge, resolveThunk, useBlueBase } from '@bluebase/core';
import { NavigatorProps as CoreNavigatorProps, Noop, RouteConfig } from '@bluebase/components';

import { NavigationProvider } from './NavigationProvider';
import React from 'react';
import { RouteConfigWithResolveSubRoutes } from './types';
import { getNavigator } from './imports';

export interface NavigatorProps extends CoreNavigatorProps {}

/**
 * Navigator (V5)
 * Renders a single navigator
 * @param props
 */
export const Navigator = (props: NavigatorProps) => {
	const BB = useBlueBase();
	const { type = 'stack', routes } = props;

	const NavigatorComponent = getNavigator(type, BB)!;

	if (!NavigatorComponent) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfigWithResolveSubRoutes[]>(routes as any, BB);

	function renderRoute(route: RouteConfigWithResolveSubRoutes) {
		const options = resolveRouteOptions(route, BB);

		return (
			<NavigatorComponent.Screen
				key={route.name}
				{...route}
				component={createNestedNavigatorScreenComponent(route, BB)}
				options={options}
			/>
		);
	}

	const screenOptions = resolveNavigatorScreenOptions(props, BB);

	return (
		<NavigatorComponent.Navigator screenOptions={screenOptions}>
			{resolvedRoutes.map(renderRoute)}
		</NavigatorComponent.Navigator>
	);
};

function resolveScreenComponent(route: RouteConfig, BB: BlueBase) {
	const componentName: string | React.ComponentType<any> = route.component || route.screen || Noop;
	return BB.Components.resolveFromCache(componentName);
}

function resolveRouteOptions(route: RouteConfig, _BB: BlueBase) {
	const options = route.options || route.navigationOptions || {};

	return {
		...options,
		header:
			typeof options.header === 'function' || options.header === undefined
				? options.header
				: () => options.header,
	};
}

function resolveNavigatorScreenOptions(navigator: CoreNavigatorProps, _BB: BlueBase) {
	const { type, routes, ...navigatorProps } = navigator;

	const screenOptions = navigator.screenOptions || navigator.defaultNavigationOptions || {};
	return merge(navigatorProps, screenOptions);
}

export const createNestedNavigatorScreenComponent = (route: RouteConfig, BB: BlueBase) => {
	const { navigator, screen } = route;

	const ScreenComponent = resolveScreenComponent(route, BB);
	const options = resolveRouteOptions(route, BB);

	const navigatorNode = <Navigator {...navigator!} />;

	if (screen) {
		return (props: any) => (
			<NavigationProvider>
				<ScreenComponent {...props} {...options}>
					{navigatorNode}
				</ScreenComponent>
			</NavigationProvider>
		);
	}

	if (navigator) {
		return () => navigatorNode;
	}

	return (props: any) => (
		<NavigationProvider>
			<ScreenComponent {...props} {...options} />
		</NavigationProvider>
	);
};
