import { RouteConfigWithResolveSubRoutes, ScreenProps } from '../../types';
import {
	createNavigatorScreenComponent,
	getNavigatorFn,
	resolveNavigatorScreenOptions,
	resolveRouteOptions,
	stubNavigationObject,
} from '../../helpers';
import { resolveThunk, useBlueBase, useIntl, useTheme } from '@bluebase/core';

import { NavigatorProps } from '@bluebase/components';
import React from 'react';

/**
 * Navigator (V5)
 * Renders a single navigator
 * @param props
 */
export const Navigator = (props: NavigatorProps) => {
	const { type, routes, ...rest } = props;

	const BB = useBlueBase();
	const themes = useTheme();
	const intl = useIntl();
	const screenProps: ScreenProps = { BB, intl, themes, theme: themes.theme };

	const NavigatorComponent = getNavigatorFn(type);

	if (!NavigatorComponent) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfigWithResolveSubRoutes[]>(
		routes as any,
		screenProps
	);

	const renderRoute = (route: RouteConfigWithResolveSubRoutes) => {
		// We're not able to resovle navigation object here. Open to better ideas.
		const options = resolveRouteOptions(route, {
			navigation: stubNavigationObject,
			screenProps,
		});

		return (
			<NavigatorComponent.Screen
				key={route.name}
				{...route}
				component={createNavigatorScreenComponent(route, BB)}
				options={options}
			/>
		);
	};

	return (
		<NavigatorComponent.Navigator screenOptions={resolveNavigatorScreenOptions(props)} {...rest}>
			{resolvedRoutes.map(renderRoute)}
		</NavigatorComponent.Navigator>
	);
};
