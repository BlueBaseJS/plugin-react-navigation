import { BlueBase, BlueBaseApp } from '@bluebase/core';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text, View } from 'react-native';

import Plugin from '../../index';
import { createNavigatorScreenComponent } from '..';

describe('createNavigatorScreenComponent', () => {
	it('should return create and render a screen component', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;
		const BB = new BlueBase();
		await BB.boot({ plugins: [Plugin] });

		const Screen = createNavigatorScreenComponent(
			{
				name: 'Settings',
				path: '/',
				screen: SettingsScreen,

				options: {
					title: 'Settings',
				},
			},
			BB
		);

		const Stack = createStackNavigator();
		const wrapper = mount(
			<BlueBaseApp>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="test" component={Screen} />
					</Stack.Navigator>
				</NavigationContainer>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, Screen);
		expect(wrapper.find(SettingsScreen).exists()).toBe(true);
	});

	it('should create and render a nested navigator', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;

		const BB = new BlueBase();
		await BB.boot({ plugins: [Plugin] });

		const Screen = createNavigatorScreenComponent(
			{
				name: 'WrappedSettings',
				path: '/wrapped',
				// exact: true,

				navigator: {
					type: 'stack',

					routes: [
						{
							name: 'Settings',
							path: '/',
							screen: SettingsScreen,

							options: {
								title: 'Settings',
							},
						},
					],
				},
			},
			BB
		);

		const Stack = createStackNavigator();
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="test" component={Screen} />
					</Stack.Navigator>
				</NavigationContainer>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, Screen);
		expect(wrapper.find(SettingsScreen).exists()).toBe(true);
	});

	it('should create and render a nested navigator wrapped in a custom component', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;
		const Wrapper = ({ children }: any) => (
			<View style={{ backgroundColor: 'green' }}>{children}</View>
		);

		const BB = new BlueBase();
		await BB.boot({ plugins: [Plugin] });

		const Screen = createNavigatorScreenComponent(
			{
				name: 'WrappedSettings',
				path: '/wrapped',
				// exact: true,
				screen: Wrapper,

				navigator: {
					type: 'stack',

					routes: [
						{
							name: 'Settings',
							path: '/',
							screen: SettingsScreen,

							options: {
								title: 'Settings',
							},
						},
					],
				},
			},
			BB
		);

		const Stack = createStackNavigator();
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="test" component={Screen} />
					</Stack.Navigator>
				</NavigationContainer>
			</BlueBaseApp>
		);

		await waitForElement(wrapper as any, Screen);
		expect(wrapper.find(Wrapper).exists()).toBe(true);
		expect(wrapper.find(SettingsScreen).exists()).toBe(true);
	});
});
