module.exports = function(api) {
	api.cache(true);
	return {
		presets: ['@bluebase/code-standards/babel.config'],
		plugins: [
			'react-native-reanimated/plugin',
			[
				// https://github.com/facebook/metro/issues/646#issuecomment-799174473
				'@babel/plugin-transform-react-jsx',
				{
					'runtime': 'automatic'
				}
			]
		],
		env: {
			test: {
				plugins: [
					[
						'istanbul',
						{
							exclude: ['**/*.test.{ts,tsx,js,jsx}', 'tests/*.{ts,tsx,js,jsx}'],
						},
					],
				],
			},
		},
	};
};
