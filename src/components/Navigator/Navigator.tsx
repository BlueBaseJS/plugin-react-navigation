import { resolveThunk, useBlueBase } from '@bluebase/core';
import React, { useState } from 'react';

import { preparePaths, useScreenProps } from '../../helpers';
import { NavigatorProps, RouteConfig } from '../../new-types';

/**
 * Navigator (V5)
 * Renders a single navigator
 * @param props
 */
export const Navigator = (inputProps: NavigatorProps) => {
	const BB = useBlueBase();
	const screenProps = useScreenProps();

	const [props] = useState(preparePaths(inputProps, screenProps, BB));
	// eslint-disable-next-line react/prop-types
	const { routes, NavigatorComponent, screenOptions, defaultScreenOptions, ...rest } = props;

	if (!NavigatorComponent) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfig[]>(
		routes,
		screenProps
	);

	const renderRoute = (route: RouteConfig) => {
		let options = route.options;

		if (route.options !== undefined && typeof route.options === 'function') {
			options = (props: any) => (route.options as any)(props, screenProps);
		}

		return (
			<NavigatorComponent.Screen
				key={route.name}
				{...route}
				component={route.component}
				options={options}
			/>
		);
	};

	// Screen Options
	let resolvedScreenOptions = screenOptions;

	if (screenOptions !== undefined && typeof screenOptions === 'function') {
		resolvedScreenOptions = (props: any) => (screenOptions as any)(props, screenProps);
	}

	// Default Screen Options
	let resolvedDefaultScreenOptions = defaultScreenOptions;

	if (defaultScreenOptions !== undefined && typeof defaultScreenOptions === 'function') {
		resolvedDefaultScreenOptions = (props: any) => (defaultScreenOptions as any)(props, screenProps);
	}

	return (
		<NavigatorComponent.Navigator
			screenOptions={resolvedScreenOptions}
			defaultScreenOptions={resolvedDefaultScreenOptions}
			{...rest}
		>
			{resolvedRoutes.map(renderRoute)}
		</NavigatorComponent.Navigator>
	);
};
