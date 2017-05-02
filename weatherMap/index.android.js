//file points to App.js file. This allows to share the entire
//codebase between IOS and Android platformsst 
import {
  AppRegistry
} from 'react-native';

import App from './src/App';

AppRegistry.registerComponent('weatherMap', () => App);
