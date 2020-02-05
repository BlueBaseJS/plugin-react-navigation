import { BlueBase, IntlContextData, Theme } from '@bluebase/core';
import { NavigatorProps, RouteConfig } from '@bluebase/components';

export interface ScreenProps {
	BB: BlueBase;
	theme: Theme;
	intl: IntlContextData;
}

export interface RouteConfigWithResolveSubRoutes extends RouteConfig {
	navigator?: NavigatorPropsWithResolvedRoutes;
}

export interface NavigatorPropsWithResolvedRoutes extends NavigatorProps {
	routes: RouteConfigWithResolveSubRoutes[];
	screenProps: ScreenProps;
}
