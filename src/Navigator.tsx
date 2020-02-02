import {
	createNavigatorScreenComponent,
	resolveNavigatorScreenOptions,
	resolveRouteOptions,
} from './helpers';
import { resolveThunk, useBlueBase, useIntl, useTheme } from '@bluebase/core';

import { NavigatorProps as CoreNavigatorProps } from '@bluebase/components';
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
	const theme = useTheme();
	const intl = useIntl();

	const { type = 'stack', routes } = props;

	const NavigatorComponent = getNavigator(type, BB)!;

	if (!NavigatorComponent) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfigWithResolveSubRoutes[]>(routes as any, {
		BB,
		intl,
		theme,
	});

	function renderRoute(route: RouteConfigWithResolveSubRoutes) {
		const options = resolveRouteOptions(route, BB);

		return (
			<NavigatorComponent.Screen
				key={route.name}
				{...route}
				component={createNavigatorScreenComponent(route, BB)}
				options={options}
			/>
		);
	}

	return (
		<NavigatorComponent.Navigator screenOptions={resolveNavigatorScreenOptions(props, BB)}>
			{resolvedRoutes.map(renderRoute)}
		</NavigatorComponent.Navigator>
	);
};
