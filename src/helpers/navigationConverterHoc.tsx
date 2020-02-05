import React from 'react';
import { navigationToActionObject } from './navigationToActionObject';

/**
 * A higher order component that converts a react-navigation's navigation prop
 * to NavigationActionsObject.
 *
 * @param Component
 */
export const navigationConverterHoc = (Component: React.ComponentType<any>) => (props: any) => {
	const { navigation: realNavigation, ...rest } = props;

	const navigation = props.navigation ? navigationToActionObject(props.navigation) : undefined;

	return React.createElement(Component, { ...rest, navigation, realNavigation });
};
