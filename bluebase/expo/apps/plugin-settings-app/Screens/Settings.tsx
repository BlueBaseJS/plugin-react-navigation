import { Body1, NavigationActions } from '@bluebase/components';
import { Button, View } from 'react-native';

import React from 'react';
import { ThemeMode } from '../components/ThemeMode';

export class SettingsScreen extends React.Component {
	static navigationOptions: any = {
		title: 'Static Nav Opts Title',
	};
	render() {
		return (
			<View style={{ flexGrow: 1, justifyContent: 'center' }}>
				<ThemeMode />
				<NavigationActions>
					{({ navigate }: any) => (
						<Button
							title="Home"
							// eslint-disable-next-line react/jsx-no-bind
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
