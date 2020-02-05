import { useComponent, useTheme } from '@bluebase/core';

import { NavigationNativeContainer } from '@react-navigation/native';
import { NavigationProps } from '@bluebase/components';
import React from 'react';

/**
 * Navigation (V5)
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export const Navigation = (props: NavigationProps) => {
	const { navigator, ...rest } = props;

	const Navigator = useComponent('Navigator');
	const { theme } = useTheme();

	return (
		<NavigationNativeContainer
			theme={{
				dark: theme.mode === 'dark',

				colors: {
					background: theme.palette.background.default,
					border: theme.palette.divider,
					card: theme.palette.background.card,
					primary: theme.palette.primary.main,
					text: theme.palette.text.primary,
				},
			}}
			{...rest}
		>
			<Navigator {...navigator} />
		</NavigationNativeContainer>
	);
};
