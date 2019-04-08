import { NavigationActionPayload, NavigationActionsObject } from '@bluebase/core';
import { NavigationInjectedProps, NavigationParams } from 'react-navigation';

type NavigationProp = NavigationInjectedProps['navigation'];

const getTopNavigation = (navigation: NavigationProp): NavigationProp => {
	const parent = navigation.dangerouslyGetParent();
	if (parent) {
		return getTopNavigation(parent);
	}
	return navigation;
};

/**
 * Convert a react-navigation's navigation prop to NavigationActionsObject
 * @param navigation
 */
export const navigationToActionObject = (navigation: NavigationProp): NavigationActionsObject => {

	const { navigate, push, pop, replace, goBack, getParam, setParams } = navigation;

	const topNavigation = getTopNavigation(navigation);
	const router = topNavigation.router;

	if (!router) {
		throw Error('No router found in navigation.');
	}

	// Execute action from a path
	const execPathAction = (fn: ((...a: any[]) => void), path: string, params?: NavigationParams) => {


		// const parsed = queryString.parse(path);

		const url = path.substring(0, path.indexOf('?'));
		const search = path.substring(path.indexOf('?'));

		const finalParams = {
			...params,
			'__path_search__': search,
			'__path_url__': url,
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
	 * Execute an action. If a path routeName is provided, prefer it,
	 * otherwise execute a path.
	 * @param fn
	 * @param path
	 * @param params
	 */
	const execAction = (fn: ((...a: any[]) => void), routeName: NavigationActionPayload, params?: NavigationParams) => {

		if (!fn) {
			return;
		}

		if (typeof routeName === 'string' || typeof routeName.routeName === 'string') {
			fn(routeName, params);
			return;
		}

		if (typeof routeName.path === 'string') {
			execPathAction(fn, routeName.path, params);
			return;
		}

		throw Error('Invalid props provided to navigation action');
	};


	const otherParams: any = { ...navigation.state.params };
	const extractedUrl = `/${otherParams.__path_url__}`;
	const extractedSearch = otherParams.__path_search__;
	delete otherParams.__path_url__;
	delete otherParams.__path_search__;

	const actions: NavigationActionsObject = {
		getParam,
		goBack: () => goBack(),
		navigate: (routeName, params?: NavigationParams) => execAction(navigate, routeName, params),
		pop,
		push: (routeName, params?: NavigationParams) => execAction(push || navigate, routeName, params),
		replace: (routeName, params?: NavigationParams) => execAction(replace || navigate, routeName, params),
		setParams,

		state: {
			key: navigation.state.key,
			params: otherParams || {},
			routeName: navigation.state.routeName,
			search: extractedSearch,
			url: navigation.state.path || extractedUrl,
		},

		source: navigation,
	};

	return actions;
};