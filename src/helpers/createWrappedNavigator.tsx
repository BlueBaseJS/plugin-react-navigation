import React from 'react';
import { navigationConverterHoc } from './navigationConverterHoc';

/**
 * Wraps a Navigator in a Wrapper Component
 * @param Navigator
 * @param Wrapper
 */
export const createWrappedNavigator = (Navigator: any, Wrapper: React.ComponentType<any>) => {
	const WrappedNavigator: React.ComponentType<any> = navigationConverterHoc((props: any) => (
		<Wrapper {...props}>
			<Navigator {...props} navigation={props.realNavigation} />
		</Wrapper>
	));

	(WrappedNavigator as any).router = Navigator.router;

	return WrappedNavigator;
};
