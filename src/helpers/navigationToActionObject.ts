import {
	NavigationActionPathPayload,
	NavigationActionPayload,
	NavigationActionsObject,
	NavitionActionRouteNamePayload,
} from '@bluebase/components';
import { NavigationInjectedProps, NavigationParams, NavigationRouter } from 'react-navigation';

import { NavigationStackScreenProps } from 'react-navigation-stack';

const noop = (..._params: any[]) => {
	return null;
};

type NavigationProp =
	| NavigationInjectedProps['navigation']
	| NavigationStackScreenProps['navigation'];

export const getTopNavigation = (navigation: NavigationProp): NavigationProp => {
	const parent = navigation.dangerouslyGetParent();
	if (parent) {
		// FIXME: remove any
		return getTopNavigation(parent as any);
	}
	return navigation;
};

/**
 * Convert a react-navigation's navigation prop to NavigationActionsObject
 * @param navigation
 */
export const navigationToActionObject = (navigation: NavigationProp): NavigationActionsObject => {
	const {
		navigate,
		push = noop,
		pop = noop,
		replace = noop,
		goBack,
		getParam,
		setParams,
	} = navigation as any;

	// Extract top router
	const topNavigation = getTopNavigation(navigation);
	// console.log(topNavigation);
	const router = topNavigation.router;

	// If we don't have a router, puke 🤮
	if (!router) {
		throw Error('No router found in navigation.');
	}

	const otherParams: any = { ...navigation.state.params };

	// Extract internal variables
	const url = `/${otherParams.__path_url__}`;
	const search = otherParams.__path_search__;

	// Delete internal flags
	delete otherParams.__path_url__;
	delete otherParams.__path_search__;

	const actions: NavigationActionsObject = {
		getParam,
		goBack: () => goBack(),
		navigate: (routeName, params?: NavigationParams) =>
			execAction(router)(navigate, routeName, params),
		pop,
		push: (routeName, params?: NavigationParams) =>
			execAction(router)(push || navigate, routeName, params),
		replace: (routeName, params?: NavigationParams) =>
			execAction(router)(replace || navigate, routeName, params),
		setParams,

		state: {
			key: navigation.state.key,
			params: otherParams || {},
			routeName: navigation.state.routeName,
			search: search,
			url: navigation.state.path || url,
		},

		source: navigation,
	};

	return actions;
};

/**
 * Execute action from a path
 * @param router
 */
export const execPathAction = (router: NavigationRouter) => (
	fn: (...a: any[]) => void,
	path: string,
	params?: NavigationParams
) => {
	let url = path;
	let search = '';

	if (path.indexOf('?') >= 0) {
		url = path.substring(0, path.indexOf('?'));
		search = path.substring(path.indexOf('?'));
	}

	const finalParams = {
		...params,

		// We create these internal flags to pass url variables around
		__path_search__: search,
		__path_url__: url,
	};

	const action = router.getActionForPathAndParams(url, finalParams) as any;

	if (!fn || !action) {
		return;
	}

	if (action.routeName) {
		fn(action.routeName, action.params, action.action);
	} else {
		fn(action);
	}
};

/**
 * Execute an action. If a routeName is provided, prefer it,
 * otherwise execute a path.
 * @param fn
 * @param path
 * @param params
 */
export const execAction = (router: NavigationRouter) => (
	fn: (...a: any[]) => void,
	routeName: NavigationActionPayload,
	params?: NavigationParams
) => {
	if (!fn) {
		return;
	}

	if (
		typeof routeName === 'string' ||
		typeof (routeName as NavitionActionRouteNamePayload).routeName === 'string'
	) {
		fn(routeName, params);
		return;
	}

	if (typeof (routeName as NavigationActionPathPayload).path === 'string') {
		execPathAction(router)(fn, (routeName as NavigationActionPathPayload).path, params);
		return;
	}

	throw Error('Invalid props provided to navigation action');
};
