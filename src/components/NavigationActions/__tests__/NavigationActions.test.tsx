import { NavigationContext } from '@bluebase/core';
import { mount } from 'enzyme';
import React from 'react';

import { NavigationActions } from '../NavigationActions';

describe('NavigationActions tests', () => {
	it('should check props', async () => {
		const children = jest.fn().mockReturnValue(null);
		const nav: any = {
			state: {
				name: 'Home',
				params: { foo: 'bar' },
				path: '/',
			},
		};

		mount(
			<NavigationContext.Provider value={nav}>
				<NavigationActions>{children}</NavigationActions>
			</NavigationContext.Provider>
		);

		expect(children).toHaveBeenCalledTimes(1);

		const result = children.mock.calls[0][0];
		expect(result).toMatchObject(nav);
	});
});
