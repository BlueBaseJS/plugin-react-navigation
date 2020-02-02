import { NavigationNativeContainer } from '@react-navigation/native';
import { NavigationProps } from '@bluebase/components';
import React from 'react';
import { useComponent } from '@bluebase/core';

/**
 * Navigation (V5)
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export const Navigation = (props: NavigationProps) => {
	const Navigator = useComponent('Navigator');
	const { navigator, ...rest } = props;

	return (
		<NavigationNativeContainer {...rest}>
			<Navigator {...navigator} />
		</NavigationNativeContainer>
	);
};
