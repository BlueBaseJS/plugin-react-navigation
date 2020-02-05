import { Platform, StatusBar } from 'react-native';
import { Theme, merge } from '@bluebase/core';

import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { navigationToActionObject } from './navigationToActionObject';

declare const global: any;
export const resolveNavigationOptions = (
	navOptions: NavigationStackScreenComponent['navigationOptions']
) => (options: any) => {
	const theme: Theme = options.screenProps.theme;

	const defaultOptions: any = defaultNavigationOptions(theme);

	if (!navOptions) {
		return defaultOptions;
	}

	if (typeof navOptions !== 'function') {
		return merge(defaultOptions, navOptions);
	}

	return merge(
		defaultOptions,
		navOptions({
			...options,
			navigation: navigationToActionObject(options.navigation),
		})
	);
};

const defaultNavigationOptions = (theme: Theme) => ({
	headerBackTitleStyle: {
		color: theme.palette.primary.contrastText,
	},
	headerStyle: {
		backgroundColor: theme.palette.primary.main,
		borderBottomWidth: 0,
		marginTop: Platform.OS === 'android' && !global.__expo ? StatusBar.currentHeight : 0,
		...theme.elevation(4),
	},
	headerTitleStyle: {
		color: theme.palette.primary.contrastText,
	},

	headerTintColor: theme.palette.primary.contrastText,
	// defaultNavigationOptions: {
	// },

	////// End of navoptions
	// cardStyle: {
	// 	backgroundColor: theme.palette.background.default,
	// },

	// tabBarOptions: {
	// 	// labelStyle: {
	// 	// 	fontSize: 12,
	// 	// },

	// 	style: {
	// 		backgroundColor: theme.palette.primary.main,
	// 		zIndex: 2000,
	// 		...theme.elevation(4),
	// 	},

	// 	// tabStyle: {
	// 	// 	width: 100,
	// 	// },

	// 	indicatorStyle: {
	// 		backgroundColor: theme.palette.secondary.main,
	// 	},
	// },
});
