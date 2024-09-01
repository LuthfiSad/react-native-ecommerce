import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import ButtonHeader from '../src/components/_global/ButtonHeader';
import ProductInfo from '../src/components/productDetail/ProductInfo';
import ButtonFooter from '../src/components/productDetail/ButtonFooter';
import {RouteProp, useRoute} from '@react-navigation/native';
import NotFound from './NotFound';
import {products} from '../src/config';
import ProductList from '../src/components/home/products/productList';

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<{params: {id: string}}>>();
  const {id} = route.params;

  // Filter produk berdasarkan ID
  const product = products.find(prod => prod.id === parseInt(id));

  // Pastikan produk ditemukan
  if (!product) {
    return <NotFound />;
  }

  const actionButtons = [
    {
      title: 'Add to Cart',
    },
    {
      title: 'Buy Now',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ButtonHeader actionButtons />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProductInfo product={product} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <ButtonFooter buttonFooter={actionButtons} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 70, // Berikan padding untuk menghindari bagian footer
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default ProductDetailScreen;
