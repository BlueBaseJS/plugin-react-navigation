import React, { useEffect } from 'react';
import {
	createNavigatorScreenComponent,
	resolveNavigatorScreenOptions,
	resolveRouteOptions,
	stubNavigationObject,
	useScreenProps,
} from '../../helpers';
import { resolveThunk, useBlueBase } from '@bluebase/core';

import { NavigatorProps as BBNavigatorProps } from '@bluebase/components';
import { RouteConfigWithResolveSubRoutes } from '../../types';

export interface NavigatorProps extends BBNavigatorProps {
	NavigatorComponent: { [key: string]: any };
}

/**
 * Navigator (V5)
 * Renders a single navigator
 * @param props
 */
export const Navigator = (props: NavigatorProps) => {
	const { type, routes, NavigatorComponent, ...rest } = props;

	const BB = useBlueBase();
	const screenProps = useScreenProps();

	useEffect(() => {
		console.log('mount Navigator', props);

		return () => {
			console.log('unmount Navigator', props);
		};
	}, []);

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
