import React, { useState } from 'react';
import {
	preparePaths,
	resolveNavigatorScreenOptions,
	resolveRouteOptions,
	stubNavigationObject,
	useScreenProps,
} from '../../helpers';

import { NavigatorProps as BBNavigatorProps } from '@bluebase/components';
import { RouteConfigWithResolveSubRoutes } from '../../types';
import { resolveThunk } from '@bluebase/core';

export interface NavigatorProps extends BBNavigatorProps {
	// standalone?: boolean;
}

/**
 * Navigator (V5)
 * Renders a single navigator
 * @param props
 */
export const Navigator = (inputProps: NavigatorProps) => {
	const screenProps = useScreenProps();

	const [props] = useState(preparePaths(inputProps, screenProps));

	// eslint-disable-next-line react/prop-types
	const { type, routes, NavigatorComponent, ...rest } = props;

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
				component={route.component}
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
