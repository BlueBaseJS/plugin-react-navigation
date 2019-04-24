import {
	// HomeScreen,
	// SettingsDetailScreen,
	// SettingsScreen,
	Tab1Screen,
	// Tab2Screen,
} from '../../../bluebase/expo/apps/plugin-settings-app/Screens';
import { navigationConverterHoc } from '../navigationConverterHoc';
import { shallow } from 'enzyme';

// const nav = {
// 	name: 'SettingsTabs',
// 	// TODO: test initial route here
// 	navigationOptions: {
// 		title: 'Settings Tabs',
// 	},
// 	navigator: {
// 		routes: [{
// 			exact: true,
// 			name: 'Tab1',
// 			navigationOptions: {
// 				title: 'Tab A',
// 			},
// 			path: 't1',
// 			screen: Tab1Screen,
// 		}, {
// 			exact: true,
// 			name: 'Tab2',
// 			navigationOptions: {
// 				title: 'Tab B',
// 			},
// 			path: 't2',
// 			screen: Tab2Screen,
// 		}],
// 		type: 'tab'
// 	},
// 	path: 'tabs',
// };


describe('navigationConverterHoc', () => {
	test('test', () => {
		const Component = navigationConverterHoc(Tab1Screen)({ navigation: {
			dangerouslyGetParent: jest.fn(),
			router: {
				getActionForPathAndParams: jest.fn(),
				getComponentForRouteName: jest.fn(),
				getComponentForState: jest.fn(),
				getPathAndParamsForState: jest.fn(),
				getScreenOptions: jest.fn(),
				getStateForAction: jest.fn(),
			},
			state: {
				params: { foo: 'bar' },
			}
		}});
		const wrapper = shallow(
			Component
		);
		// expect(wrapper).toThrow('No router found in navigation.');
		expect(wrapper).toBeTruthy();
	});

	test('test', () => {
		const Component = navigationConverterHoc(Tab1Screen)({});
		const wrapper = shallow(
			Component
		);
		// expect(wrapper).toThrow('No router found in navigation.');
		expect(wrapper).toBeTruthy();
	});

});