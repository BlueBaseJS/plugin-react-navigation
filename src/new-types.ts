/* eslint-disable max-len */
import { BlueBase, IntlContextData, MaybeThunk, ThemeContextData } from '@bluebase/core';
import { BottomTabNavigationOptions as BaseBottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import {
	DefaultNavigatorOptions,
	EventMapBase,
	NavigationState,
	ParamListBase,
	RouteConfig as BaseRouteConfig,
	RouteProp
} from '@react-navigation/core';
import { DrawerNavigationOptions as BaseDrawerNavigationOptions } from '@react-navigation/drawer';
import {
	MaterialBottomTabNavigationOptions as BaseMaterialBottomTabNavigationOptions
} from '@react-navigation/material-bottom-tabs';
import {
	MaterialTopTabNavigationOptions as BaseMaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { NativeStackNavigationOptions as BaseNativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StackNavigationOptions as BaseStackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

// //// //
// Base //
// //// //

export type RouteType = 'bottom-tabs' | 'drawer' | 'material-bottom-tabs' | 'material-top-tabs' | 'native-stack' | 'stack';

export interface BlueBaseContextPack {
	BB: BlueBase;
	themes: ThemeContextData;
	intl: IntlContextData;
}

export type CustomRouteConfig = BaseRouteConfig<ParamListBase, keyof ParamListBase, NavigationState, {}, EventMapBase> & {
	type: RouteType | string;

	/** Screen component */
	screen?: React.ComponentType<any> | string;

	/** URL */
	path?: string;

	/** Should route match exact path pattern? */
	exact?: boolean;

	/** Child Navigator */
	navigator?: NavigatorProps;

	// options?: NavigationOptions | ((props: {
	// 	route: RouteProp<ParamListBase, keyof ParamListBase>;
	// 	navigation: any;
	// }, ctx: BlueBaseContextPack) => NavigationOptions);
};

export type CustomNavigatorConfig<RouteConfigObject, NavigationOptions> = Omit<DefaultNavigatorOptions<ParamListBase, NavigationState, NavigationOptions, EventMapBase>, 'children'> & {
	type: RouteType;

	/**
	 * Routes
	 */
	routes: MaybeThunk<RouteConfigObject[]>;

	/**
	 * Default options for all screens under this navigator.
	 */
		screenOptions?: NavigationOptions | ((props: {
		route: RouteProp<ParamListBase>;
		navigation: any;
	}, ctx: BlueBaseContextPack) => NavigationOptions);

	/**
	 * Default options specified by the navigator.
	 * It receives the custom options in the arguments if a function is specified.
	 */
	defaultScreenOptions?: NavigationOptions | ((props: {
		route: RouteProp<ParamListBase>;
		navigation: any;
		options: NavigationOptions;
	}, ctx: BlueBaseContextPack) => NavigationOptions);
};

// ///////////////////// //
// Bottom Tabs Navigator //
// ///////////////////// //

export type BottomTabNavigationOptions = BaseBottomTabNavigationOptions & {
};

export type BottomTabRouteConfig = CustomRouteConfig & {
	options?: BottomTabNavigationOptions | ((props: {
		route: RouteProp<ParamListBase, keyof ParamListBase>;
		navigation: any;
	}, ctx: BlueBaseContextPack) => BottomTabNavigationOptions);
};

export type BottomTabNavigatorConfig = CustomNavigatorConfig<BottomTabRouteConfig, BottomTabNavigationOptions> & {
	type: 'bottom-tabs';
};

// //////////////// //
// Drawer Navigator //
// //////////////// //

export type DrawerNavigationOptions = BaseDrawerNavigationOptions & {
};

export type DrawerRouteConfig = CustomRouteConfig & {
	options?: DrawerNavigationOptions | ((props: {
		route: RouteProp<ParamListBase, keyof ParamListBase>;
		navigation: any;
	}, ctx: BlueBaseContextPack) => DrawerNavigationOptions);
};

export type DrawerNavigatorConfig = CustomNavigatorConfig<DrawerRouteConfig, DrawerNavigationOptions> & {
	type: 'drawer';
};

// /////////////////////////// //
// MaterialBottomTab Navigator //
// /////////////////////////// //

export type MaterialBottomTabNavigationOptions = BaseMaterialBottomTabNavigationOptions & {
};

export type MaterialBottomTabRouteConfig = CustomRouteConfig & {
	options?: MaterialBottomTabNavigationOptions | ((props: {
		route: RouteProp<ParamListBase, keyof ParamListBase>;
		navigation: any;
	}, ctx: BlueBaseContextPack) => MaterialBottomTabNavigationOptions);
};

export type MaterialBottomTabNavigatorConfig = CustomNavigatorConfig<MaterialBottomTabRouteConfig, MaterialBottomTabNavigationOptions> & {
	type: 'material-bottom-tabs';
};

// //////////////////////// //
// MaterialTopTab Navigator //
// //////////////////////// //

export type MaterialTopTabNavigationOptions = BaseMaterialTopTabNavigationOptions & {
};

export type MaterialTopTabRouteConfig = CustomRouteConfig & {
	options?: MaterialTopTabNavigationOptions | ((props: {
		route: RouteProp<ParamListBase, keyof ParamListBase>;
		navigation: any;
	}, ctx: BlueBaseContextPack) => MaterialTopTabNavigationOptions);
};

export type MaterialTopTabNavigatorConfig = CustomNavigatorConfig<MaterialTopTabRouteConfig, MaterialTopTabNavigationOptions> & {
	type: 'material-top-tabs';
};

// ///////////////////// //
// NativeStack Navigator //
// ///////////////////// //

export type NativeStackNavigationOptions = BaseNativeStackNavigationOptions & {
};

export type NativeStackRouteConfig = CustomRouteConfig & {
	options?: NativeStackNavigationOptions | ((props: {
		route: RouteProp<ParamListBase, keyof ParamListBase>;
		navigation: any;
	}, ctx: BlueBaseContextPack) => NativeStackNavigationOptions);
};

export type NativeStackNavigatorConfig = CustomNavigatorConfig<NativeStackRouteConfig, NativeStackNavigationOptions> & {
	type: 'native-stack';
};

// /////////////// //
// Stack Navigator //
// /////////////// //

export type StackNavigationOptions = BaseStackNavigationOptions & {
};

export type StackRouteConfig = CustomRouteConfig & {
	options?: StackNavigationOptions | ((props: {
		route: RouteProp<ParamListBase, keyof ParamListBase>;
		navigation: any;
	}, ctx: BlueBaseContextPack) => StackNavigationOptions);
};

export type StackNavigatorConfig = CustomNavigatorConfig<StackRouteConfig, StackNavigationOptions> & {
	type: 'stack';
};

// ///////// //
// Navigator //
// ///////// //

export type RouteConfig =
	BottomTabRouteConfig |
	DrawerRouteConfig |
	MaterialBottomTabRouteConfig |
	MaterialTopTabRouteConfig |
	NativeStackRouteConfig |
	StackRouteConfig;

export type NavigatorProps =
	BottomTabNavigatorConfig |
	DrawerNavigatorConfig |
	MaterialBottomTabNavigatorConfig |
	MaterialTopTabNavigatorConfig |
	NativeStackNavigatorConfig |
	StackNavigatorConfig;

/**
 * Props for the Router component
 */
export interface NavigationProps {
	[key: string]: any;
	navigator: NavigatorProps;
}

// const {goBack,navigate, setOptions, setParams, reset} = useNavigation()