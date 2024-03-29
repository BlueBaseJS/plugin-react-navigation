import { DrawerActionsObject, DrawerActionsProps } from '@bluebase/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

/**
 * DrawerActions (Legacy)
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const DrawerActions: React.ComponentType<DrawerActionsProps> = ({
	children,
}: DrawerActionsProps) => {
	const { openDrawer, closeDrawer, toggleDrawer } = useNavigation() as any;

	const actions: DrawerActionsObject = {
		closeDrawer,
		openDrawer,
		toggleDrawer,
	};

	return children(actions) as any;
};
