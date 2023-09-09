const mockedNavigation: any = {
	addListener: jest.fn(),
	closeDrawer: jest.fn(),
	dangerouslyGetParent: jest.fn(),
	dismiss: jest.fn(),
	dispatch: jest.fn(),
	getParam: jest.fn(),
	goBack: jest.fn(),
	isFocused: jest.fn(),
	navigate: jest.fn(),
	openDrawer: jest.fn(),
	pop: jest.fn(),
	popToTop: jest.fn(),
	push: jest.fn(),
	replace: jest.fn(),
	setParams: jest.fn(),
	toggleDrawer: jest.fn(),
};

const mockedRoute = {
	index: 0,
	isTransitioning: false,
	key: 'kjdkj',
	name: 'Home',
	params: { foo: 'bar' },
	path: '/',
	routes: [
		{
			index: 1,
			isTransitioning: false,
			key: 'jsdfl',
			path: '/settings',
			routeName: 'Settings',
			routes: [],
		},
	],
};

jest.mock('@react-navigation/native', () => {
	const actual = jest.requireActual('@react-navigation/native');
	return {
		...actual,

		useNavigation: () => mockedNavigation,
		useRoute: () => mockedRoute,
	};
});

import { BlueBaseApp } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';

import Plugin from '../../../';
import { ScreenView } from '../ScreenView';

describe('ScreenView', () => {
	it('should render SettingsScreen', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;
		const children: any = jest.fn().mockReturnValue(null);

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<ScreenView
					route={{
						name: 'Settings',
						path: '/',
						screen: SettingsScreen,

						options: {
							title: 'Settings',
						},
					}}
					// eslint-disable-next-line react/jsx-no-bind
					ScreenComponent={SettingsScreen}
				>
					{children}
				</ScreenView>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ScreenView);
		expect(wrapper.find(SettingsScreen).exists()).toBe(true);
	});
});
