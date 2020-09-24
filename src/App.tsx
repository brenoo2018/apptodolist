import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import AppProvider from './hooks';

import Routes from './routes';

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#292931" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#292931' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
