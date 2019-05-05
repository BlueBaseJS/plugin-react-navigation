import {
	SettingsScreen,
	Tab1Screen,
} from '../../../bluebase/expo/apps/plugin-settings-app/Screens';
import { BlueBase } from '@bluebase/core';
import Plugin from '../../index';
import { createNavigator } from '../createNavigator';

const inputRoutes = {
	initialRouteName: 'Home',
	routes: [
		{
			exact: true,
			name: 'Settings',
			navigationOptions: {},
			path: '/p/settings',
			screen: SettingsScreen,
		},
	],
	type: 'stack',
};

describe('createNavigator tests', () => {
	it('should test if there is no navigator in routes', async () => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);
		createNavigator(inputRoutes, {} as any, BB);
		expect(createNavigator).toBeTruthy();
	});
	it('should test if there is no navigator in routes', async () => {
		const BB = new BlueBase();
		await BB.Plugins.register(Plugin);

		inputRoutes.routes.push({
			name: 'Settings',
			path: '/p/settings',
			screen: SettingsScreen,
		} as any);

		createNavigator(inputRoutes, {} as any, BB);
		expect(createNavigator).toBeTruthy();
	});

	it('should test if there is navigator an screen in routes', () => {
		inputRoutes.routes.push({
			name: 'SettingsTabs',
			screen: SettingsScreen,
			navigator: {
				routes: [{
					name: 'Tab1',
					navigationOptions: {
						title: 'Tab A',
					},
					path: 't1',
					screen: Tab1Screen,
				}],
			},
			path: 'tabs',
		} as any);
		createNavigator(inputRoutes, {} as any, {} as any);
		expect(createNavigator).toBeTruthy();
	});

	it('should test if there is navigator only in routes', () => {
		inputRoutes.routes.push({
			name: 'SettingsTabs',
			navigator: {
				routes: [{
					name: 'Tab1',
					navigationOptions: {
						title: 'Tab A',
					},
					path: 't1',
					screen: Tab1Screen,
				}],
			},
			path: 'tabs',
		} as any);
		createNavigator(inputRoutes, {} as any, {} as any);
		expect(createNavigator).toBeTruthy();
	});
	it('should test if there is only screen component in routes', () => {
		inputRoutes.routes.push({
			navigator: {
				routes: [{ screen: SettingsScreen }]
			}
		} as any);
		createNavigator(inputRoutes, {} as any, {} as any);
		expect(createNavigator).toBeTruthy();
	});
});