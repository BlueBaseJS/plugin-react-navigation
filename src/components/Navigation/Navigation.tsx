import { useComponent, useTheme } from '@bluebase/core';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { NavigationProps, NavigatorProps, } from '../../new-types';

/**
 * Navigation (V5)
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export const Navigation = (props: NavigationProps) => {
	const { navigator, ...rest } = props;
	const { theme } = useTheme();
	const Navigator = useComponent<NavigatorProps>('Navigator');

	return (
		<NavigationContainer
			theme={{
				dark: theme.mode === 'dark',

				colors: {
					background: theme.palette.background.default,
					border: theme.palette.divider,
					card: theme.palette.background.card,
					primary: theme.palette.primary.main,
					text: theme.palette.text.primary,
					notification: theme.palette.error.main,
				},
			}}
			{...rest}
		>
			<Navigator {...navigator} />
		</NavigationContainer>
	);
};

Navigation.displayName = 'Navigation';