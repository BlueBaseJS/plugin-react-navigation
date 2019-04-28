import { BlueBaseContext, IntlConsumer, Theme, ThemeConsumer } from '@bluebase/core';
import { NavigationProps, NavigatorProps } from '@bluebase/components';
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

	private Router?: React.ComponentType<any>;

	componentWillMount() {

		// navigator prop from BlueBase
		const { styles, navigator } = this.props;

		// Build global default NavigationOptions
		const defaultNavigationOptions: NavigatorProps = {
			...styles,
		};

		// Create a React Navigation container component
		this.Router = createContainer(createNavigator( navigator, defaultNavigationOptions, this.context));
	}

	render() {

		const Router = this.Router;

		// Render it!
		return Router 
		? (
			<ThemeConsumer>
			{({ theme }) => (
				<IntlConsumer>
				{(intl) => (
					<Router screenProps={{ BB: this.context, theme, intl }} />
				)}
				</IntlConsumer>
			)}
			</ThemeConsumer>
		)
		: null;
	}
}

(Navigation as any).defaultStyles = (theme: Theme) => ({

	defaultNavigationOptions: {
		headerBackTitleStyle: {
			color: theme.palette.primary.contrastText,
		},
		headerStyle: {
			backgroundColor: theme.palette.primary.main,
			borderBottomWidth: 0,
			...theme.elevation(4)
		},
		headerTitleStyle: {
			color: theme.palette.primary.contrastText,
		},

		headerTintColor: theme.palette.primary.contrastText,
	},

	cardStyle: {
		backgroundColor: theme.palette.background.default,
	},

	tabBarOptions: {
		// labelStyle: {
		// 	fontSize: 12,
		// },

		style: {
			backgroundColor: theme.palette.primary.main,
			zIndex: 2000,
			...theme.elevation(4),
		},

		// tabStyle: {
		// 	width: 100,
		// },

		indicatorStyle: {
			backgroundColor: theme.palette.secondary.main,
		},
	},
});
