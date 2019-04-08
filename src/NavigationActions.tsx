import { NavigationActionsProps } from '@bluebase/core';
import { NavigationInjectedProps } from 'react-navigation';
import { navigationToActionObject } from './helpers/navigationToActionObject';
import { withNavigation } from '@react-navigation/core';

export const NavigationActions = withNavigation((props: NavigationActionsProps & NavigationInjectedProps) => {
	const { children, navigation } = props;
	const actions = navigationToActionObject(navigation);
	return children(actions);
});