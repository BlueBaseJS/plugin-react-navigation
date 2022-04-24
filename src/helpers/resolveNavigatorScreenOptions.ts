import { NavigatorProps as CoreNavigatorProps, NavigatorProps } from '@bluebase/components';
import { TransitionPresets } from '@react-navigation/stack';
import { Platform } from 'react-native';

export const isIosModalScreen = ({ type, mode }: NavigatorProps) => {
	if (Platform.OS === 'ios' && type === 'stack' && mode === 'modal') {
		return true;
	}

	return false;
};

/**
 * Given a navigator object, resolves its screen options
 * @param navigator
 * @param BB
 */
export const resolveNavigatorScreenOptions = (
	navigator: CoreNavigatorProps
) => {
	const resolvedScreenOptions =
		navigator.screenOptions || navigator.defaultNavigationOptions || {};
	return {
		...(isIosModalScreen(navigator) && {
			gestureEnabled: true,
			cardOverlayEnabled: true,
			...TransitionPresets.ModalPresentationIOS,
		}),
		...resolvedScreenOptions,
	};
};
