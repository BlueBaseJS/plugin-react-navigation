import { LoadingState, NavigationProps, NavigatorProps } from '@bluebase/components';
import { useComponent, useConfig, useTheme } from '@bluebase/core';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React from 'react';

import { useBlueBaseContextPack } from '../../useBlueBaseContextPack';
import { createLinkingConfigs } from './createLinkingConfigs';
import { usePersistentState } from './usePersistentState';

/**
 * Navigation (V5)
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export const Navigation = (props: NavigationProps) => {
	const { navigator, ...rest } = props;
	const { theme } = useTheme();

	const contextPack = useBlueBaseContextPack();
	const Navigator = useComponent<NavigatorProps>('Navigator');
	const [prefixes] = useConfig<string[]>('navigation.linking.prefixes');

	const { initialState, isReady, onStateChange } = usePersistentState();

	if (!isReady) {
		return <LoadingState />;
	}

	const linking: LinkingOptions<any> = {
		config: createLinkingConfigs(navigator.routes, contextPack),
		prefixes: [Linking.createURL('/'), ...prefixes]
	};

	return (
		<NavigationContainer
			initialState={initialState}
			onStateChange={onStateChange}
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
			linking={linking}
			{...rest}
		>
			<Navigator {...navigator} />
		</NavigationContainer>
	);
};

Navigation.displayName = 'Navigation';
