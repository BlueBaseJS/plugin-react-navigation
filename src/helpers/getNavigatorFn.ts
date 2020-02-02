import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

const NavigatorMap: { [key: string]: any } = {
	'bottom-tab': createBottomTabNavigator,
	'bottom-tabs': createBottomTabNavigator,

	drawer: createDrawerNavigator,

	'bottom-navigation': createMaterialBottomTabNavigator,
	'material-bottom-tab': createMaterialBottomTabNavigator,
	'material-bottom-tabs': createMaterialBottomTabNavigator,

	tab: createMaterialTopTabNavigator,
	tabs: createMaterialTopTabNavigator,

	'native-stack': createNativeStackNavigator,

	stack: createStackNavigator,

	switch: createStackNavigator,
};

/**
 * Get Navigator by type (V5)
 * @param type
 * @param BB
 */
export const getNavigatorFn = (type: string) => {
	const fn = NavigatorMap[type];
	return !!fn ? fn() : undefined;
};