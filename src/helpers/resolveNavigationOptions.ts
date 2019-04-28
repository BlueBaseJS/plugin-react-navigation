import { NavigationScreenComponent } from 'react-navigation';
import { navigationToActionObject } from './navigationToActionObject';

export function resolveNavigationOptions (navOptions: NavigationScreenComponent['navigationOptions']) {

	if (!navOptions) {
		return;
	}

	if (typeof navOptions !== 'function') {
		return navOptions;
	}

	return ({ navigation, ...others }: any) => navOptions({
		navigation: navigationToActionObject(navigation),
		...others
	});
}
