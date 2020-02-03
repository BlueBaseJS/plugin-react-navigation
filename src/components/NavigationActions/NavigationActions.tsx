import { useNavigation, useRoute } from '@react-navigation/native';

import { NavigationActionsProps } from '@bluebase/components';
import { navigationToActionObject } from '../../helpers';

/**
 * NavigationActions (Legacy)
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const NavigationActions: React.ComponentType<NavigationActionsProps> = ({ children }) => {
	const navigation = useNavigation();
	const route = useRoute();

	return children(navigationToActionObject(navigation, route)) as any;
};
