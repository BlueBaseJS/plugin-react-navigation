import { BlueBaseContextPack, RouteConfig } from '@bluebase/components';
import { MaybeThunk, resolveThunk } from '@bluebase/core';
import { ParamListBase, PathConfigMap } from '@react-navigation/core';

export function createLinkingConfigs(
	routes: MaybeThunk<RouteConfig[]>,
	contextPack: BlueBaseContextPack,
	// parent?: RouteConfig,
): any {
	const screens: PathConfigMap<ParamListBase> = {};
	const resolvedRoutes = resolveThunk(routes, contextPack);

	resolvedRoutes.forEach((route) => {
		const pathObject = route.navigator !== undefined
			? createLinkingConfigs(
				route.navigator.routes,
				contextPack,
			)
			: {};

		if (route.path !== undefined) {
			pathObject.path = route.path;
		}

		if (route.exact !== undefined) {
			pathObject.exact = route.exact;
		}

		screens[route.name] = pathObject;
	});

	return { screens };
}
