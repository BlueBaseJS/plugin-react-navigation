import {
	HomeScreen,
	// SettingsDetailScreen,
	// SettingsScreen,
	Tab1Screen,
	Tab2Screen,
} from '../../../bluebase/expo/apps/plugin-settings-app/Screens';
import { createWrappedNavigator } from '../createWrappedNavigator';
// import { navigationConverterHoc } from '../navigationConverterHoc';

const nav = {
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
};

describe('createWrappedNavigator', () => {
	test('test', () => {
		createWrappedNavigator(nav.navigator, HomeScreen);
		expect(createWrappedNavigator).toBeTruthy();
		// jest.mock('navigationConverterHoc', () => jest.fn());
		// createWrappedNavigator(nav.navigator, HomeScreen).WrappedNavigator = jest.fn();
		// const q = jest.mock('../navigationConverterHoc', () => jest.fn());
	});
	// test('navigationConverterHoc call', () => {
	// 	// jest.mock('navigationConverterHoc', () => jest.fn());
	// 	// navigationConverterHoc = jest.fn().mockReturnValue('');
	// 	// const data = new createWrappedNavigator(nav.navigator, HomeScreen);
	// 	// expect(data.WrappedNavigator).toBeCalled();
	// });
});