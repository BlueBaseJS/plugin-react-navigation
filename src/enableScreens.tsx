import { enableScreens } from 'react-native-screens';

declare const global: any;

if (!global.__expo) {
	enableScreens();
}
