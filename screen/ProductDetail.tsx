import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import ButtonHeader from '../src/components/_global/ButtonHeader';
import ProductInfo from '../src/components/productDetail/ProductInfo';
import ButtonFooter from '../src/components/productDetail/ButtonFooter';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Product} from '../src/components/productDetail/types';

type ProductDetailScreenProps = NativeStackScreenProps<
  ParamListBase,
  'ProductDetail'
>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({route}) => {
  const {product} = route.params as {product: Product};

  return (
    <SafeAreaView style={styles.container}>
      <ButtonHeader actionButtons />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProductInfo product={product} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <ButtonFooter />
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
    paddingBottom: 60, // Berikan padding untuk menghindari bagian footer
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
