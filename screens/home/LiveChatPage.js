import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import "firebase/compat/firestore";
import { auth } from '../../utils/FirebaseUtil';
import FontAwesome from "@expo/vector-icons/FontAwesome";

const LiveChatPage = () => {
    const messagesRef = firebase.firestore().collection('messages');
    const q = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(q, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        if (formValue.length === 0) {
            alert("Please enter message before sending!")
            return
        }
        e.preventDefault();
        setFormValue('')

        const { uid, photoURL } = auth.currentUser;
        
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        }).catch(err => alert(err.message))

    }
    const scrollViewRef = useRef()

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.messageContainer}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}>
                {messages
                    && messages.map((msg, index) => <ChatMessage key={`message${index}`} message={msg} />)}
            </ScrollView>
            <View
                style={styles.messageInputContainer}>
                {auth?.currentUser?.photoURL === null
                    ? <Image
                        style={styles.userImage}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    : <Image
                        source={{ uri: auth?.currentUser?.photoURL }}
                        style={styles.userImage} />
                }
                <TextInput
                    style={styles.messageInput}
                    value={formValue}
                    onChangeText={(text) => setFormValue(text)}
                    onSubmitEditing={sendMessage}
                    autoFocus={true}
                    placeholder='Type your message' />
                <TouchableOpacity
                    style={styles.button}
                    onPress={sendMessage}>
                    <FontAwesome name='send' size={20} color='white' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;

    const isUserMsg = uid === auth.currentUser.uid;

    return (
        <View style={isUserMsg ? styles.msgReverseContainer : styles.msgContainer}>
            {photoURL === null
                ? <Image
                    style={styles.userImage}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                : <Image
                    source={{ uri: photoURL }}
                    style={styles.userImage} />
            }
            <Text style={styles.msgText}>{text}</Text>
        </View>
    )
}
export default LiveChatPage

const styles = StyleSheet.create({
    messageContainer: {
    },
    messageInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    messageInput: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        flex: 1,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'teal',
        width: 40,
        height: 40,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgReverseContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    msgText: {
        color: 'white',
        backgroundColor: 'teal',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        fontSize: 14,
        alignSelf: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
        padding: 5,
    }
})