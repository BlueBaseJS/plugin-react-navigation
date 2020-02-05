import { resolveNavigationOptions } from '../resolveNavigationOptions';
// import {navigationToActionObject} from '../navigationToActionObject';


describe('resolveNavigationOptions', () => {
	it('should check if types of navOption', () => {
		const nav = {
			name: 'SettingsTabs',
			navigator: {
				routes: [{
					name: 'Tab1',
					navigationOptions: {
						title: 'Tab A',
					},
					path: 't1',
					screen: "Tab1Screen",
				}],
			},
			path: 'tabs',
		}
		expect(resolveNavigationOptions(null as any)).toEqual(undefined);
		expect(resolveNavigationOptions(() => ({}))).toBeTruthy();

		expect(resolveNavigationOptions(nav)).toBeTruthy();
		const navG = ({ navigation }: any) => ({
			title: navigation.params.title,
		});
		// navigationToActionObject = jest.fn();
		resolveNavigationOptions(navG);
		// expect(navigationToActionObject).toBeCalled();

	});
});