import { NavigationActionsProps } from '@bluebase/components';
import { navigationToActionObject } from '../../helpers';
import { useCompatNavigation } from '../../lib';

/**
 * NavigationActions (Legacy)
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const NavigationActions = ({ children }: NavigationActionsProps) => {
	const v4Navigation = useCompatNavigation();
	const navigation = navigationToActionObject(v4Navigation);
	return children(navigation);
};
