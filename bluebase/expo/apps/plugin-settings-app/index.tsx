// https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828
import 'react-native-gesture-handler';

import { ComponentState, Noop } from '@bluebase/components';
// tslint:disable: object-literal-sort-keys
import {
	HomeScreen,
	SettingsDetailScreen,
	SettingsScreen,
	Tab1Screen,
	Tab2Screen,
} from './Screens';
import { Text, View } from 'react-native';

import { DrawerTab1Screen } from './Screens/DrawerTab1';
import { DrawerTab2Screen } from './Screens/DrawerTab2';
import React from 'react';
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
			// navigationOptions: {
			// },

			options: {
				title: 'Settings',
				presentation: 'modal',
			},
		},
		{
			name: 'WrappedSettings',
			path: '/wrapped',
			// exact: true,
			screen: ({ children }: any) => (
				<View style={{ backgroundColor: 'rgba(0,255,0,.2)', paddingVertical: 50, flex: 1 }}>
					<Text>Wrapper</Text>
					{children}
				</View>
			),

			navigationOptions: {
				header: null,
			},

			navigator: {
				type: 'stack',

				routes: [
					{
						name: 'Tab1',
						path: 't1',
						exact: true,

						screen: () => <ComponentState title="Wrapped" description="This screen is wrapped" />,

						navigationOptions: {
							title: 'Wrapped Screen',
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

			navigationOptions: {
				title: 'Drawer Demo',
			},

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
						screen: DrawerTab1Screen,
						navigationOptions: {
							title: 'DTab A',
							// drawerLockMode: 'locked-open',
						},
					},
					{
						name: 'DTab2',
						path: 'Dt2',
						exact: true,
						screen: DrawerTab2Screen,
						navigationOptions: {
							title: 'DTab B',
						},
					},
				],
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
