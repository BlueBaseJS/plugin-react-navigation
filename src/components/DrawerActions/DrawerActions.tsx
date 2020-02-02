import { DrawerActionsObject, DrawerActionsProps } from '@bluebase/components';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { ReactElement } from 'react';

/**
 * DrawerActions (Legacy)
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const DrawerActions = withNavigation(
	(props: DrawerActionsProps & NavigationInjectedProps) => {
		// (props: DrawerActionsProps & NavigationInjectedProps) => {
		// Extract props
		const {
			// This is passed by the consumer of this component
			children,
			// We extract this from the "withNavigation" hoc
			navigation,
		} = props;

		const noop = () => {
			return;
		};

		const { openDrawer = noop, closeDrawer = noop, toggleDrawer = noop } = navigation;

		const actions: DrawerActionsObject = {
			closeDrawer,
			openDrawer,
			toggleDrawer,
		};

		// Pass actions the object on to the children
		return children(actions) as ReactElement;
	}
);
