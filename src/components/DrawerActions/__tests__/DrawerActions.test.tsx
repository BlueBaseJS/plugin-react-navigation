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

import { DrawerActions } from '../DrawerActions';
import React from 'react';
import { mount } from 'enzyme';

describe('DrawerActions tests', () => {
	it('should check props', async () => {
		const children = jest.fn().mockReturnValue(null);

		mount(<DrawerActions children={children} />);

		expect(children).toHaveBeenCalledTimes(1);
		expect(children).toHaveBeenCalledWith(mockedNavigation);
	});
});
