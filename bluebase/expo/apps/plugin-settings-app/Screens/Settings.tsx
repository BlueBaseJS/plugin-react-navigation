import { Button, Text, View } from 'react-native';

import { NavigationActions } from '@bluebase/components';
import React from 'react';

export class SettingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Static Nav Opts Title',
	};
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Settings Screen</Text>
				<NavigationActions>
					{({ navigate }: any) => (
						<Button
							title="Home"
							onPress={() =>
								navigate({ path: 'p/settings/foo?a=b' }, { name: 'General', title: 'Bar' })
							}
						/>
					)}
				</NavigationActions>
			</View>
		);
	}
}
