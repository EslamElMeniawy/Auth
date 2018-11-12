import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from '@firebase/app';
import 'firebase/auth';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {
	state = {
		email: '',
		password: '',
		error: '',
		loading: false
	};

	onButtonPress() {
		const { email, password } = this.state;
		this.setState({ error: '', loading: true });

		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				firebase.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFail.bind(this));
			});
	}

	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			error: '',
			loading: false
		});
	}

	onLoginFail() {
		this.setState({
			error: 'Authentication Failed.',
			loading: false
		});
	}

	renderError() {
		if (this.state.error === '') {
			return null;
		}

		return (
			<Text style={styles.errorTextStyle}>
				{this.state.error}
			</Text>
		);
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log In
			</Button>
		);
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input 
						label="Email"
						placeholder="user@gmail.com"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>
				</CardSection>

				<CardSection>
					<Input 
						label="Password"
						placeholder="password"
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						secureTextEntry
					/>
				</CardSection>

				{this.renderError()}

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;
