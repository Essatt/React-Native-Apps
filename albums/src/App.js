import React from 'react';
import { View } from 'react-native';
import Header from './components/header';
import AlbumList from './components/AlbumList';

//This app is an instagram style shopping app from which you can
//buy Taylor swift albums from amazon. Axios library was used to make
//http(s) requests
const App = () => (
  <View style={{ flex: 1 }}>
    <Header headerText={'Albums'} />
    <AlbumList />
  </View>
);

export default App;
