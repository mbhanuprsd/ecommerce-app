import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { auth } from '../../utils/FirebaseUtil';
import { useNavigation } from "@react-navigation/core";

const ProfilePage = () => {
    const navigation = useNavigation()
    const userEmail = auth.currentUser?.email
    const photoURL = auth?.currentUser?.photoURL

    const handleSignout = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login");
            })
            .catch(err => alert(err.message))
    }

    return (
        <View style={styles.container}>
            {photoURL === null
                ? <Text
                    style={styles.textImage}>
                    {userEmail.substring(0, 2).toUpperCase()}
                </Text>
                : <Image
                    source={{ uri: photoURL }}
                    style={styles.userImage} />
            }
            <Text style={styles.text}>Email: {userEmail}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 24
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'teal',
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
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20,
        padding: 5,
    },
    textImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20,
        padding: 5,
        paddingTop: 15,
        backgroundColor: 'teal',
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 48
    }
})