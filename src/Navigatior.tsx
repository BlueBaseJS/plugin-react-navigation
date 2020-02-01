import { BlueBase, resolveThunk, useBlueBase } from '@bluebase/core';
import { NavigatorProps as CoreNavigatorProps, Noop, RouteConfig } from '@bluebase/components';

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
	const { type = 'stack', routes, ...navigatorProps } = props;

	const NavigatorComponent = getNavigator(type, BB)!;

	if (!NavigatorComponent) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfigWithResolveSubRoutes[]>(routes as any, BB);

	function renderRoute(route: RouteConfigWithResolveSubRoutes) {
		const { navigator } = route;

		const component = navigator
			? createNestedNavigatorScreenComponent(route, BB)
			: resolveScreenComponent(route, BB);
		const options = resolveRouteOptions(route, BB);

		return (
			<NavigatorComponent.Screen
				key={route.name}
				{...route}
				component={component}
				options={options}
			/>
		);
	}

	const screenOptions = resolveNavigatorScreenOptions(props, BB);

	return (
		<NavigatorComponent.Navigator {...navigatorProps} screenOptions={screenOptions}>
			{resolvedRoutes.map(renderRoute)}
		</NavigatorComponent.Navigator>
	);
};

function resolveScreenComponent(route: RouteConfig, BB: BlueBase) {
	const componentName: string | React.ComponentType<any> = route.component || route.screen || Noop;
	return BB.Components.resolveFromCache(componentName);
}

function resolveRouteOptions(_route: RouteConfig, _BB: BlueBase) {
	// const options = route.options || route.navigationOptions || {};
	return {};
}

function resolveNavigatorScreenOptions(navigator: CoreNavigatorProps, _BB: BlueBase) {
	const screenOptions = navigator.screenOptions || navigator.defaultNavigationOptions || {};
	return screenOptions;
}

export const createNestedNavigatorScreenComponent = (route: RouteConfig, BB: BlueBase) => {
	const { navigator, screen } = route;

	const navigatorNode = <Navigator {...navigator!} />;

	if (screen) {
		const options = resolveRouteOptions(route, BB);
		const Wrapper = resolveScreenComponent(route, BB);
		return (props: any) => (
			<Wrapper {...props} {...options}>
				{navigatorNode}
			</Wrapper>
		);
	}

	return () => navigatorNode;
};
