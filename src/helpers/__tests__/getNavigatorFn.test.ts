import {
	createBottomTabNavigator,
	createDrawerNavigator,
	createMaterialTopTabNavigator,
	createStackNavigator,
	createSwitchNavigator,
} from '../../lib';

import {
	getNavigatorFn
} from '../getNavigatorFn';

describe('Get Naivgator Functions Tests', () => {
	it('it should return createSwitchNavigator by default', () => {
		expect(getNavigatorFn()).toBe(createSwitchNavigator);
	});
	it('it should return createSwitchNavigator', () => {
		expect(getNavigatorFn('switch')).toBe(createSwitchNavigator);
	});
	it('it should return createStackNavigator on stack input', () => {
		expect(getNavigatorFn('stack')).toBe(createStackNavigator);
	});
	it('it should return createBottomTabNavigator', () => {
		expect(getNavigatorFn('bottom-tab')).toBe(createBottomTabNavigator);
	});
	it('it should return createDrawerNavigator', () => {
		expect(getNavigatorFn('drawer')).toBe(createDrawerNavigator);
	});
	it('it should return createMaterialTopTabnavigator', () => {
		expect(getNavigatorFn('tab')).toBe(createMaterialTopTabNavigator);
	});
});