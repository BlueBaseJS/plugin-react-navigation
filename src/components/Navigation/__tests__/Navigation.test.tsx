import { BlueBaseApp } from '@bluebase/core';
import { Navigation } from '../Navigation';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('Navigation tests', () => {
	it('should check props', async () => {
		const wrapper = mount(<BlueBaseApp plugins={[Plugin]} />);
		await waitForElement(wrapper, Navigation);
		expect(wrapper.find(Navigation).exists()).toBe(true);
	});
});
