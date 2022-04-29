import './enableScreens';

import { createPlugin } from '@bluebase/core';

import { DrawerActions, Navigation, Navigator, ScreenView } from './components';
import { VERSION } from './version';

export default createPlugin({
	description: 'Use React Navigation in BlueBase apps!',
	key: '@bluebase/plugin-react-navigation',
	name: 'React Navigation',
	version: VERSION,

	components: {
		// HeaderBackButton: HeaderBackButton,

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
