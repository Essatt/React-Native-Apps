//file point to App.js file. This allows to share the entire
//codebase between IOS and Android platforms
import { AppRegistry } from 'react-native';
import App from './src/app';

AppRegistry.registerComponent('auth2', () => App);
