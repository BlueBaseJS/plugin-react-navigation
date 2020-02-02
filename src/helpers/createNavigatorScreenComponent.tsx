import { BlueBase, useComponent } from '@bluebase/core';

import { NavigationProvider } from '../components';
import React from 'react';
import { RouteConfig } from '@bluebase/components';
import { resolveRouteOptions } from './resolveRouteOptions';
import { resolveScreenComponent } from './resolveScreenComponent';

/**
 * Given a route object, creates a Screen component
 * @param route
 * @param BB
 */
export const createNavigatorScreenComponent = (route: RouteConfig, BB: BlueBase) => {
	const { navigator, screen } = route;
	const Navigator = useComponent('Navigator');

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
