import { useNavigation, useRoute } from '@react-navigation/native';

import { NavigationContext } from '@bluebase/core';
import React from 'react';
import { navigationToActionObject } from '../../helpers';

/**
 * Converted navigation object to one that is recognized by BlueBase
 * and injects it into the context
 * @param param
 */
export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<NavigationContext.Provider value={navigationToActionObject(navigation, route)}>
			{children}
		</NavigationContext.Provider>
	);
};
