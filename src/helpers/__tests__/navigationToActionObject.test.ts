import { NavigationActionsObject } from '@bluebase/components';
import { navigationToActionObject } from '../navigationToActionObject';

const navigation: any = {
	addListener: jest.fn(),
	closeDrawer: jest.fn(),
	dangerouslyGetParent: jest.fn(),
	dismiss: jest.fn(),
	dispatch: jest.fn(),
	getParam: jest.fn(),
	goBack: jest.fn(),
	isFocused: jest.fn(),
	navigate: jest.fn(),
	openDrawer: jest.fn(),
	pop: jest.fn(),
	popToTop: jest.fn(),
	push: jest.fn(),
	replace: jest.fn(),
	setParams: jest.fn(),
	toggleDrawer: jest.fn(),
};

const route = {
	index: 0,
	isTransitioning: false,
	key: 'kjdkj',
	name: 'Home',
	params: { foo: 'bar' },
	path: '/',
	routes: [
		{
			index: 1,
			isTransitioning: false,
			key: 'jsdfl',
			path: '/settings',
			routeName: 'Settings',
			routes: [],
		},
	],
};

describe('navigationToActionObject', () => {
	it('should check navigationToActionObject', async () => {
		expect(navigationToActionObject(navigation, route)).toBeTruthy();
	});

	it('should convert a history object to action object', () => {
		const result: NavigationActionsObject = navigationToActionObject(navigation, route);
		// expect(getTopNavigation).toBeCalled();
		expect(result.state.key).toBe('kjdkj');
		expect(result.state.routeName).toBe('Home');
		expect(result.state.params).toMatchObject({ foo: 'bar' });
		expect(result.source).toBeTruthy();
	});

	it('should check returning functions', () => {
		const result: NavigationActionsObject = navigationToActionObject(navigation, route);
		result.goBack();
		expect(result.goBack).toBeTruthy();
		result.navigate('');
		expect(result.navigate).toBeTruthy();
		result.push('');
		expect(result.push).toBeTruthy();
		result.replace('');
		expect(result.replace).toBeTruthy();
	});

	it('should check push and replace', () => {
		const nav = {
			dangerouslyGetParent: jest.fn(),
			navigate: () => ({}),
			router: {},
			state: {},
		};
		const result = navigationToActionObject(nav as any, route);
		result.push('');
		expect(result.push).toBeTruthy();
		result.replace('');
		expect(result.replace).toBeTruthy();
	});

	// it('should test execFunc', () => {
	// 	navigation.router = {
	// 		getActionForPathAndParams: jest.fn(),
	// 		getComponentForRouteName: jest.fn(),
	// 		getComponentForState: jest.fn(),
	// 		getPathAndParamsForState: jest.fn(),
	// 		getScreenOptions: jest.fn(),
	// 		getStateForAction: jest.fn(),
	// 	};

	// 	execAction(navigation.router)(
	// 		undefined as any,
	// 		navigation.state.routeName,
	// 		navigation.state.params
	// 	);
	// 	expect(execAction).toBeTruthy();

	// 	execAction(navigation.router)(
	// 		navigation.navigate,
	// 		navigation.state.routeName,
	// 		navigation.state.params
	// 	);
	// 	expect(execAction).toBeTruthy();

	// 	execAction(navigation.router)(navigation.navigate, { path: '/' }, navigation.state.params);
	// 	expect(execAction).toBeTruthy();

	// 	const err = () => {
	// 		execAction(navigation.router as any)(navigation.navigate, {} as any, navigation.state.params);
	// 	};
	// 	expect(err).toThrow('Invalid props provided to navigation action');
	// });

	// it('should test execPathAction', () => {
	// 	navigation.router = {
	// 		getActionForPathAndParams: jest.fn(),
	// 		getComponentForRouteName: jest.fn(),
	// 		getComponentForState: jest.fn(),
	// 		getPathAndParamsForState: jest.fn(),
	// 		getScreenOptions: jest.fn(),
	// 		getStateForAction: jest.fn(),
	// 	};

	// 	execPathAction(navigation.router)(navigation.navigate, '/', navigation.state.params);
	// 	expect(execPathAction).toBeTruthy();

	// 	execPathAction(navigation.router)(navigation.navigate, '/foo?a=b', navigation.state.params);
	// 	expect(execPathAction).toBeTruthy();

	// 	execPathAction(navigation.router)(undefined as any, '/', navigation.state.params);
	// 	expect(execPathAction).toBeTruthy();

	// 	navigation.router = {
	// 		getActionForPathAndParams: () => ({ routeName: 'Home' } as any),
	// 		getComponentForRouteName: jest.fn(),
	// 		getComponentForState: jest.fn(),
	// 		getPathAndParamsForState: jest.fn(),
	// 		getScreenOptions: jest.fn(),
	// 		getStateForAction: jest.fn(),
	// 	};

	// 	execPathAction(navigation.router)(navigation.navigate, '/', navigation.state.params);
	// 	expect(execPathAction).toBeTruthy();

	// 	navigation.router = {
	// 		getActionForPathAndParams: () => ({} as any),
	// 		getComponentForRouteName: jest.fn(),
	// 		getComponentForState: jest.fn(),
	// 		getPathAndParamsForState: jest.fn(),
	// 		getScreenOptions: jest.fn(),
	// 		getStateForAction: jest.fn(),
	// 	};

	// 	execPathAction(navigation.router)(navigation.navigate, '/', navigation.state.params);
	// 	expect(execPathAction).toBeTruthy();

	// 	const err = () => {
	// 		execAction(navigation.router as any)(navigation.navigate, {} as any, navigation.state.params);
	// 	};
	// 	expect(err).toThrow('Invalid props provided to navigation action');
	// });

	it('router error', () => {
		expect(navigationToActionObject(navigation, route).goBack).toBeDefined();
	});
});
