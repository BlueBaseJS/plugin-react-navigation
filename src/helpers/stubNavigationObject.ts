import { NavigationActionsObject } from '@bluebase/components';

const stubAction = () => {
	return;
};

export const stubNavigationObject: NavigationActionsObject = {
	getParam: stubAction,
	goBack: stubAction,
	navigate: stubAction,
	pop: stubAction,
	push: stubAction,
	replace: stubAction,
	setParams: stubAction,
	source: null,
	state: {
		key: '',
		params: {},
		routeName: '',
		url: '',
	},
};
