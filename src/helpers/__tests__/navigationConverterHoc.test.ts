import {
	Tab1Screen,
} from '../../../bluebase/expo/apps/plugin-settings-app/Screens';
import { navigationConverterHoc } from '../navigationConverterHoc';
import { shallow } from 'enzyme';


describe('navigationConverterHoc', () => {
	it('should create HOC of Component with navigation', () => {
		const Component = navigationConverterHoc(Tab1Screen)({ navigation: {
			dangerouslyGetParent: jest.fn(),
			router: {
				getActionForPathAndParams: jest.fn(),
				getComponentForRouteName: jest.fn(),
				getComponentForState: jest.fn(),
				getPathAndParamsForState: jest.fn(),
				getScreenOptions: jest.fn(),
				getStateForAction: jest.fn(),
			},
			state: {
				params: { foo: 'bar' },
			}
		}});
		const wrapper = shallow(
			Component
		);
		expect(wrapper).toBeTruthy();
	});

	it('should create HOC of Component with no navigation', () => {
		const Component = navigationConverterHoc(Tab1Screen)({});
		const wrapper = shallow(
			Component
		);
		expect(wrapper).toBeTruthy();
	});

});