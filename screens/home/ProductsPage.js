import { StyleSheet, TextInput, Text, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { findProducts } from '../../utils/APIUtility';

const ProductsPage = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [products, setProducts] = React.useState(null);

  const searchProducts = () => {
    findProducts(searchValue, setProducts)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          onSubmitEditing={searchProducts}
          autoFocus={true}
          placeholder='Search Products' />
        <TouchableOpacity
          style={styles.button}
          onPress={searchProducts}>
          <FontAwesome name='search' size={20} color='white' />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", alignContent: "center", }}
        style={styles.productsContainer}>
        {products
          && products.map((prod, index) => <ProductItem key={`product${index}`} product={prod} />)}
      </ScrollView>
    </View>
  )
}

const ProductItem = (props) => {
  const { title, image } = props.product

  return (
    <View style={styles.productItemContainer}>
      <Image
        source={{ uri: image }}
        style={styles.productItemImage} />
      <Text style={styles.productItemText}>
        {title}
      </Text>
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
    width: 160,
    height: 160,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
  },
  productItemText: {
    color: 'white',
    fontSize: 12,
    overflow: 'hidden',
    textAlign: 'center',
    height: 40,
  },

})