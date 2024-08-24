// src/navigation/Router.ts
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screen/Home';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
