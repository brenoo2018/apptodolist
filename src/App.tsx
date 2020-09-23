import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import Routes from './routes';

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#292931" />
    <View style={{ flex: 1, backgroundColor: '#292931' }}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
