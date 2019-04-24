import {
	execAction,
	execPathAction,
	getTopNavigation,
	navigationToActionObject
} from '../navigationToActionObject';
import { NavigationInjectedProps } from 'react-navigation';
import { NavigationActionsObject } from '@bluebase/components';

const navigation: NavigationInjectedProps['navigation'] = {
	closeDrawer: jest.fn(),
	dismiss: jest.fn(),
	dispatch: jest.fn(),
	goBack: jest.fn(),
	navigate: jest.fn(),
	openDrawer: jest.fn(),
	toggleDrawer: jest.fn(),
	getParam: jest.fn(),
	setParams: jest.fn(),
	addListener: jest.fn(),
	push: jest.fn(),
	replace: jest.fn(),
	pop: jest.fn(),
	popToTop: jest.fn(),
	isFocused: jest.fn(),
	router: {
		getActionForPathAndParams: jest.fn(),
		getComponentForRouteName: jest.fn(),
		getComponentForState: jest.fn(),
		getPathAndParamsForState: jest.fn(),
		getScreenOptions: jest.fn(),
		getStateForAction: jest.fn(),
	},
	dangerouslyGetParent: jest.fn(),
	state: {
		index: 0,
		isTransitioning: false,
		key: 'kjdkj',
		routeName: 'Home',
		path: '/',
		params: { foo: 'bar' },
		routes: [
			{
				index: 1,
				isTransitioning: false,
				key: 'jsdfl',
				routeName: 'Settings',
				routes: [],
				path: '/settings'
			}
		],
	},
};

// const inputRoutes = {
// 	initialRouteName: 'Root',
// 	routes: [
// 		{
// 			name: 'Root',
// 			navigationOptions: { header: null },
// 			navigator: {
// 				initialRouteName: 'Home',
// 				routes: [
// 					{ name: 'Home', path: '/', exact: true, screen: 'HomeScreen', navigationOptions: {} },
// 					{
// 						exact: true,
// 						name: 'Settings',
// 						navigationOptions: {},
// 						path: '/p/settings',
// 						screen: 'SettingsScreen',
// 					},
// 					{
// 						name: 'SettingsDetail',
// 						navigationOptions: {},
// 						path: '/p/settings/:id',
// 						screen: 'SettingsDetail',
// 					},
// 				],
// 				type: 'stack',
// 			},
// 			path: '/', //
// 		},
// 	],
// 	type: 'stack',
// };

// const Routes = {
// 	hash: '',
// 	// key: ,
// 	pathname: '/p/settings/foo',
// 	search: '?a=b',
// 	state: { name: 'General', title: 'Bar' },
// 	index: 0,
// 	isTransitioning: false,
// 	key: 'u2vxal',
// 	routeName: '',
// 	// path?: string;
// 	// params?: Params;
// 	routes: []
// };

// const input: NavigationProps = {
// 	navigator: {
// 		routes: [
// 			{ name: 'Home', path: '/', exact: true, screen: 'HomeScreen', navigationOptions: {} },
// 			{
// 				exact: true,
// 				name: 'Settings',
// 				navigationOptions: {},
// 				path: '/p/settings',
// 				screen: 'SettingsScreen',
// 			},
// 			{
// 				name: 'SettingsDetail',
// 				navigationOptions: {},
// 				path: '/p/settings/:id',
// 				screen: 'SettingsDetail',
// 			}
// 		],
// 		type: 'switch'
// 	}
// 	// `	history: {} as any,
// 	// 	location,
// 	// 	match: {
// 	// 		isExact: true,
// 	// 		params: { id: 'foo' },
// 	// 		path: '/p/settings/:id',
// 	// 		url: '/p/settings/foo',
// 	// 	},
// };

