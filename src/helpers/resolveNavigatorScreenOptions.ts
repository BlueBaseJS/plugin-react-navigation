import { NavigatorProps as CoreNavigatorProps } from '@bluebase/components';

/**
 * Given a navigator object, resolves its screen options
 * @param navigator
 * @param BB
 */
export const resolveNavigatorScreenOptions = (navigator: CoreNavigatorProps) => {
	const resolvedScreenOptions = navigator.screenOptions || navigator.defaultNavigationOptions || {};
	return resolvedScreenOptions;
};
