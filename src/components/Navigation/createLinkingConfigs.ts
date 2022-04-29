import { MaybeThunk, resolveThunk } from '@bluebase/core';
import { ParamListBase, PathConfigMap } from '@react-navigation/core';

import { BlueBaseContextPack, RouteConfig, } from '../../new-types';

export function createLinkingConfigs(routes: MaybeThunk<RouteConfig[]>, contextPack: BlueBaseContextPack): any {

	const screens: PathConfigMap<ParamListBase> = {};
	const resolvedRoutes = resolveThunk(routes, contextPack);

	resolvedRoutes.forEach(route => {
		if (route.navigator !== undefined) {
			screens[route.name] = createLinkingConfigs(route.navigator.routes, contextPack);
			return;
		}

		if (route.path === undefined) {
			return;
		}

		const pathObject: any = {
			path: route.path,
		};

		if (route.exact !== undefined) {
			pathObject.exact = route.exact;
		}

		screens[route.name] = pathObject;
	});

	return { screens };
}