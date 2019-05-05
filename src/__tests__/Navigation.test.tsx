import {
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

const nav = {
	name: 'SettingsTabs',
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
	it('should check props', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Navigation navigator={nav.navigator} styles={{ headerMode: 'none' }} />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, Navigation);
		expect(wrapper.find('Navigation').prop('navigator')).toBe(nav.navigator);
		expect(wrapper.find('Navigation').prop('styles')).toEqual({ headerMode: 'none' });
	});

	it('should check if there is no router', () => {
		const wrapper = mount(
			// <BlueBaseApp plugins={[Plugin]}>
				<Navigation navigator={{
					routes: [
						{} as any
					]
				} as any}/>
			// </BlueBaseApp>
		);
		// await waitForElement(wrapper, Navigation);
		expect(wrapper).toThrow('Please specify at least one route when configuring a navigator.');
		// expect(wrapper.find('Navigation').prop('navigator')).toBe({});
	});
});