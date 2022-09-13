import { LoadingState, NavigationProps, NavigatorProps } from '@bluebase/components';
import { useBlueBase, useComponent, useConfig, useTheme } from '@bluebase/core';
import { getPathFromState, getStateFromPath, LinkingOptions, NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React from 'react';

import { useBlueBaseContextPack } from '../../useBlueBaseContextPack';
import { createLinkingConfigs } from './createLinkingConfigs';
import { usePersistentState } from './usePersistentState';

export type getStateFromPathConfigFn =
(defaultState: any, path: string, options?: any) => any;

export type getPathFromStateConfigFn =
(defaultPath: string, state: any, options?: any) => any;

/**
 * Navigation (V5)
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export const Navigation = (props: NavigationProps) => {
	const BB = useBlueBase();
	const { theme } = useTheme();
	const { navigator, ...rest } = props;

	const contextPack = useBlueBaseContextPack();
	const Navigator = useComponent<NavigatorProps>('Navigator');
	const [prefixes] = useConfig<string[]>('navigation.linking.prefixes');

	const { initialState, isReady, onStateChange } = usePersistentState();

	if (!isReady) {
		return <LoadingState />;
	}

	const linking: LinkingOptions<any> = {
		config: createLinkingConfigs(navigator.routes, contextPack),
		prefixes: [Linking.createURL('/'), ...prefixes],
		getStateFromPath: (path, options) => {
			const getStateFromPathConfig = BB.Configs.getValue('navigation.linking.getStateFromPath');
			const defaultState = getStateFromPath(path, options);

			return getStateFromPathConfig
				? getStateFromPathConfig(defaultState, path, options)
				: defaultState;
		},
		getPathFromState: (state, options?) => {
			const getPathFromStateConfig = BB.Configs.getValue('navigation.linking.getPathFromState');
			const path = getPathFromState(state, options);

			return getPathFromStateConfig
				? getPathFromStateConfig(path, state, options)
				: path;
		},
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
