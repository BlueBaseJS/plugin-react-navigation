import { NavigationActions } from '@bluebase/components';
import React from 'react';
import { Button, Text, View } from 'react-native';

import { ThemeMode } from '../components/ThemeMode';

export class SettingsDetailScreen extends React.Component {
	render() {
		// console.log('settings details screen props', this.props);
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Settings Details Screen</Text>
				<NavigationActions>
					{({ navigate }: any) => (
						<Button
							title="Home"
							// eslint-disable-next-line react/jsx-no-bind
							onPress={() => navigate('Home')}
						/>
					)}
				</NavigationActions>
				<ThemeMode />
			</View>
		);
	}
}
