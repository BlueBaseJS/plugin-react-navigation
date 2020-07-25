import { useBlueBase, useIntl, useTheme } from '@bluebase/core';

import { ScreenProps } from '../types';

export const useScreenProps = () => {
	const BB = useBlueBase();
	const themes = useTheme();
	const intl = useIntl();
	const screenProps: ScreenProps = { BB, intl, themes, theme: themes.theme };

	return screenProps;
};
