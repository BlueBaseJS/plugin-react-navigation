const configs = require('@bluebase/code-standards/.eslintrc');

module.exports = {
	...configs,
	env: {
		...configs.env,
		jest: true,
	},
	rules: {
		...configs.rules,
		'@typescript-eslint/interface-name-prefix': 0,
	},
};
