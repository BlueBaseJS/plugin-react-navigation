import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from '../lib';

/**
 * Return react navigation's createNavigator based on the navigator type
 * @param type
 */
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