import { BootOptions } from '@bluebase/core';
import { BottomTabNavigator } from './BottomTab/BottomTabNavigator';
import { BottomTabScreen } from './BottomTab/BottomTabScreen';
import { DrawerNavigator } from './Drawer/DrawerNavigator';
import { DrawerScreen } from './Drawer/DrawerScreen';
import { MaterialBottomTabNavigator } from './MaterialBottomTab/MaterialBottomTabNavigator';
import { MaterialBottomTabScreen } from './MaterialBottomTab/MaterialBottomTabScreen';
import { MaterialTopTabNavigator } from './MaterialTopTab/MaterialTopTabNavigator';
import { MaterialTopTabScreen } from './MaterialTopTab/MaterialTopTabScreen';
import { NativeStackNavigator } from './NativeStack/NativeStackNavigator';
import { NativeStackScreen } from './NativeStack/NativeStackScreen';
import { StackNavigator } from './Stack/StackNavigator';
import { StackScreen } from './Stack/StackScreen';
// import { SwitchNavigator } from './Switch/SwitchNavigator';
// import { SwitchScreen } from './Switch/SwitchScreen';

export const components: BootOptions['components'] = {
	BottomTabNavigator: {
		applyStyles: false,
		value: BottomTabNavigator,
	},

	BottomTabScreen: {
		applyStyles: false,
		value: BottomTabScreen,
	},

	DrawerNavigator: {
		applyStyles: false,
		value: DrawerNavigator,
	},

	DrawerScreen: {
		applyStyles: false,
		value: DrawerScreen,
	},

	MaterialBottomTabNavigator: {
		applyStyles: false,
		value: MaterialBottomTabNavigator,
	},

	MaterialBottomTabScreen: {
		applyStyles: false,
		value: MaterialBottomTabScreen,
	},

	MaterialTopTabNavigator: {
		applyStyles: false,
		value: MaterialTopTabNavigator,
	},

	MaterialTopTabScreen: {
		applyStyles: false,
		value: MaterialTopTabScreen,
	},

	NativeStackNavigator: {
		applyStyles: false,
		value: NativeStackNavigator,
	},

	NativeStackScreen: {
		applyStyles: false,
		value: NativeStackScreen,
	},

	StackNavigator: {
		applyStyles: false,
		value: StackNavigator,
	},

	StackScreen: {
		applyStyles: false,
		value: StackScreen,
	},

	// SwitchNavigator: {
	// 	applyStyles: false,
	// 	value: SwitchNavigator,
	// },
	// SwitchScreen: {
	// 	applyStyles: false,
	// 	value: SwitchScreen,
	// },
};
