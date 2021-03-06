/* eslint-disable react/display-name */
import React from 'react';
import { Text } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	key: 'app-1',
	name: 'D App 1',

	icon: {
		name: 'delete',
		type: 'icon',
	},

	routes: {
		name: 'App1',
		path: '',
		screen: () => <Text>App1</Text>,
	},
});
