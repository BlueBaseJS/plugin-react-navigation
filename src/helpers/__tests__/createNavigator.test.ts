import {
	// HomeScreen,
	// SettingsDetailScreen,
	// SettingsScreen,
	Tab1Screen,
	Tab2Screen,
} from '../../../bluebase/expo/apps/plugin-settings-app/Screens';
import { createNavigator } from '../createNavigator';
import { BlueBase } from '@bluebase/core';

const inputRoutes = {
	initialRouteName: 'Home',
	routes: [
		{ name: 'Home', path: '/', exact: true, screen: 'HomeScreen', navigationOptions: {} },
		{
			exact: true,
			name: 'Settings',
			navigationOptions: {},
			path: '/p/settings',
			screen: 'SettingsScreen',
		},
		{
			name: 'SettingsTabs',
			// TODO: test initial route here
			navigationOptions: {
				title: 'Settings Tabs',
			},
			navigator: {
				routes: [{
					exact: true,
					name: 'Tab1',
					navigationOptions: {
						title: 'Tab A',
					},
					path: 't1',
					screen: Tab1Screen,
				}, {
					exact: true,
					name: 'Tab2',
					navigationOptions: {
						title: 'Tab B',
					},
					path: 't2',
					screen: Tab2Screen,
				}],
				type: 'tab'
			},
			path: 'tabs',
		}
	],
	type: 'stack',
};


describe('createNavigator tests', () => {
	test('navigator', () => {
		createNavigator(inputRoutes, {}, {} as any) ;
		expect(createNavigator).toBeTruthy();
	});
});