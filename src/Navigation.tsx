import { NavigationProps, ThemeContext, ThemeContextData } from '@bluebase/core';
import React from 'react';
import { createContainer } from './lib/index';
import { createNavigator } from './helpers/createNavigator';

export class Navigation extends React.Component<NavigationProps> {

	static contextType = ThemeContext;

	render() {

		const { navigator } = this.props;
		const { theme }: ThemeContextData = this.context;

		const Router = createContainer(createNavigator(navigator, theme));
		return <Router />;
	}
}
