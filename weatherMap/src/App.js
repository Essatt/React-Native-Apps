import React from 'react';
import {
 View,
 Text,
 StyleSheet,
 MapView
} from 'react-native';

//import the weather API
import Api from './api';

const App = React.createClass({
  //initialize state
  getInitialState() {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  },

  //this is a lifecycle function that fires when the View
  //on the map moves. It returns the coordinates in the middle of the
  //mapview
  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

    //api call to get the weather data of the new coordinates
    Api(region.latitude, region.longitude)
    .then((data) => {
      console.log(data);
      this.setState(data);
    });
  },

  render() {
    return (
     <View style={styles.container}>
      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={styles.map}
      />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  terxWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

export default App;
