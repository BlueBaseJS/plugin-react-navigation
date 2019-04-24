import {
	// HomeScreen,
	// SettingsDetailScreen,
	// SettingsScreen,
	Tab1Screen,
	Tab2Screen,
} from '../../bluebase/expo/apps/plugin-settings-app/Screens';
import { BlueBaseApp } from '@bluebase/core';
import { Navigation } from '../Navigation';
import Plugin from '../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// const Navigation=getComponent('Navigation');
const nav = {
	name: 'SettingsTabs',
	// TODO: test initial route here
	navigationOptions: {
		title: 'Settings Tabs',
	},
	navigator: {
		routes: [{
			exact: true,
			name: 'Tab1',
			navigationOptions: {
				title: 'Tab A',
			},
			path: 't1',
			screen: Tab1Screen,
		}, {
			exact: true,
			name: 'Tab2',
			navigationOptions: {
				title: 'Tab B',
			},
			path: 't2',
			screen: Tab2Screen,
		}],
		type: 'tab'
	},
	path: 'tabs',
};

describe('Navigation tests', () => {
	test('Test', async () => {
		const wrapper = mount(
		<BlueBaseApp plugins={[Plugin]}>
			<Navigation navigator={nav.navigator} />
		</BlueBaseApp>
		);
		await waitForElement(wrapper, Navigation);
	});
});