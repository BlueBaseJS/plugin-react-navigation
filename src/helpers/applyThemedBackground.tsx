import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@bluebase/core';

export const applyThemedBackground = (Component: React.ComponentType<any>) => (props: any) => {
	const { theme } = useTheme();

	return (
		<View style={{ flex: 1, backgroundColor: theme.palette.background.default }}>
			<Component {...props} />
		</View>
	);
};
