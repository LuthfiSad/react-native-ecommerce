import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../../screen/Home';
import FavoriteScreen from '../../screen/Favorite';
import CartScreen from '../../screen/Cart';
import ProfileScreen from '../../screen/Profile';
import ProductDetailScreen from '../../screen/ProductDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Favorite') {
          iconName = 'heart-outline';
        } else if (route.name === 'Cart') {
          iconName = 'cart-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }

        return (
          <Ionicons name={iconName as string} size={size} color={color} />
        );
      },
      tabBarActiveTintColor: '#fff',
      tabBarActiveBackgroundColor: '#4C76A3',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 60,
        borderTopWidth: 0,
        elevation: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
    })}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Favorite"
      component={FavoriteScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
