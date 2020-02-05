import { NavigationContext, useTheme } from '@bluebase/core';

import { NavigationActions } from '../NavigationActions';
import React from 'react';
import { View } from 'react-native';

export const applyThemedBackground = (Component: React.ComponentType<any>) => (props: any) => {
	const { theme } = useTheme();

	return (
		<View style={{ flex: 1, backgroundColor: theme.palette.background.default }}>
			<Component {...props} />
		</View>
	);
};

export const applyNavigationContext = (Component: React.ComponentType<any>) => (props: any) => {
	return (
		<NavigationActions>
			{navigation => (
				<NavigationContext.Provider value={navigation}>
					<Component {...props} />
				</NavigationContext.Provider>
			)}
		</NavigationActions>
	);
};
