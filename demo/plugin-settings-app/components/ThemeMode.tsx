import { List } from '@bluebase/components';
import { useTheme } from '@bluebase/core';
import React, { useCallback } from 'react';

export const ThemeMode = () => {
	const { theme, changeMode } = useTheme();

	const onPress = useCallback(() => {
		changeMode(theme.mode === 'dark' ? 'light' : 'dark');
	}, [theme.mode]);

	return (
		<List.Item
			title="Theme Mode"
			description={theme.mode === 'light' ? 'Light' : 'Dark'}
			onPress={onPress}
		/>
	);
};
