import { useBlueBase, useIntl, useTheme } from '@bluebase/core';

import { BlueBaseContextPack } from './new-types';

export const useBlueBaseContextPack = () => {
	const BB = useBlueBase();
	const themes = useTheme();
	const intl = useIntl();
	const screenProps: BlueBaseContextPack = { BB, intl, themes };

	return screenProps;
};
