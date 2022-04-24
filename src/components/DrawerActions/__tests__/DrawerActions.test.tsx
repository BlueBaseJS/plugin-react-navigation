const mockedNavigation = {
	closeDrawer: jest.fn(),
	openDrawer: jest.fn(),
	toggleDrawer: jest.fn(),
};

jest.mock('@react-navigation/native', () => {
	const actual = jest.requireActual('@react-navigation/native');
	return {
		...actual,

		useNavigation: () => mockedNavigation,
	};
});

import { mount } from 'enzyme';
import React from 'react';

import { DrawerActions } from '../DrawerActions';

describe('DrawerActions tests', () => {
	it('should check props', async () => {
		const children = jest.fn().mockReturnValue(null);

		mount(<DrawerActions>{children}</DrawerActions>);

		expect(children).toHaveBeenCalledTimes(1);
		expect(children).toHaveBeenCalledWith(mockedNavigation);
	});
});
