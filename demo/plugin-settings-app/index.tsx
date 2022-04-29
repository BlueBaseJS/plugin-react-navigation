/* eslint-disable react/jsx-no-bind */
// https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828
import 'react-native-gesture-handler';

import { ComponentState, Noop } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';
import React from 'react';
import { Text, View } from 'react-native';

// tslint:disable: object-literal-sort-keys
import {
	HomeScreen,
	SettingsDetailScreen,
	SettingsScreen,
	Tab1Screen,
	Tab2Screen,
} from './Screens';
import { DrawerTab1Screen } from './Screens/DrawerTab1';
import { DrawerTab2Screen } from './Screens/DrawerTab2';
import { ParamsScreen } from './Screens/Params';

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
		},
		{
			name: 'WrappedSettings',
			path: '/wrapped',
			// exact: true,

			// eslint-disable-next-line react/display-name
			screen: ({ children }: any) => (
				<View style={{ backgroundColor: 'rgba(0,255,0,.2)', paddingVertical: 50, flex: 1 }}>
					<Text>Wrapper</Text>
					{children}
				</View>
			),

			options: {
				header: () => null,
			},

			navigator: {
				type: 'stack',

				routes: [
					{
						name: 'Tab1',
						path: 'wt1',
						exact: true,

						// eslint-disable-next-line react/display-name
						screen: () => <ComponentState title="Wrapped" description="This screen is wrapped" />,

						options: {
							title: 'Wrapped Screen',
						},
					},
				],
			},
		},

		{
			name: 'NativeStack',
			path: '/native-stack',

			options: {
				headerShown: false,
				contentStyle: {
					backgroundColor: 'black',
				},
			},

			navigator: {
				type: 'native-stack',

				routes: [
					{
						name: 'Native 1',
						path: 'native1',
						exact: true,

						// eslint-disable-next-line react/display-name
						screen: (props: any) => (
							<ComponentState
								title="Title 1"
								description="This screen is in a native stack"
								actionOnPress={() => props.navigation.navigate('Native2')}
								actionTitle="Show Modal"
							/>
						),

						options: {
							// stackPresentation: 'modal',
							title: 'Native Stack 1 Screen',
						},
					},
					{
						name: 'Native2',
						path: 'native2',
						exact: true,

						// eslint-disable-next-line react/display-name
						screen: () => (
							<ComponentState title="Title 2" description="This screen is in a modal" />
						),

						options: {
							stackPresentation: 'modal',
							title: 'Native Stack 2 Screen',
						} as any,
					},
				],
			},
		},

		{
			name: 'Modal',
			path: '/modal',

			options: {
				headerShown: false,
				contentStyle: {
					backgroundColor: 'black',
				},
				presentation: 'modal'
			},

			screen: (props: any) => (
				<ComponentState
					title="Title 1"
					description="This screen is in a modal"
					actionTitle="Modal 2"
					actionOnPress={() => props.navigation.navigate('Modal2')}
				/>
			),

		},

		{
			name: 'Params',
			path: '/params',
			exact: true,
			screen: ParamsScreen,
			options: () => {
				return {
					title: 'Params',
				};
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
						options: {
							title: 'Tab A',
						},
					},
					{
						name: 'Tab2',
						path: 't2',
						exact: true,
						screen: Tab2Screen,
						options: {
							title: 'Tab B',
						},
					},
				],
			},
			options: {
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
						options: {
							title: 'BTab A',
						},
					},
					{
						name: 'BTab2',
						path: 'bt2',
						exact: true,
						screen: Tab2Screen,
						options: {
							title: 'BTab B',
						},
					},
				],
			},
			options: {
				title: 'Settings Tabs',
			},
		},
		{
			name: 'SettingsDrawer',
			path: 'drawer',

			options: {
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
						options: {
							title: 'DTab A',
							// drawerLockMode: 'locked-open',
						},
					},
					{
						name: 'DTab2',
						path: 'Dt2',
						exact: true,
						screen: DrawerTab2Screen,
						options: {
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
			options: {
				title: 'Settings Detail',
			},
		},
	],
});

export default {
	...plugin,
};
