import { NavigationActionsProps } from '@bluebase/components';
import { useNavigation } from '@bluebase/core';
import React from 'react';

/**
 * NavigationActions (Legacy)
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const NavigationActions: React.ComponentType<NavigationActionsProps> = ({
	children,
}: NavigationActionsProps) => {
	const navigation = useNavigation();

	return children(navigation) as any;
};

NavigationActions.displayName = 'NavigationActions';