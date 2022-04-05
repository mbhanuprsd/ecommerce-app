import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../utils/FirebaseUtil'

const SplashScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setTimeout(() => {
                if (user) {
                    navigation.replace("Home");
                }
                else {
                    navigation.replace("Login");
                }
            }, 1000);
        })

        return unsubscribe
    }, [])

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', height:'100%'}}>
            
            <Text style={styles.text}>E-Commerce App</Text>
            <ActivityIndicator size="large" color="tomato" style={{margin:40}} />

        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 42,
        fontWeight: 800,
        margin: 20,
    }
})