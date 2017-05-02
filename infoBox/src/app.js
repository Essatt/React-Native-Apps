import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { Header } from './components/common';
import LibraryList from './components/LibraryList';

/* This app is built using Redux to manage state
The app is a list of technologies, on which you can
click to see a description of the technology. It uses animation
*/
const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <View style={{ flex: 1 }}>
        <Header headerText="Animated List" />
        <LibraryList />
      </View>
    </Provider>
  );
};

export default App;
