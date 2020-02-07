import {
	DefaultNavigatorOptions,
	createNavigatorFactory,
	useNavigationBuilder,
} from '@react-navigation/native';
import { TabNavigationState, TabRouter, TabRouterOptions } from '@react-navigation/routers';

type Props = DefaultNavigatorOptions<{}> & TabRouterOptions;

const SwitchNavigator = (props: Props) => {
	const { state, descriptors } = useNavigationBuilder<TabNavigationState, TabRouterOptions, {}, {}>(
		TabRouter,
		props
	);

	return descriptors[state.routes[state.index].key].render();
};

export default createNavigatorFactory<{}, typeof SwitchNavigator>(SwitchNavigator);
