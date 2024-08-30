import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PacketScreen = () => {
  const products = [
    {
      id: '1',
      title: 'Produk A',
      originalPrice: 150000,
      discountedPrice: 125000,
      shippingCost: 10000,
      estimateDate: '20 September 2024',
    },
    {
      id: '2',
      title: 'Produk B',
      originalPrice: 200000,
      discountedPrice: 175000,
      shippingCost: 15000,
      estimateDate: '21 September 2024',
    },
    {
      id: '3',
      title: 'Produk C',
      originalPrice: 250000,
      discountedPrice: 210000,
      shippingCost: 20000,
      estimateDate: '22 September 2024',
    },
    {
      id: '4',
      title: 'Produk D',
      originalPrice: 180000,
      discountedPrice: 160000,
      shippingCost: 12000,
      estimateDate: '23 September 2024',
    },
  ];

  const navigation = useNavigation<any>();

  interface Product {
    id: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    shippingCost: number;
    estimateDate: string;
  }

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('DetailScreen', { productId: item.id })}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.originalPrice}>
          Rp{item.originalPrice.toLocaleString()}
        </Text>
        <Text style={styles.discountedPrice}>
          Rp{item.discountedPrice.toLocaleString()}
        </Text>
      </View>
      <Text style={styles.shippingCost}>
        Ongkir: Rp{item.shippingCost.toLocaleString()}
      </Text>
      <Text style={styles.totalPrice}>
        Total: Rp{(item.discountedPrice + item.shippingCost).toLocaleString()}
      </Text>
      <Text style={styles.estimate}>
        Produk akan dikirim sebelum {item.estimateDate}
      </Text>
      <TouchableOpacity style={styles.contactButton}>
        <Icon name="support-agent" size={20} color="#fff" />
        <Text style={styles.contactButtonText}>Hubungi CS</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderProductItem} // Tidak ada error lagi
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
    shadowOffset: { width: 0, height: 2 },
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#aaa',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3',
  },
  shippingCost: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginTop: 5,
  },
  estimate: {
    fontSize: 14,
    color: '#4C76A3',
    marginTop: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C76A3',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 15,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
});

export default PacketScreen;
