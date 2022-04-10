import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import "firebase/compat/firestore";

const AddProduct = () => {

    const productsRef = firebase.firestore().collection('products');
    const q = productsRef.orderBy('id');

    const [products] = useCollectionData(q, { idField: 'id' });

    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const addProduct = async () => {
        if (title.length < 3)
        {
            alert('Please enter valid product name')
            return
        }
        else if (brand.length < 3)
        {
            alert('Please enter valid brand name')
            return
        }
        else if (description.length < 3)
        {
            alert('Please enter valid description name')
            return
        }
        else if (price == 0)
        {
            alert('Please enter valid price')
            return
        }
        else
        {
            await productsRef.add({
                title,
                brand,
                description,
                price,
                id: 1000+products.length+1,
                image:'https://firebasestorage.googleapis.com/v0/b/ecommerce-app-bp.appspot.com/o/default_product.png?alt=media&token=0d905ab1-989f-4b8a-bed0-7b0534aa1144'
            }).catch(err => 
                {
                    alert(err.message)
                    return
                })
        }
        setTitle('')
        setBrand('')
        setDescription('')
        setPrice(0)
    }

    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Name'
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={styles.input}
                    textContentType='name'
                />
                <TextInput
                    placeholder='Brand'
                    value={brand}
                    onChangeText={text => setBrand(text)}
                    style={styles.input}
                    textContentType='organizationName'
                />
                <TextInput
                    placeholder='Description'
                    value={description}
                    onChangeText={text => setDescription(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Price'
                    value={price}
                    onChangeText={text => setPrice(text)}
                    style={styles.input}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={addProduct}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Add to List</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    inputContainer: {
        margin: 80,
        marginBottom: 30,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'teal',
        padding: 15,
        marginStart: 80,
        marginEnd: 80,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})