import React from 'react';
import { RouteConfig } from '@bluebase/components';
import { useNavigation } from '@bluebase/core';

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
	const navigation = useNavigation();

	return (
		<ScreenComponent {...rest} navigation={navigation}>
			{children}
		</ScreenComponent>
	);
};
