import { navigationToActionObject, resolveScreenComponent } from '../../helpers';
import { useNavigation, useRoute } from '@react-navigation/native';

import React from 'react';
import { RouteConfig } from '@bluebase/components';
import { useBlueBase } from '@bluebase/core';

export interface ScreenViewProps {
	children?: React.ReactNode;
	route: RouteConfig;
}

export const ScreenView: React.ComponentType<ScreenViewProps> = ({
	children,
	route,
	...rest
}: ScreenViewProps) => {
	const state = useRoute();
	const navObj = useNavigation();
	const navigation = navigationToActionObject(navObj, state);

	const BB = useBlueBase();

	const ScreenComponent = resolveScreenComponent(route, BB);

	return (
		<ScreenComponent {...rest} navigation={navigation}>
			{children}
		</ScreenComponent>
	);
};
