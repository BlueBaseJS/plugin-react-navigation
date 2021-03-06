import './enableScreens';

import { DrawerActions, Navigation, Navigator, ScreenView } from './components';

import { HeaderBackButton } from '@react-navigation/stack';
import { VERSION } from './version';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	description: 'Use React Navigation in BlueBase apps!',
	key: '@bluebase/plugin-react-navigation',
	name: 'React Navigation',
	version: VERSION,

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

		ScreenView: {
			applyStyles: false,
			value: ScreenView,
		},
	},
});
