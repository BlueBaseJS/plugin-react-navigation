import { BlueBaseApp } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import Plugin from '../../../index';
import { Navigation } from '../Navigation';

describe('Navigation tests', () => {
	it('should check props', async () => {
		const wrapper = mount(<BlueBaseApp plugins={[Plugin]} />);
		await waitForElement(wrapper as any, Navigation);
		expect(wrapper.find(Navigation).exists()).toBe(true);
	});
});
