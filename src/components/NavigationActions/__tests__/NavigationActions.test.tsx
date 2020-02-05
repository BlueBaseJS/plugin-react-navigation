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

import { NavigationActions } from '../NavigationActions';
import React from 'react';
import { mount } from 'enzyme';

describe('NavigationActions tests', () => {
	it('should check props', async () => {
		const children = jest.fn().mockReturnValue(null);

		mount(<NavigationActions>{children}</NavigationActions>);

		expect(children).toHaveBeenCalledTimes(1);

		const result = children.mock.calls[0][0];
		expect(result.state.key).toBe('kjdkj');
		expect(result.state.routeName).toBe('Home');
		expect(result.state.params).toMatchObject({ foo: 'bar' });
		expect(result.source).toBeTruthy();
	});
});
