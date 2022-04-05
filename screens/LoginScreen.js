import { KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/core";
import { auth } from '../utils/FirebaseUtil';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation()

    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            navigation.replace("Home");
        }
    }, [user])

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Registered with " + user.email);
            })
            .catch(err => alert(err.message))
    }

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with " + user.email);
            })
            .catch(err => alert(err.message))
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with " + user.email);
            })
            .catch(err => alert(err.message))
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <Text style={styles.text}>E-commerce App</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutLineText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleGoogleSignIn}
                    style={[styles.button]}>
                    <Text style={styles.buttonText}>Sign-in with Google</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    text: {
        color: 'teal',
        fontWeight: '700',
        fontSize: 32,
        margin: 60,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        fontWeight: '500',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40,
    },
    button: {
        backgroundColor: 'teal',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        margin: 5,
        borderColor: 'teal',
        borderWidth: 2,
    },
    buttonOutLineText: {
        color: 'teal',
        fontWeight: '700',
        fontSize: 16,
    },
})