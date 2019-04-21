import { NavigationOptions, NavigationProps } from '@bluebase/components';
import { BlueBaseContext, Theme, resolveThunk } from '@bluebase/core';
import React from 'react';
import { createContainer } from './lib/index';
import { createNavigator } from './helpers/createNavigator';

/**
 * Navigation
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export class Navigation extends React.Component<NavigationProps> {

	static contextType = BlueBaseContext;

	render() {

		// navigator prop from BlueBase
		const { styles, navigator } = this.props;

		// Build global default NavigationOptions
		const defaultNavigationOptions: NavigationOptions = {
			...styles,
			...resolveThunk(navigator.defaultNavigationOptions || {})
		};

		// Create a React Navigation container component
		const Router = createContainer(createNavigator( navigator, defaultNavigationOptions, this.context));

		// Render it!
		return <Router />;
	}
}

(Navigation as any).defaultStyles = (theme: Theme) => ({
	headerBackTitleStyle: {
		color: theme.palette.primary.contrastText,
	},
	headerStyle: {
		backgroundColor: theme.palette.primary.main,
		...theme.elevation(4)
	},
	headerTitleStyle: {
		color: theme.palette.primary.contrastText,
	},

	headerTintColor: theme.palette.primary.contrastText,
});
