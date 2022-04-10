import { StyleSheet, TextInput, Button, Text, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import "firebase/compat/firestore";
import AppContext from '../../utils/AppContext';

const ProductsPage = () => {
  const [searchValue, setSearchValue] = React.useState('');

  const productsRef = firebase.firestore().collection('products');
  const q = productsRef.orderBy('id', 'desc');

  const [products] = useCollectionData(q, { idField: 'id' });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          autoFocus={true}
          placeholder='Search Products' />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "center"
        }}
        style={styles.productsContainer}>
        {products
          && products.map((prod, index) => <ProductItem key={`product${index}`} product={prod} />)}
      </ScrollView>
    </View>
  )
}

const ProductItem = (props) => {
  const { cart, setCart } = React.useContext(AppContext)

  const { id, title, image, brand, price } = props.product

  const addToCart = () => {
    let temp = [...cart]
    temp.push(props.product)
    setCart(temp)
  }

  const removeFromCart = () => {
    let temp = [...cart];
    if(temp.includes(props.product))
    {
      let index = temp.lastIndexOf(props.product)
      temp.pop(temp[index])
      setCart(temp)
    }
  }
  return (
    <View style={styles.productItemContainer}>
      <Image
        source={{ uri: image }}
        style={styles.productItemImage} />
      <Text numberOfLines={1} style={styles.productItemTitleText}>
        {`${title} - ${brand}`}
      </Text>
      <Text numberOfLines={1} style={styles.productItemPriceText}>
        {`Price: ${price}₹`}
      </Text>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <TouchableOpacity onPress={removeFromCart}>
          <Text style={styles.productCartButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.productCartCount}>
          {cart.filter((p) => p.id == id).length}
        </Text>
        <TouchableOpacity onPress={addToCart}>
          <Text style={styles.productCartButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductsPage

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  searchInput: {
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
  productsContainer: {
    paddingStart: 10,
    paddingEnd: 10,
  },
  productItemContainer: {
    width: 132,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productItemTitleText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  productItemPriceText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  productCartButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: 'black',
    width: 30,
    height: 30,
    textAlign: 'center',
  },
  productCartCount: {
    color: 'black',
    fontSize: 14,
    width: 30,
    height: 30,
    padding: 5,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
  }
})