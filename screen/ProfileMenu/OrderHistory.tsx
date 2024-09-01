import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {orders} from '../../src/config';
import {OrderTypes} from '../../src/components/profile/types/OrderTypes';
import ButtonHeader from '../../src/components/_global/ButtonHeader';
import ProductList from '../../src/components/home/products/productList';

const CardItem: React.FC<{order: OrderTypes}> = ({order}) => {
  const {
    imgUrl,
    quantity,
    discountPrice,
    originalPrice,
    nameOrder,
    shippingCost,
    voucherDiscount,
  } = order;
  const navigation = useNavigation<any>(); // Use `any` if types are not properly set for navigation

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('OrderDetail', {
          order: order,
        })
      }>
      <View style={styles.card}>
        <Image source={{uri: imgUrl}} style={styles.image} />
        <Text style={styles.title}>{nameOrder}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.quantity}>{`${quantity}x Produk`}</Text>
          <Text style={styles.totalPrice}>
            Rp{' '}
            {(discountPrice ?? originalPrice) * quantity +
              (shippingCost ?? 0) -
              (voucherDiscount ?? 0)}
          </Text>
          {/* <View style={styles2.priceContainer}>
            {discountPrice ? (
              <>
                <Text
                  style={styles2.discountPrice}>{`Rp${discountPrice}`}</Text>
                <Text
                  style={styles2.originalPrice}>{`Rp${originalPrice}`}</Text>
              </>
            ) : (
              <Text style={styles2.originalPrice}>{`Rp${originalPrice}`}</Text>
            )}
          </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const OrderHistoryScreen = () => {
  return (
    <>
      <ButtonHeader title="Semua Riwayat Pesanan" />
      <ScrollView>
        <View style={styles.cardList}>
          {orders.map((order, index) => (
            <CardItem key={index} order={order} />
          ))}
        </View>
        <ProductList title="Produk Lainnya" />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: 5,
  },
  infoContainer: {
    padding: 10,
  },
  quantity: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    paddingHorizontal: 10,
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginRight: 10,
  },
});

export default OrderHistoryScreen;
