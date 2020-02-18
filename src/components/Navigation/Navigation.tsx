import React, { useEffect } from 'react';
import { preparePaths, useScreenProps } from '../../helpers';
import { useComponent, useTheme } from '@bluebase/core';

import { NavigationContainer } from '@react-navigation/native';
import { NavigationProps } from '@bluebase/components';

let paths: any;

/**
 * Navigation (V5)
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export const Navigation = (props: NavigationProps) => {
	const { navigator, ...rest } = props;
	const Navigator = useComponent('Navigator');

	const screenProps = useScreenProps();
	const { theme } = useTheme();

	if (!paths) {
		paths = preparePaths(navigator, screenProps);
	}

	// const [resolvedNavigator] = useState(preparePaths(navigator, screenProps));

	useEffect(() => {
		console.log('mount navigation');

		return () => {
			console.log('unmount navigation');
		};
	}, []);

	debugger;

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
				},
			}}
			{...rest}
		>
			<Navigator {...paths} />
		</NavigationContainer>
	);
};
