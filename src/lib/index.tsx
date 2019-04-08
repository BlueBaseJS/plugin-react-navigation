// import {
// 	// NavigationActions,
// 	SceneView,
// 	SwitchRouter,
// 	createNavigator,
// } from '@react-navigation/core';
// import { View, getComponent } from '@bluebase/core';
// import React from 'react';

// import stack from 'react-navigation-stack';

// const createStackNavigator = stack.createStackNavigator;
export {
  createSwitchNavigator,
  createSwitchNavigator as createStackNavigator,
	createSwitchNavigator as createMaterialTopTabNavigator,
	createSwitchNavigator as createBottomTabNavigator,
	createSwitchNavigator as createDrawerNavigator,
} from '@react-navigation/core';

// export { createSwitchNavigator, createStackNavigator } from 'react-navigation';

export {
  createBrowserApp as createContainer,
} from '@react-navigation/web';


// export const createStackNavigator = (args: any, configs: any = {}) => {
// 	const router = SwitchRouter(args);

// 	// const previousGetActionForPathAndParams = router.getActionForPathAndParams;
// 	// const defaultGetStateForAction = router.getStateForAction;

// 	// Object.assign(router, {
// 	// 	getActionForPathAndParams(path: any, params: any) {
// 	// 		// if (
// 	// 		// 	path === 'my/custom/path' &&
// 	// 		// 	params.magic === 'yes'
// 	// 		// ) {
// 	// 		// 	// returns a profile navigate action for /my/custom/path?magic=yes
// 	// 		// 	return NavigationActions.navigate({
// 	// 		// 		routeName: 'Profile',
// 	// 		// 		action: NavigationActions.navigate({
// 	// 		// 			// This child action will get passed to the child router
// 	// 		// 			// ProfileScreen.router.getStateForAction to get the child
// 	// 		// 			// navigation state.
// 	// 		// 			routeName: 'Friends',
// 	// 		// 		}),
// 	// 		// 	});
// 	// 		// }

// 	// 		const result = previousGetActionForPathAndParams(path, params);

// 	// 		if (!result) {
// 	// 			console.error('Boom! 💥');
// 	// 		} else {
// 	// 			console.info('getActionForPathAndParams', result);
// 	// 		}

// 	// 		return result;
// 	// 	},

// 	// 	getStateForAction: (action: any, state: any) => {
// 	// 		const defaultState = defaultGetStateForAction(action, state);

// 	// 		console.log('getStateForAction', { action, state });
// 	// 		if (defaultState.index === 0 && action.routeName !== 'Home' && action.routeName !== undefined) {
// 	// 			return {
// 	// 				...defaultState,
// 	// 				index: 2,
// 	// 			};
// 	// 		}

// 	// 		return defaultState;
// 	// 	}
// 	// });

// 	return createNavigator(
// 		StackView,
// 		router,
// 		{
// 			...configs,
// 			navigationOptions: configs.defaultNavigationOptions || {}
// 		}
// 	);
// };


// // const MyStack = createSwitchNavigator({ ... });

// const ScreenHeader = getComponent('ScreenHeader');

// class StackView extends React.Component<any> {
// 	// static router = {
// 	// 	...MyStack.router,
// 	// 	getStateForAction: (action, lastState) => {
//   //     // check for custom actions and return a different navigation state.
// 	// 		return MyStack.router.getStateForAction(action, lastState);
// 	// 	},
// 	// };
// 	// componentDidUpdate(lastProps) {
//   //   // Navigation state has changed from lastProps.navigation.state to this.props.navigation.state
// 	// }
// 	render() {
// 		const { descriptors, navigation, navigationConfig } = this.props;
// 		const { headerMode, header } = navigationConfig;

// 		const activeKey = navigation.state.routes[navigation.state.index].key;
// 		const descriptor = descriptors[activeKey];

// 		const options = descriptor.options;

// 		return (
//       <View style={{ flex: 1 }}>
// 				{
// 					// Header
// 					headerMode !== 'none'
// 					? React.createElement(header || ScreenHeader, options)
// 					: null
// 				}
//         <SceneView
//           component={descriptor.getComponent()}
//           navigation={descriptor.navigation}
//         />
//       </View>
// 		);
// 	}
// }
