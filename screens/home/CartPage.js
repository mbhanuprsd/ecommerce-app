import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AppContext from '../../utils/AppContext'

const CartPage = () => {
  const { cart, setCart } = React.useContext(AppContext)

  const removeFromCart = (index) => {
    // let temp = [...cart];
    // temp.pop(temp[index])
    // setCart(temp)
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{ margin: 20 }}
        contentContainerStyle={{
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "center"
        }}>
        {cart
          && cart.map((item, index) =>
            (<View key={`product${index}`} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(index)}>
                <Text style={styles.removeCartItemText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.cartItemText}>
                {item.title + " - " + item.brand}
              </Text>
            </View>)
          )}
      </ScrollView>
    </View>
  )
}

export default CartPage

const styles = StyleSheet.create({
  cartItemText: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'grey',
    color: 'white',
  },
  removeCartItemText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 15,
    margin: 10,
    width: 30,
    height: 30,
  },
})