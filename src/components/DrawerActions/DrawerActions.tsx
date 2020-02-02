import { DrawerActionsObject, DrawerActionsProps } from '@bluebase/components';

import { useNavigation } from '@react-navigation/native';

/**
 * DrawerActions (Legacy)
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const DrawerActions = ({ children }: DrawerActionsProps) => {
	const noop = () => {
		return;
	};

	const { openDrawer = noop, closeDrawer = noop, toggleDrawer = noop } = useNavigation() as any;

	const actions: DrawerActionsObject = {
		closeDrawer,
		openDrawer,
		toggleDrawer,
	};

	return children(actions);
};
