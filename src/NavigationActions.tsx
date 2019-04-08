import { NavigationActionsProps } from '@bluebase/core';
import { NavigationInjectedProps } from 'react-navigation';
import { navigationToActionObject } from './helpers/navigationToActionObject';
import { withNavigation } from '@react-navigation/core';

/**
 * NavigationActions
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const NavigationActions: React.ComponentType<NavigationActionsProps>
= withNavigation((props: NavigationActionsProps & NavigationInjectedProps) => {

	// Extract props
	const {
		// This is passed by the consumer of this component
		children,
		// We extract this from the "withNavigation" hoc
		navigation
	} = props;

	// Convert React Navigation's "navigation" prop to BlueBase's NavigationActionsObject
	const actions = navigationToActionObject(navigation);

	// Pass actions the object on to the children
	return children(actions);
});
