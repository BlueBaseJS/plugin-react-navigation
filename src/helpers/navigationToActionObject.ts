import {
	NavigationActionPathPayload,
	NavigationActionPayload,
	NavigationActionsObject,
	NavitionActionRouteNamePayload,
} from '@bluebase/components';

import { StackActions } from '@react-navigation/native';

/**
 * Convert a react-navigation's navigation prop to NavigationActionsObject
 * @param navigation
 */
export const navigationToActionObject = (navigation: any, state: any): NavigationActionsObject => {
	const { navigate, goBack, setParams, dispatch } = navigation as any;

	const push = (routeName: string, params: any) => {
		const pushAction = StackActions.push(routeName, params);
		dispatch(pushAction);
	};

	const pop = () => {
		const pushAction = StackActions.pop();
		dispatch(pushAction);
	};

	const replace = (routeName: string, params: any) => {
		const pushAction = StackActions.replace(routeName, params);
		dispatch(pushAction);
	};

	const otherParams: any = { ...state.params };

	// Extract internal variables
	const url = otherParams.__path_url__ ? `/${otherParams.__path_url__}` : undefined;
	const search = otherParams.__path_search__;

	// Delete internal flags
	delete otherParams.__path_url__;
	delete otherParams.__path_search__;

	const actions: NavigationActionsObject = {
		goBack: () => goBack(),
		pop,

		// navigate,
		// push,
		// replace,

		navigate: (routeName: NavigationActionPayload, params?: any) =>
			execAction(navigate, routeName, params),
		push: (routeName: NavigationActionPayload, params?: any) => execAction(push, routeName, params),
		replace: (routeName: NavigationActionPayload, params?: any) =>
			execAction(replace, routeName, params),

		setParams,

		getParam: (paramName: any, defaultValue: any): any => {
			const params = state.params;

			if (params && paramName in params) {
				return params[paramName];
			}

			return defaultValue;
		},

		state: {
			...state,
			routeName: state.name,
			search: search,
			url: (state as any).path || url,
		},

		source: navigation,
	};

	return actions;
};

// /**
// TODO: Use preparePaths & findRouteByKey from react-router plugin
//  * Execute action from a path
//  * @param router
//  */
// export const execPathAction = (router: NavigationRouter) => (
// 	fn: (...a: any[]) => void,
// 	path: string,
// 	params?: NavigationParams
// ) => {
// 	let url = path;
// 	let search = '';

// 	if (path.indexOf('?') >= 0) {
// 		url = path.substring(0, path.indexOf('?'));
// 		search = path.substring(path.indexOf('?'));
// 	}

// 	const finalParams = {
// 		...params,

// 		// We create these internal flags to pass url variables around
// 		__path_search__: search,
// 		__path_url__: url,
// 	};

// 	const action = router.getActionForPathAndParams(url, finalParams) as any;

// 	if (!fn || !action) {
// 		return;
// 	}

// 	if (action.routeName) {
// 		fn(action.routeName, action.params, action.action);
// 	} else {
// 		fn(action);
// 	}
// };

/**
 * Execute an action. If a routeName is provided, prefer it,
 * otherwise execute a path.
 * @param fn
 * @param path
 * @param params
 */
export const execAction = (
	fn: (...a: any[]) => void,
	routeName: NavigationActionPayload,
	params?: any
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
		console.warn('Navigation by path is not supported in this version');
		// execPathAction(fn, (routeName as NavigationActionPathPayload).path, params);
		return;
	}

	throw Error('Invalid props provided to navigation action');
};
