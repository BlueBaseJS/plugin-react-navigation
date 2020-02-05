import './enableScreens';

import { DrawerActions, Navigation, Navigator } from './components';

import { HeaderBackButton } from '@react-navigation/stack';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	description: 'Use React Navigation in BlueBase apps!',
	key: '@bluebase/plugin-react-navigation',
	name: 'React Navigation',
	version: '1.0.0',

	components: {
		HeaderBackButton: HeaderBackButton,

		DrawerActions: {
			applyStyles: false,
			value: DrawerActions as any,
		},

		Navigation: {
			applyStyles: false,
			value: Navigation,
		},

		Navigator: {
			applyStyles: false,
			value: Navigator,
		},
	},
});
