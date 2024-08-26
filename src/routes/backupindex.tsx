import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../../screen/Home';
import FavoriteScreen from '../../screen/Favorite';
import CartScreen from '../../screen/Cart';
import ProfileScreen from '../../screen/Profile';
import ProductDetailScreen from '../../screen/ProductDetail';
import ScreenWrapper from '../components/section/ScreenWrapper';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
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

        return <Ionicons name={iconName as string} size={size} color={color} />;
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
    <Tab.Screen name="Home" options={{headerShown: false}}>
      {() => (
        <ScreenWrapper>
          <HomeScreen />
        </ScreenWrapper>
      )}
    </Tab.Screen>
    <Tab.Screen name="Favorite" options={{headerShown: false}}>
      {() => (
        <ScreenWrapper>
          <FavoriteScreen />
        </ScreenWrapper>
      )}
    </Tab.Screen>
    <Tab.Screen name="Cart" options={{headerShown: false}}>
      {() => (
        <ScreenWrapper>
          <CartScreen />
        </ScreenWrapper>
      )}
    </Tab.Screen>
    <Tab.Screen name="Profile" options={{headerShown: false}}>
      {() => (
        <ScreenWrapper>
          <ProfileScreen />
        </ScreenWrapper>
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
