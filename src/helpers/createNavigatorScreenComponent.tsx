import { BlueBase } from '@bluebase/core';
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
	const Navigator = BB.Components.resolveFromCache('Navigator');

	const ScreenComponent = resolveScreenComponent(route, BB);
	const options = resolveRouteOptions(route, BB);

	if (navigator) {
		const navigatorNode = <Navigator {...navigator} />;

		if (screen) {
			return (props: any) => (
				<NavigationProvider>
					<ScreenComponent {...props} {...options}>
						{navigatorNode}
					</ScreenComponent>
				</NavigationProvider>
			);
		}

		return () => navigatorNode;
	}

	return (props: any) => (
		<NavigationProvider>
			<ScreenComponent {...props} {...options} />
		</NavigationProvider>
	);
};
