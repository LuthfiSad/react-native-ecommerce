import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ButtonFooterProps {
  buttonFooter: {
    title: string;
    onPress?: () => void;
  }[];
}

const ButtonFooter: React.FC<ButtonFooterProps> = ({buttonFooter}) => {
  return (
    <View style={styles.footer}>
      {buttonFooter.map((item, index) => (
        <TouchableOpacity key={index} style={styles.buttonFooter} onPress={item.onPress}>
          <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
      {/* <TouchableOpacity style={styles.buttonFooter}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyNowButton}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity> */}
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
    gap: 10,
  },
  buttonFooter: {
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
