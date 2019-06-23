// https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828
import 'react-native-gesture-handler';

// tslint:disable: object-literal-sort-keys
import {
	HomeScreen,
	SettingsDetailScreen,
	SettingsScreen,
	Tab1Screen,
	Tab2Screen,
} from './Screens';

import { Noop } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';

const plugin = createPlugin({
	key: 'settings',
	name: 'Settings',

	components: {
		HomeScreen,
	},

	routes: [
		{
			name: 'Settings',
			path: '/',
			exact: true,
			screen: SettingsScreen,
			navigationOptions: {
				title: 'Settings',
			},
		},
		{
			name: 'WrappedSettings',
			path: '/wrapped',
			// exact: true,
			screen: Noop,
			navigationOptions: {
				title: 'Settings',
			},

			navigator: {
				type: 'stack',

				routes: [
					{
						name: 'Tab1',
						path: 't1',
						exact: true,
						screen: Tab1Screen,
						navigationOptions: {
							title: 'Tab A',
						},
					},
					{
						name: 'Tab2',
						path: 't2',
						exact: true,
						screen: Tab2Screen,
						navigationOptions: {
							title: 'Tab B',
						},
					},
				],
			},
		},
		{
			name: 'SettingsTabs',
			path: 'tabs',
			screen: Noop,

			// TODO: test initial route here
			navigator: {
				headerMode: 'none',
				type: 'tab',
				routes: [
					{
						name: 'Tab1',
						path: 't1',
						exact: true,
						screen: Tab1Screen,
						navigationOptions: {
							title: 'Tab A',
						},
					},
					{
						name: 'Tab2',
						path: 't2',
						exact: true,
						screen: Tab2Screen,
						navigationOptions: {
							title: 'Tab B',
						},
					},
				],
			},
			navigationOptions: {
				title: 'Settings Tabs',
			},
		},
		{
			name: 'SettingsBottomTabs',
			path: 'btabs',
			navigator: {
				type: 'bottom-tab',
				routes: [
					{
						name: 'BTab1',
						path: 'bt1',
						exact: true,
						screen: Tab1Screen,
						navigationOptions: {
							title: 'BTab A',
						},
					},
					{
						name: 'BTab2',
						path: 'bt2',
						exact: true,
						screen: Tab2Screen,
						navigationOptions: {
							title: 'BTab B',
						},
					},
				],
			},
			navigationOptions: {
				title: 'Settings Tabs',
			},
		},
		{
			name: 'SettingsDrawer',
			path: 'drawer',

			navigator: {
				type: 'drawer',

				drawerType: 'slide',

				contentOptions: {
					activeTintColor: '#e91e63',
					itemsContainerStyle: {
						marginVertical: 0,
					},
					iconContainerStyle: {
						opacity: 1,
					},
				},

				routes: [
					{
						name: 'DTab1',
						path: 'dt1',
						exact: true,
						screen: Tab1Screen,
						navigationOptions: {
							title: 'DTab A',
							// drawerLockMode: 'locked-open',
						},
					},
					{
						name: 'DTab2',
						path: 'Dt2',
						exact: true,
						screen: Tab2Screen,
						navigationOptions: {
							title: 'DTab B',
						},
					},
				],
			},
			navigationOptions: {
				title: 'Settings Tabs',
			},
		},
		{
			name: 'SettingsDetail',
			path: '/:id',
			screen: SettingsDetailScreen,
			navigationOptions: {
				title: 'Settings Detail',
			},
		},
	],
});

export default {
	...plugin,
};
