import { BlueBaseApp } from '@bluebase/core';
import { NavigationNativeContainer } from '@react-navigation/native';
import { Navigator } from '..';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('Navigator', () => {
	it('should return create and render a screen component', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;

		const wrapper = mount(
			<BlueBaseApp components={{ Navigator }}>
				<NavigationNativeContainer>
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
				</NavigationNativeContainer>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, SettingsScreen);
		expect(wrapper.find(SettingsScreen).exists()).toBe(true);
	});

	it('should not render anything for unknown navigators', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;

		const wrapper = mount(
			<BlueBaseApp components={{ Navigator }}>
				<NavigationNativeContainer>
					<Navigator
						type="unknown"
						routes={[
							{
								name: 'Settings',
								path: '/',
								screen: SettingsScreen,
							},
						]}
					/>
				</NavigationNativeContainer>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Navigator);
		expect(wrapper.find(SettingsScreen).exists()).toBe(false);
	});
});
