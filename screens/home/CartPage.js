import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'
import AppContext from '../../utils/AppContext'

const CartPage = () => {
  const { cart } = React.useContext(AppContext)
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "center"
        }}>
        {cart
          && cart.map((item, index) => <Text key={`product${index}`} style={styles.cartItem}>{item.title}</Text>)}
      </ScrollView>
    </View>
  )
}

export default CartPage

const styles = StyleSheet.create({
  cartItem: {
    color: 'teal',
  },
})