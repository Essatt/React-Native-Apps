import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  //initialize state
  state= {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    //deconstruct state to easly access email and password values
    const { email, password } = this.state;

    //clear any leftover error message or loading signal
    this.setState({ error: '', loading: true });

    //try logging in with the given email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      //if successfull go to onLoginSuccess function
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        //if login unsuccessfull, create a new user with given values
        //firebase wont allow duplicate emails, the only way to successfully
        //create new user is with a new email address, same email with
        //wrong password will result with program going to the onLoginFail
        //function. If successfull it will go to onLoginSuccess function.
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  // when Authentication fails, clear the password,
  // hide the loading sign and show an error message
  onLoginFail() {
    this.setState({
      password: '',
      loading: false,
      error: 'Authentication Failed'
    });
  }

  //on successfull authentication clear the form
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
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
            placeholder='user@gmail.com'
            label='Email'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

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
    justifyContent: 'center',
    color: 'red'
  }
};

export default LoginForm;
