import { NavigationProvider, Navigator } from '../components';

import { BlueBase } from '@bluebase/core';
import React from 'react';
import { RouteConfig } from '@bluebase/components';
import { resolveScreenComponent } from './resolveScreenComponent';

/**
 * Given a route object, creates a Screen component
 * @param route
 * @param BB
 */
export const createNavigatorScreenComponent = (route: RouteConfig, BB: BlueBase) => {
	const { navigator, screen } = route;

	// const Navigator = BB.Components.resolveFromCache('Navigator');
	// const ScreenView = BB.Components.resolveFromCache('ScreenView');
	const ScreenComponent = resolveScreenComponent(route, BB);

	if (navigator) {
		const navigatorNode = <Navigator {...(navigator as any)} />;

		if (screen) {
			const WrappedNavigator = (props: any) => (
				<NavigationProvider {...props}>
					<ScreenComponent {...props} route={route} ScreenComponent={ScreenComponent}>
						{navigatorNode}
					</ScreenComponent>
				</NavigationProvider>
			);

			return WrappedNavigator;
		}

		return () => navigatorNode;
	}

	const Screen = (props: any) => (
		<NavigationProvider {...props}>
			<ScreenComponent {...props} route={route} ScreenComponent={ScreenComponent} />
		</NavigationProvider>
	);

	return Screen;
};
