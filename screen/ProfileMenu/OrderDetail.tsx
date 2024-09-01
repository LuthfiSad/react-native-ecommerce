import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import ButtonHeader from '../../src/components/_global/ButtonHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonFooter from '../../src/components/productDetail/ButtonFooter';

interface OrderProps {
  id: number;
  imgUrl: string;
  nameOrder: string;
  quantity: number;
  discountPrice?: number;
  originalPrice: number;
  location: string;
  originAddress: string;
  shippingCost?: number;
  voucherDiscount?: number;
}

const OrderDetailScreen: React.FC = () => {
  const {params} = useRoute<RouteProp<{params: {order: OrderProps}}>>();
  const {order} = params;
  const [isExpanded, setIsExpanded] = useState(false);

  const navigation = useNavigation<any>();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonHeader title="Detail Riwayat Pembelian" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <OrderInfo order={order} />
        <LocationInfo location={order.location} />
        {isExpanded && (
          <View style={styles2.dropdownContent}>
            <View style={styles2.detailRow}>
              <Text style={styles2.detailLabel}>Subtotal Produk</Text>
              <Text style={styles2.detailValue}>
                Rp{order.originalPrice * order.quantity}
              </Text>
            </View>
            <View style={styles2.detailRow}>
              <Text style={styles2.detailLabel}>Subtotal Diskon</Text>
              <Text style={styles2.detailValue}>
                - Rp{' '}
                {(order.originalPrice -
                  (order.discountPrice ?? order.originalPrice)) *
                  order.quantity}
              </Text>
            </View>

            <View style={styles2.detailRow}>
              <Text style={styles2.detailLabel}>Pengiriman</Text>
              <Text style={styles2.detailValue}>
                Rp {order.shippingCost ?? 0}
              </Text>
            </View>
            {order.voucherDiscount ? (
              <View style={styles2.detailRow}>
                <Text style={styles2.detailLabel}>Diskon Voucher</Text>
                <Text style={styles2.detailValue}>
                  - Rp {order.voucherDiscount}
                </Text>
              </View>
            ) : null}
          </View>
        )}
        <TouchableWithoutFeedback onPress={toggleExpand}>
          <View style={styles2.totalContainer}>
            <Text style={styles2.price}>
              Total Pesanan: Rp{" "}
              {(order.discountPrice ?? order.originalPrice) * order.quantity +
                (order.shippingCost ?? 0) -
                (order.voucherDiscount ?? 0)}
            </Text>
            <FontAwesome
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#4C76A3"
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <ButtonFooter
        buttonFooter={[
          {
            title: 'Lihat Produk',
            onPress: () => navigation.navigate('ProductDetail', {id: order.id}),
          },
        ]}
      />
    </SafeAreaView>
  );
};

const LocationInfo: React.FC<{location: string}> = ({location}) => {
  return (
    <View style={styles2.locationContainer}>
      <View style={styles2.locationHeader}>
        <FontAwesome name="map-marker" size={24} color="#FF6347" />
        <Text style={styles2.locationText}>Tujuan:</Text>
      </View>
      <Text style={styles2.locationValue}>{location}</Text>
    </View>
  );
};

const OrderInfo: React.FC<{order: OrderProps}> = ({order}) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 60,
    paddingHorizontal: 15,
  },
});

const styles2 = StyleSheet.create({
  infoContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: '#222',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  discountPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6347',
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
    // marginBottom: 10,
  },
  soldText: {
    color: '#888',
    // marginBottom: 15,
  },
  locationContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationValue: {
    // marginLeft: 10,
    fontSize: 14,
    color: '#888',
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  dropdownContent: {
    gap: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;
