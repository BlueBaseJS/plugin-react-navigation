import { BlueBase, BlueBaseContext, IntlConsumer, ThemeConsumer } from '@bluebase/core';

import { NavigationContainer } from 'react-navigation';
import { NavigationProps } from '@bluebase/components';
import React from 'react';
import { createContainer } from './lib/index';
import { createNavigator } from './helpers/createNavigator';

/**
 * Navigation
 * This serves as an entry point where BlueBase passes routes and navigation
 * configs to this component.
 */
export class Navigation extends React.Component<NavigationProps> {
	static contextType: React.Context<BlueBase> = BlueBaseContext;

	private Router?: NavigationContainer;

	componentWillMount() {
		// navigator prop from BlueBase
		const { navigator } = this.props;

		// Create a React Navigation container component
		this.Router = createContainer(createNavigator(navigator, this.context));
	}

	render() {
		const Router = this.Router;
		const { navigator, ...rest } = this.props;

		// Render it!
		return Router ? (
			<ThemeConsumer>
				{({ theme }) => (
					<IntlConsumer>
						{intl => <Router screenProps={{ BB: this.context, theme, intl, ...rest }} />}
					</IntlConsumer>
				)}
			</ThemeConsumer>
		) : null;
	}
}
