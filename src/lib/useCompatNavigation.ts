import { useNavigation, useRoute } from '@react-navigation/native';

/** Taken from @react-navigation/compat, they don't export this fn */
export function useCompatNavigation() {
	const navigation = useNavigation();
	const route = useRoute();

	return {
		...navigation,
		state: {
			...route,
			routeName: route.name,
		},

		getParam(paramName: any, defaultValue: any): any {
			// @ts-ignore
			const params = state.params;

			if (params && paramName in params) {
				return params[paramName];
			}

			return defaultValue;
		},
	};
	// debugger;

	// const isFirstRouteInParent = useNavigationState(state => state.routes[0].key === route.key);

	// const context = React.useRef<Record<string, any>>({});

	// return React.useMemo(
	// 	() =>
	// 		createCompatNavigationProp(
	// 			navigation,
	// 			route as any,
	// 			context.current,
	// 			isFirstRouteInParent
	// 		) as CompatNavigationProp<T>,
	// 	[isFirstRouteInParent, navigation, route]
	// );
}
