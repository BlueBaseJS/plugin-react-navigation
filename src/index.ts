import { Navigation } from './Navigation';
import { NavigationActions } from './NavigationActions';
import { createPlugin } from '@bluebase/core';
import { useScreens } from 'react-native-screens';

// For performance
// https://reactnavigation.org/docs/en/react-native-screens.html
useScreens();

export default createPlugin({
	description: 'Use React Navigation in BlueBase apps!',
	key: '@bluebase/plugin-react-navigation',
	name: 'React Navigation',
	version: '1.0.0',

	components: {
		Navigation,
		NavigationActions,
	}
});
