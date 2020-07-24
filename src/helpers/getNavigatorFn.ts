import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import createSwitchNavigator from './createSwitchNavigator';

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

	switch: createSwitchNavigator,
};

const ComponentMap: { [key: string]: any } = {};

/**
 * Get Navigator by type (V5)
 * @param type
 * @param BB
 */
export const getNavigatorFn = (id: string, type?: string) => {
	if (ComponentMap[id] === undefined) {
		const fn = NavigatorMap[type || 'stack'];
		ComponentMap[id] = fn ? fn() : undefined;
	}

	return ComponentMap[id];
};
