import { useScreens } from 'react-native-screens';
declare const global: any;

export const useScreenComponent = () => {
	if (global.__expo) {
		useScreens();
	}

};