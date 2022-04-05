import { StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Splash' component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
        <Stack.Screen options={{ headerTitleAlign: 'center', title: 'E-Commerce App' }} name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
