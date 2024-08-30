import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RateScreen = () => {
  const productsToRate = [
    {
      id: '1',
      title: 'Produk A',
      deliveryDate: '20 September 2024',
    },
    // Tambahkan produk lainnya di sini
  ];

  const navigation = useNavigation<any>();

  interface Product {
    id: string;
    title: string;
    deliveryDate: string;
  }

  const renderProductItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('RatingScreen', {productId: item.id})}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.deliveryDate}>Dikirim pada: {item.deliveryDate}</Text>
      <TouchableOpacity style={styles.rateButton}>
        <Icon name="star-rate" size={20} color="#fff" />
        <Text style={styles.rateButtonText}>Beri Penilaian</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productsToRate}
        keyExtractor={item => item.id}
        renderItem={renderProductItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  deliveryDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C76A3',
    borderRadius: 5,
    paddingVertical: 10,
  },
  rateButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
});

export default RateScreen;
