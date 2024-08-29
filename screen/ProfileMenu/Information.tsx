import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import ButtonHeader from '../../src/components/_global/ButtonHeader';

const InformationScreen = () => {
  return (
    <>
      <ButtonHeader title="Informasi" />
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://dummyimage.com/100x100/4C76A3/fff.png&text=TS',
          }}
          style={styles.logo}
        />
        <Text style={styles.version}>Versi Aplikasi: 1.0.0</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bersihkan Cache</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Aplikasi</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {width: 100, height: 100, marginBottom: 16},
  version: {fontSize: 16, color: '#555', marginBottom: 32},
  button: {
    backgroundColor: '#4C76A3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
  },
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
});

export default InformationScreen;
