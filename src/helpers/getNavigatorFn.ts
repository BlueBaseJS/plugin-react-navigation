import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from '../lib/index';

export function getNavigatorFn(type?: string) {
	switch (type) {
		case 'stack':
			return createStackNavigator;

		case 'tab':
		case 'top-tab':
			return createMaterialTopTabNavigator;

		case 'bottom-tab':
			return createBottomTabNavigator;

		case 'drawer':
			return createDrawerNavigator;

		default:
			return createSwitchNavigator;
	}
}