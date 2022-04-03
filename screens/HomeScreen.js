import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
    const navigation = useNavigation();
    const userEmail = auth.currentUser?.email;

    const handleSignout = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login");
            })
            .catch(err => alert(err.message))
    }
    return (
        <View style={styles.container}>
            <Text>Email: {userEmail}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("AddProduct")}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    fab: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: '#0782F9',
        borderRadius: 100,
    },
    fabText: {
        color: 'white',
        fontWeight: '100',
        fontSize: 36,
    },
})