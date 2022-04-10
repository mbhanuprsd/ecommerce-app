import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsPage from './home/ProductsPage';
import OrdersPage from './home/OrdersPage';
import ProfilePage from './home/ProfilePage';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LiveChatPage from './home/LiveChatPage';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Products') {
                        iconName = focused
                            ? 'dropbox'
                            : 'inbox';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'shopping-cart' : 'opencart';
                    } else if (route.name === 'Profile'){
                        iconName = focused ? 'user-circle' : 'user-o';
                    } else if (route.name === 'Movies') {
                        iconName = focused ? 'film' : 'film';
                    } else {
                        iconName = 'wechat';
                    }

                    // You can return any component that you like here!
                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'teal',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen options={{ headerTitleAlign: 'center', title: 'Product List' }} name="Products" component={ProductsPage} />
            <Tab.Screen options={{ headerTitleAlign: 'center', title: 'Orders' }} name="Orders" component={OrdersPage} />
            <Tab.Screen options={{ headerTitleAlign: 'center', title: 'Live Chat' }} name="Chat" component={LiveChatPage} />
            <Tab.Screen options={{ headerTitleAlign: 'center', title: 'Profile' }} name="Profile" component={ProfilePage} />
        </Tab.Navigator>
    )
}

export default HomeScreen