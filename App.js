import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home'; // Assuming Home is in the same folder
import Status from './Screens/Status'; // New Status screen

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#E3F2FD" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Status" component={Status} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
