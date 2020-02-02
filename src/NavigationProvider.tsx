import { NavigationContext } from '@bluebase/core';
import React from 'react';
import { navigationToActionObject } from './helpers/navigationToActionObject';
import { useCompatNavigation } from './lib';

/**
 * Converted navigation object to one that is recognized by BlueBase
 * and injects it into the context
 * @param param
 */
export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
	const v4Navigation = useCompatNavigation();
	const navigation = navigationToActionObject(v4Navigation);

	return <NavigationContext.Provider value={navigation}>{children}</NavigationContext.Provider>;
};
