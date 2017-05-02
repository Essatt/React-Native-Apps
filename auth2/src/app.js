import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import FirebaseApi from './FirebaseApi.json';

//this app is a authorization module demonstration
//utilizing firebase

class App extends Component {
  //initialize state
  state = { loggedIn: null }

  //firebase API, not added for security purposes
  //firebase API key is free to get from Firebase console
  //if anyone wants to try the code out
  componentDidMount() {
    firebase.initializeApp(FirebaseApi);

    //change the state according to logins in firebase
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedin: false });
      }
      console.log(this.state);
    });
  }

  //choose what to render:
  // - log out button or login button
  // - loading sign
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
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default App;
