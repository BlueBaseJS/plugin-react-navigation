import { useConfig } from '@bluebase/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';

export function usePersistentState() {
	const [isReady, setIsReady] = useState(false);
	const [initialState, setInitialState] = useState();
	const [enabled] = useConfig<boolean>('navigation.persist.enabled');
	const [key] = useConfig<string>('navigation.persist.key');

	useEffect(() => {
		const restoreState = async () => {
			try {
				const initialUrl = await Linking.getInitialURL();

				// Only restore state if there's no deep link and we're not on web
				if (Platform.OS !== 'web' && initialUrl === null) {
					// Only restore state if there's no deep link and we're not on web
					const savedStateString = await AsyncStorage.getItem(key);
					const state = savedStateString
						? JSON.parse(savedStateString)
						: undefined;

					if (state !== undefined) {
						setInitialState(state);
					}
				}
			} finally {
				setIsReady(true);
			}
		};

		if (!isReady) {
			restoreState();
		}
	}, [isReady]);

	const onStateChange = useCallback(
		(newState: any) => {
			if (enabled) {
				AsyncStorage.setItem(key, JSON.stringify(newState));
			}
		},
		[enabled]
	);

	return {
		isReady: enabled ? isReady : true,
		initialState: enabled ? initialState : undefined,
		onStateChange,
	};
}
