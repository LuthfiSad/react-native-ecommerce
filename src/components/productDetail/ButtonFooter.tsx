import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const ButtonFooter: React.FC = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyNowButton}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#4C76A3',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4C76A3',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ButtonFooter;
