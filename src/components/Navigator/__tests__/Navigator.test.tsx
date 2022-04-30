import { BlueBaseApp } from '@bluebase/core';
import { NavigationContainer } from '@react-navigation/native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';

import { ScreenView } from '../../ScreenView';
import { Navigator } from '..';

describe('Navigator', () => {
	it('should return create and render a screen component', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;

		const wrapper = mount(
			<BlueBaseApp components={{ Navigator, ScreenView }}>
				<NavigationContainer>
					<Navigator
						type="stack"
						routes={[
							{
								name: 'Settings',
								path: '/',
								screen: SettingsScreen,
							},
						]}
					/>
				</NavigationContainer>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, SettingsScreen);
		expect(wrapper.find(SettingsScreen).exists()).toBe(true);
	});

	it('should not render anything for unknown navigators', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;

		const wrapper = mount(
			<BlueBaseApp components={{ Navigator }}>
				<NavigationContainer>
					<Navigator
						type={'unknown' as any}
						routes={[
							{
								name: 'Settings',
								path: '/',
								screen: SettingsScreen,
							},
						]}
					/>
				</NavigationContainer>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Navigator);
		expect(wrapper.find(SettingsScreen).exists()).toBe(false);
	});
});
