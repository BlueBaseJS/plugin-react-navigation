import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { navigationToActionObject } from './navigationToActionObject';

export function resolveNavigationOptions(
	navOptions: NavigationStackScreenComponent['navigationOptions']
) {
	if (!navOptions) {
		return;
	}

	if (typeof navOptions !== 'function') {
		return navOptions;
	}

	return ({ navigation, ...others }: any) =>
		navOptions({
			navigation: navigationToActionObject(navigation),
			...others,
		});
}
