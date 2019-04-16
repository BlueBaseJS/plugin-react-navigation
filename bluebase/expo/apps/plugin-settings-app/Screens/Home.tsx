import { Button, ScrollView, StatusBar, View } from 'react-native';
import { H6 } from '@bluebase/components';
import React from 'react';
// tslint:disable: jsx-no-lambda

export class HomeScreen extends React.Component<any> {
	render() {
		return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
				<ScrollView style={{ flex: 1 }}>
						<H6>Apps</H6>
						<Button
							title="Setting"
							// description="Go to Settings Page"
							onPress={() => this.props.navigation.navigate('Settings')}
						/>
						<Button
							title="Setting (path)"
							// description="Go to Settings Page"
							onPress={() => this.props.navigation.navigate({ path: 'p/settings' })}
						/>
						<Button
							title="Tabs"
							onPress={() => this.props.navigation.navigate('SettingsTabs')}
						/>
						<Button
							title="Bottom Tabs"
							onPress={() => this.props.navigation.navigate('SettingsBottomTabs')}
						/>
						<Button
							title="Drawer"
							onPress={() => this.props.navigation.navigate('SettingsDrawer')}
						/>
						<Button
							title="App 1 (route name)"
							// description="Go to Settings Page"
							onPress={() => this.props.navigation.navigate('App1')}
						/>
						<Button
							title="App 1 (path)"
							// description="Go to Settings Page"
							onPress={() => this.props.navigation.navigate({ path: 'p/app-1?foo=bar' })}
						/>
				</ScrollView>
      </View>
		);
	}
}
