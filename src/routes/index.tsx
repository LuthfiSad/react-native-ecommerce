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
import LoginScreen from '../../screen/Auth/Login';
import RegisterScreen from '../../screen/Auth/Register';
import ChangeProfileScreen from '../../screen/ChangeProfile';
import AddressScreen from '../../screen/AddressScreen';
import VoucherScreen from '../../screen/VoucherScreen';

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
      tabBarItemStyle: {
        paddingVertical: 8,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        // paddingBottom: 5,
      },
    })}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Favorite"
      component={FavoriteScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{headerShown: false}}
    />
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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeProfile"
        component={ChangeProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Voucher"
        component={VoucherScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
