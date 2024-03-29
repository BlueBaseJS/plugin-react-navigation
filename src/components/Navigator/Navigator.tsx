import { BlueBaseContextPack, NavigatorProps, RouteConfig } from '@bluebase/components';
import {
	BlueBase,
	makeId,
	resolveThunk,
	useBlueBase,
	useComponent
} from '@bluebase/core';
import React, { useState } from 'react';

import { useBlueBaseContextPack } from '../../useBlueBaseContextPack';
import { NavigationProvider } from '../NavigationProvider';
import { getNavigatorFn } from './getNavigatorFn';
import { resolveScreenComponent } from './resolveScreenComponent';

/**
 * Navigator (V5)
 * Renders a single navigator
 * @param props
 */
export const Navigator = (inputProps: NavigatorProps) => {
	const BB = useBlueBase();
	const contextPack = useBlueBaseContextPack();

	const [props] = useState(preparePaths(inputProps, contextPack, BB));
	// eslint-disable-next-line react/prop-types
	const { routes, NavigatorComponent, ...rest } = props;

	if (!NavigatorComponent) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfig[]>(
		routes,
		contextPack
	);

	const renderRoute = (route: RouteConfig) => {
		let options = route.options;

		if (route.options !== undefined && typeof route.options === 'function') {
			options = (props: any) => (route.options as any)(props, contextPack);
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
	let resolvedScreenOptions = (inputProps as any).screenOptions;

	if (resolvedScreenOptions !== undefined && typeof resolvedScreenOptions === 'function') {
		resolvedScreenOptions = (props: any) => (resolvedScreenOptions as any)(props, contextPack);
	}

	// Default Screen Options
	let resolvedDefaultScreenOptions = (inputProps as any).defaultScreenOptions;

	if (resolvedDefaultScreenOptions !== undefined && typeof resolvedDefaultScreenOptions === 'function') {
		resolvedDefaultScreenOptions = (props: any) => (resolvedDefaultScreenOptions as any)(props, contextPack);
	}

	return (
		<NavigatorComponent.Navigator
			{...rest}
			screenOptions={resolvedScreenOptions}
			defaultScreenOptions={resolvedDefaultScreenOptions}
		>
			{resolvedRoutes.map(renderRoute)}
		</NavigatorComponent.Navigator>
	);
};

export type PreparedNavigatorProps = NavigatorProps & {
	NavigatorComponent: { [key: string]: any };
};

/**
 * Converts paths from react-navigation pattern to react-router pattern
 * @param navigator
 * @param parentPath
 */
export const preparePaths = (
	navigatorProps: NavigatorProps,
	contextPack: BlueBaseContextPack,
	BB: BlueBase
): PreparedNavigatorProps => {
	const navigator = { ...navigatorProps };

	if (!navigator.id) {
		navigator.id = makeId();
	}

	const NavigatorComponent = getNavigatorFn(navigator.id, navigator.type);

	// If routes prop is a thunk, resolve it.
	// Then map it to have new paths
	const routes: any = resolveThunk(
		navigator?.routes || [],
		contextPack
	).map((r: RouteConfig) => {
		// Do we have a navigator here? If yes then recurcively prepare its paths as well
		const resolvedNavigator = r.navigator
			? preparePaths(r.navigator, contextPack, BB)
			: undefined;

		// Do we have a screen here? If yes then resolve the screen component
		const component = createNavigatorScreenComponent(r, BB);

		// Return the final object
		return { ...r, navigator: resolvedNavigator, component } as RouteConfig;
	});

	// Merge and return incoming navigator with newer routes
	return { ...navigator, NavigatorComponent, routes };
};

/**
 * Given a route object, creates a Screen component
 * @param route
 * @param BB
 */
export const createNavigatorScreenComponent = (route: RouteConfig, BB: BlueBase) => {
	const { navigator, screen } = route;

	// const ScreenView = BB.Components.resolveFromCache('ScreenView');
	const ScreenComponent = resolveScreenComponent(route, BB);

	if (navigator) {
		if (screen) {
			const WrappedNavigator = (props: any) => {
				const BBNavigator = useComponent('Navigator');
				return (
					<NavigationProvider {...props}>
						<ScreenComponent {...props} route={route} ScreenComponent={ScreenComponent}>
							<BBNavigator {...(navigator)} />
						</ScreenComponent>
					</NavigationProvider>
				);
			};

			return WrappedNavigator;
		}

		const NavigatorScreenComponent = () => {
			const BBNavigator = useComponent('Navigator');
			return (
				<BBNavigator {...(navigator)} />
			);

		};
		NavigatorScreenComponent.displayName = 'NavigatorScreenComponent';

		return NavigatorScreenComponent;
	}

	const Screen = (props: any) => (
		<NavigationProvider {...props}>
			<ScreenComponent {...props} route={route} ScreenComponent={ScreenComponent} />
		</NavigationProvider>
	);
	Screen.displayName = 'NavigatorScreenComponent';

	return Screen;
};
