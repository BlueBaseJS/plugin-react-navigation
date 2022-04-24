/* eslint-disable react/jsx-no-bind */
import { List } from '@bluebase/components';
import { useTheme } from '@bluebase/core';
import React from 'react';

// tslint:disable: jsx-no-lambda

export const ThemeMode = () => {
	const { changeTheme, theme } = useTheme();

	return (
		<List.Item
			title="Theme Mode"
			description={theme.mode === 'light' ? 'Light' : 'Dark'}
			onPress={() =>
				theme.mode === 'light' ? changeTheme('bluebase-dark') : changeTheme('bluebase-light')
			}
		/>
	);
};
