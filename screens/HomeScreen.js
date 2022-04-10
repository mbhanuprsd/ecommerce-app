import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsPage from './home/ProductsPage';
import ProfilePage from './home/ProfilePage';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LiveChatPage from './home/LiveChatPage';
import AppContext from "../utils/AppContext";
import { auth } from '../utils/FirebaseUtil';
import AddProduct from './home/AddProduct';
import CartPage from './home/CartPage';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const [cart, setCart] = React.useState([])

    return (
        <AppContext.Provider value={{
            cart, setCart
        }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Products') {
                            iconName = focused
                                ? 'dropbox'
                                : 'inbox';
                        } else if (route.name === 'Cart') {
                            iconName = focused ? 'shopping-cart' : 'shopping-cart';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'user-circle' : 'user-o';
                        } else if (route.name === 'Add Product') {
                            iconName = focused ? 'plus-square' : 'plus-square-o';
                        } else {
                            iconName = 'wechat';
                        }

                        // You can return any component that you like here!
                        return <FontAwesome name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'teal',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Product List'
                    }}
                    name="Products"
                    component={ProductsPage} />
                <Tab.Screen
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Cart',
                        tabBarBadge: cart.length
                    }}
                    name="Cart"
                    component={CartPage} />
                <Tab.Screen
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Live Chat'
                    }}
                    name="Chat"
                    component={LiveChatPage} />
                <Tab.Screen
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Profile'
                    }}
                    name="Profile"
                    component={ProfilePage} />
                {auth?.currentUser?.email === 'bhanu@test.com'
                    && <Tab.Screen
                        options={{
                            headerTitleAlign: 'center',
                            title: 'Add Product'
                        }}
                        name="Add Product"
                        component={AddProduct} />}
            </Tab.Navigator>
        </AppContext.Provider>
    )
}

export default HomeScreen