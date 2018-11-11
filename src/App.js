import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';

class App extends Component {
	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyBe74nyu2lz-9o1H0_CnHmHd0kCOczd_nw',
			authDomain: 'auth-95faf.firebaseapp.com',
			databaseURL: 'https://auth-95faf.firebaseio.com',
			projectId: 'auth-95faf',
			storageBucket: 'auth-95faf.appspot.com',
			messagingSenderId: '924318516662'
		});
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				<Text>An app</Text>
			</View>
		);
	}
}

export default App;
