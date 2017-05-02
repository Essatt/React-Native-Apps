// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';
import FirebaseApi from './FirebaseApi.json';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(FirebaseApi);
  }
  render() {
    //the second argument is for initial state for a redux application
    //for example you can pre-populate the email and password if you have them
    //third argument is for "store enhancers"
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
          <Router />
      </Provider>
    );
  }
}

export default App;
