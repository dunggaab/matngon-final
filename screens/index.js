import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App'; // Import your main component
import {name as appName} from './app.json';

// Register the main component of your app
AppRegistry.registerComponent(appName, () => App);
