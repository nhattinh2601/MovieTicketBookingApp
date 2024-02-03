/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text
        style={{
          fontSize: 30,
          color: '#000000',
          fontWeight: 'bold',
          letterSpacing: 1,
        }}
      >Welcome</Text>
    </View>
  );
}



export default App;
