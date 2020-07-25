import { useNavigation, useRoute } from '@react-navigation/native';

import React from 'react';
import { RouteConfig } from '@bluebase/components';
import { navigationToActionObject } from '../../helpers';

export interface ScreenViewProps {
	children?: React.ReactNode;
	route: RouteConfig;
	ScreenComponent: React.ComponentType<any>;
}

export const ScreenView: React.ComponentType<ScreenViewProps> = ({
	children,
	route,
	ScreenComponent,
	...rest
}: ScreenViewProps & any) => {
	const state = useRoute();
	const navObj = useNavigation();
	const navigation = navigationToActionObject(navObj, state);

	return (
		<ScreenComponent {...rest} navigation={navigation}>
			{children}
		</ScreenComponent>
	);
};