describe('navigationToActionObject', () => {

	it('n', async () => {
		expect(navigationToActionObject(navigation)).toBeTruthy();
	});

	it('should convert a history object to action object', () => {

		const result: NavigationActionsObject = navigationToActionObject(navigation);
		// expect(getTopNavigation).toBeCalled();
		expect(result.state.key).toBe('kjdkj');
		expect(result.state.routeName).toBe('Home');
		expect(result.state.params).toMatchObject({ foo: 'bar' });
		expect(result.source).toBeTruthy();
	});

	it('returning functions', () => {
		const result: NavigationActionsObject = navigationToActionObject(navigation);
		expect(result.goBack).toBeTruthy();
		result.goBack();
		expect(result.navigate).toBeTruthy();
		result.navigate('');
		expect(result.push).toBeTruthy();
		result.push('');
		expect(result.replace).toBeTruthy();
		result.replace('');
	});

	it('getTopNavigation', () => {
		navigationToActionObject(navigation);
		expect(getTopNavigation).toBeTruthy();
	});
	// it('getTopNavigation with parent', () => {
	// 	// navigation.dangerouslyGetParent = () => navigation;
	// 	navigationToActionObject(navigation);
	// 	expect(getTopNavigation(navigation)).toBeCalled();
	// });

	it('execFunc', () => {
		navigation.router = {
			getActionForPathAndParams: jest.fn(),
			getComponentForRouteName: jest.fn(),
			getComponentForState: jest.fn(),
			getPathAndParamsForState: jest.fn(),
			getScreenOptions: jest.fn(),
			getStateForAction: jest.fn(),
		};

		execAction(navigation.router)(undefined as any, navigation.state.routeName, navigation.state.params);
		expect(execAction).toBeTruthy();

		execAction(navigation.router)(navigation.navigate, navigation.state.routeName, navigation.state.params);
		expect(execAction).toBeTruthy();

		execAction(navigation.router)(navigation.navigate, { path: '/' }, navigation.state.params);
		expect(execAction).toBeTruthy();


		const err = () => { execAction(navigation.router as any)(navigation.navigate, {} as any, navigation.state.params); }
		expect(err).toThrow('Invalid props provided to navigation action');

	});
	it('execPathAction', () => {
		navigation.router = {
			getActionForPathAndParams: jest.fn(),
			getComponentForRouteName: jest.fn(),
			getComponentForState: jest.fn(),
			getPathAndParamsForState: jest.fn(),
			getScreenOptions: jest.fn(),
			getStateForAction: jest.fn(),
		};

		execPathAction(navigation.router)(navigation.navigate, '/', navigation.state.params);
		expect(execPathAction).toBeTruthy();

		execPathAction(navigation.router)(navigation.navigate, '/foo?a=b', navigation.state.params);
		expect(execPathAction).toBeTruthy();

		execPathAction(navigation.router)(undefined as any, '/', navigation.state.params);
		expect(execPathAction).toBeTruthy();

		navigation.router = {
			getActionForPathAndParams: () => ({ routeName: 'Home' } as any),
			getComponentForRouteName: jest.fn(),
			getComponentForState: jest.fn(),
			getPathAndParamsForState: jest.fn(),
			getScreenOptions: jest.fn(),
			getStateForAction: jest.fn(),
		};

		execPathAction(navigation.router)(navigation.navigate, '/', navigation.state.params);
		expect(execPathAction).toBeTruthy();

		navigation.router = {
			getActionForPathAndParams: () => ({} as any),
			getComponentForRouteName: jest.fn(),
			getComponentForState: jest.fn(),
			getPathAndParamsForState: jest.fn(),
			getScreenOptions: jest.fn(),
			getStateForAction: jest.fn(),
		};

		execPathAction(navigation.router)(navigation.navigate, '/', navigation.state.params);
		expect(execPathAction).toBeTruthy();


		const err = () => { execAction(navigation.router as any)(navigation.navigate, {} as any, navigation.state.params); }
		expect(err).toThrow('Invalid props provided to navigation action');


		// expect(execAction).toReturn();
		// expect(execAction).toBe(navigation.navigate(navigation.state.routeName, navigation.state.params));

	});

	it('router error', () => {
		expect(navigationToActionObject(navigation).goBack).toBeDefined();
	});

	it('router error', () => {
		navigation.router = undefined;
		expect(() => navigationToActionObject(navigation)).toThrow('No router found in navigation.');
	});



	// 	it('should set the routeName prop to empty string, if a route object is not found', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', true);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		const result = navigationToActionObject({ ...input, match: { ...input.match, path: '//!!' } }, BB);

	// 		expect(result.state.key).toBe('u2vxal');
	// 		expect(result.state.search).toBe('?a=b');
	// 		expect(result.state.url).toBe('/p/settings/foo');
	// 		expect(result.state.routeName).toBe('');
	// 	});

	// 	it('should not set source prop if "enableSourceInNavigationActions" is false', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		const result = navigationToActionObject({ ...input, match: { ...input.match, path: '//!!' } }, BB);

	// 		expect(result.source).toBeUndefined();
	// 	});

	// 	it('should call historys push method from navigation push', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		input.history.push = jest.fn();

	// 		const result = navigationToActionObject(input, BB);

	// 		result.push('Settings', { foo: 'bar' });

	// 		expect(input.history.push).toBeCalledTimes(1);
	// 		expect(input.history.push).toBeCalledWith('/p/settings', { foo: 'bar' });
	// 	});

	// 	it('should call historys push method from navigation navigate', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		input.history.push = jest.fn();

	// 		const result = navigationToActionObject(input, BB);

	// 		result.navigate('Settings', { foo: 'bar' });

	// 		expect(input.history.push).toBeCalledTimes(1);
	// 		expect(input.history.push).toBeCalledWith('/p/settings', { foo: 'bar' });
	// 	});

	// 	it('should call historys replace method from navigation replace', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		input.history.replace = jest.fn();

	// 		const result = navigationToActionObject(input, BB);

	// 		result.replace('Settings', { foo: 'bar' });

	// 		expect(input.history.replace).toBeCalledTimes(1);
	// 		expect(input.history.replace).toBeCalledWith('/p/settings', { foo: 'bar' });
	// 	});

		// it('should call historys goBack method from navigation goBack', () => {
		// 	const BB = new BlueBase();
		// 	// BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		// 	// BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		// 	input.history.goBack = jest.fn();

		// 	const result = navigationToActionObject(input, BB);

		// 	result.goBack();

		// 	expect(input.history.goBack).toBeCalledTimes(1);
		// 	expect(input.history.goBack).toBeCalledWith();
		// });

	// 	it('should call historys go method from navigation pop with param as 0', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		input.history.go = jest.fn();

	// 		const result = navigationToActionObject(input, BB);

	// 		result.pop();

	// 		expect(input.history.go).toBeCalledTimes(1);
	// 		expect(input.history.go).toBeCalledWith(0);
	// 	});

	// 	it('should call historys go method from navigation pop with param as -5', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		input.history.go = jest.fn();

	// 		const result = navigationToActionObject(input, BB);

	// 		result.pop(5);

	// 		expect(input.history.go).toBeCalledTimes(1);
	// 		expect(input.history.go).toBeCalledWith(-5);
	// 	});

	// 	it('should call historys replace method from navigation setParams', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		input.history.replace = jest.fn();

	// 		const result = navigationToActionObject(input, BB);

	// 		result.setParams({ bar: 'bax' });

	// 		expect(input.history.replace).toBeCalledTimes(1);
	// 		expect(input.history.replace).toBeCalledWith('/p/settings/:id', { id: 'foo', bar: 'bax' });
	// 	});

	// 	it('should get param value from state through getParam method', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		const result = navigationToActionObject(input, BB);

	// 		result.getParam('id', 'hello');

	// 		expect(result.getParam('id', 'hello')).toBe('foo');
	// 	});

	// 	it('should get default param value from  getParam method if certain key does not exist in state', () => {
	// 		const BB = new BlueBase();
	// 		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
	// 		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

	// 		const result = navigationToActionObject(input, BB);

	// 		result.getParam('getting', 'hello');

	// 		expect(result.getParam('getting', 'hello')).toBe('hello');
	// 	});
});