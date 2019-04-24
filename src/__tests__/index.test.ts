import { BlueBase } from '@bluebase/core';
import Plugin from '../index';
// import console = require('console');

test('Plugin should be correctly registered', async () => {
	const BB = new BlueBase();
	await BB.Plugins.register(Plugin);
	// console.log(BB);

	expect(BB.Plugins.has('@bluebase/plugin-react-navigation')).toBeTruthy();
});