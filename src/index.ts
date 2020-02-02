import './helpers/useScreen';

import { DrawerActions } from './DrawerActions';
import { HeaderBackButton } from 'react-navigation-stack';
import { Navigation } from './Navigation';
import { Navigator } from './Navigator';
import { components } from './components';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	description: 'Use React Navigation in BlueBase apps!',
	key: '@bluebase/plugin-react-navigation',
	name: 'React Navigation',
	version: '1.0.0',

	components: {
		DrawerActions,
		HeaderBackButton,
		Navigation,
		Navigator,
		// NavigationActions,

		...components,
	},
});
