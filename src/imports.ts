import { BlueBase } from '@bluebase/core';

const NavigatorMap: { [key: string]: any } = {
	'bottom-tab': 'BottomTab',
	'bottom-tabs': 'BottomTab',

	drawer: 'Drawer',

	'bottom-navigation': 'MaterialBottomTab',
	'material-bottom-tab': 'MaterialBottomTab',
	'material-bottom-tabs': 'MaterialBottomTab',

	tab: 'MaterialTopTab',
	tabs: 'MaterialTopTab',

	'native-stack': 'NativeStack',

	stack: 'Stack',

	switch: 'Stack',
};

/**
 * Get Navigator by type (V5)
 * @param type
 * @param BB
 */
export const getNavigator = (type: string, BB: BlueBase) => {
	if (!NavigatorMap[type]) {
		return;
	}

	return {
		Navigator: BB.Components.resolveFromCache(`${NavigatorMap[type]}Navigator`),
		Screen: BB.Components.resolveFromCache(`${NavigatorMap[type]}Screen`),
	};
};
