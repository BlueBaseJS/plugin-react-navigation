import { createNavigatorFactory, useNavigationBuilder } from '@react-navigation/native';
import { TabRouter } from '@react-navigation/routers';

const SwitchNavigator = (props: any) => {
	const { state, descriptors } = useNavigationBuilder(TabRouter, props);
	return descriptors[state.routes[state.index].key].render();
};

export default createNavigatorFactory(SwitchNavigator);
