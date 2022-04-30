import { NavigationActionsObject } from '@bluebase/components';
import { DrawerActions, NavigationProp, RouteProp, TabActions } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';

/**
 * Convert a react-navigation's navigation prop to NavigationActionsObject
 * @param navigation
 */
export const navigationToActionObject = (
	navigation: NavigationProp<any, any>,
	route: RouteProp<any, any>
): NavigationActionsObject => {
	const {
		navigate,
		goBack,
		setParams,
		setOptions,
		dispatch,
		canGoBack,
		getId,
		getParent,
		reset,
		isFocused
	} = navigation;

	const actions: NavigationActionsObject = {
		route,

		navigate,
		goBack,
		setParams,
		setOptions,
		canGoBack,
		getId,
		getParent,
		reset,
		isFocused,

		// StackActions
		replace: (screen: any, params: any) => {
			dispatch(StackActions.replace(screen, params));
		},

		push: (screen: any, params: any) => {
			dispatch(StackActions.push(screen, params));
		},

		pop: () => {
			dispatch(StackActions.pop());
		},

		popToTop: () => {
			dispatch(StackActions.popToTop());
		},

		// DrawerActions
		openDrawer: () => {
			dispatch(DrawerActions.openDrawer());
		},

		closeDrawer: () => {
			dispatch(DrawerActions.closeDrawer());
		},

		toggleDrawer: () => {
			dispatch(DrawerActions.toggleDrawer());
		},

		// TabActions
		jumpTo: (name: string, params?: object | undefined) => {
			dispatch(TabActions.jumpTo(name, params));
		},

		source: navigation,
	};

	return actions as any;
};
