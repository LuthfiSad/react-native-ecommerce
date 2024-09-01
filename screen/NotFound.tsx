import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ButtonHeader from '../src/components/_global/ButtonHeader';

const NotFound = () => {
  return (
    <View style={styles.container}>
      <ButtonHeader />
      <View style={styles.notFound}>
        <Text style={styles.textNotFound}>Product not found</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNotFound: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default NotFound;
