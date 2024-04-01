import { NavigationContext } from '@bluebase/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';

import { navigationToActionObject } from './navigationToActionObject';

/**
 * Converted navigation object to one that is recognized by BlueBase
 * and injects it into the context
 * @param param
 */
export const NavigationProvider = (props: { children: React.ReactNode }) => {
	const { children } = props;
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<NavigationContext.Provider value={navigationToActionObject(navigation as any, route)}>
			{children}
		</NavigationContext.Provider>
	);
};

NavigationProvider.displayName = 'NavigationProvider';
