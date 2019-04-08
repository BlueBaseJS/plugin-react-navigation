import { createPlugin } from '@bluebase/core';
import { Navigation } from './Navigation';
import { NavigationActions } from './NavigationActions';

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
