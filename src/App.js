import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app';
import 'firebase/auth';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: 'AIzaSyBe74nyu2lz-9o1H0_CnHmHd0kCOczd_nw',
				authDomain: 'auth-95faf.firebaseapp.com',
				databaseURL: 'https://auth-95faf.firebaseio.com',
				projectId: 'auth-95faf',
				storageBucket: 'auth-95faf.appspot.com',
				messagingSenderId: '924318516662'
			});
		}

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Button onPress={() => firebase.auth().signOut()}>
						Log Out
					</Button>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner size="large" />;
		}		
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
