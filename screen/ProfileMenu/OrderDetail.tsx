import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import ButtonHeader from '../../src/components/_global/ButtonHeader';

interface OrderProps {
  imgUrl: string;
  nameOrder: string;
  quantity: number;
  discountPrice: number;
  originalPrice: number;
}

const OrderDetailScreen: React.FC = () => {
  const {params} = useRoute<RouteProp<{params: {order: OrderProps}}>>();
  const {order} = params;

  return (
    <SafeAreaView style={styles.container}>
      <ButtonHeader title='Detail Riwayat Pembelian' />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <OrderInfo order={order} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 60,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3',
  },
});

export default OrderDetailScreen;

import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface OrderInfoProps {
  order: OrderProps;
}

const OrderInfo: React.FC<OrderInfoProps> = ({order}) => {
  return (
    <View style={styles2.infoContainer}>
      <Image source={{uri: order.imgUrl}} style={styles2.image} />

      <Text style={styles2.title}>{order.nameOrder}</Text>

      {order.discountPrice ? (
        <View style={styles2.priceContainer}>
          <Text style={styles2.discountPrice}>Rp{order.discountPrice}</Text>
          <Text style={styles2.originalPrice}>Rp{order.originalPrice}</Text>
        </View>
      ) : (
        <Text style={styles2.price}>Rp{order.originalPrice}</Text>
      )}

      <Text style={styles2.soldText}>{order.quantity}x Produk</Text>
      <Text style={styles2.price}>
        Total: Rp{(order.discountPrice ?? order.originalPrice) * order.quantity}
      </Text>

      <View style={styles2.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <FontAwesome
            key={i}
            name="star"
            size={14}
            color={i < 4 ? '#FFD700' : '#ccc'} // Misalkan rating adalah 4
          />
        ))}
        <Text style={styles2.soldText}>(30 terjual)</Text>
      </View>

      <View style={styles2.tabContainer}>
        <View style={[styles2.tabButton, styles2.activeTab]}>
          <Text style={styles2.tabText}>Deskripsi</Text>
        </View>
      </View>

      <Text style={styles2.descriptionText}>
        Deskripsi produk akan ditampilkan di sini.
      </Text>
    </View>
  );
};

const styles2 = StyleSheet.create({
  infoContainer: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#222',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  soldText: {
    marginLeft: 5,
    color: '#888',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    paddingBottom: 5,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4C76A3',
  },
  tabText: {
    color: '#888',
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#555',
  },
  reviewsContainer: {
    marginTop: 10,
  },
});
