import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonHeader from '../../src/components/_global/ButtonHeader';
import {shipments} from '../../src/config';

const ShippingScreen = () => {
  const route = useRoute<RouteProp<{params: {status: string}}>>();
  const {status} = route.params;

  const navigation = useNavigation<any>();

  // Function untuk memfilter status berdasarkan status pengiriman
  const getFilteredStatus = (shipmentStatus: Status[]) => {
    // Mendapatkan status terakhir
    const lastStatus = shipmentStatus[shipmentStatus.length - 1];

    if (status === 'packet') {
      // Tampilkan hanya pengiriman yang status terakhirnya adalah "Pesanan Dikemas"
      if (lastStatus.description === 'Pesanan Dikemas') {
        return shipmentStatus;
      } else {
        // Jika status terakhir bukan "Pesanan Dikemas", return empty array
        return [];
      }
    } else if (status === 'delivery') {
      // Tampilkan pengiriman yang status terakhirnya setelah "Pesanan Dikemas"
      if (lastStatus.description !== 'Pesanan Dikemas') {
        return shipmentStatus;
      } else {
        // Jika status terakhir adalah "Pesanan Dikemas", return empty array
        return [];
      }
    }

    // Jika tidak memenuhi salah satu kondisi, kembalikan array status asli
    return shipmentStatus;
  };

  interface Status {
    date: string;
    description: string;
    location: {latitude: number; longitude: number};
  }

  interface Shipment {
    id: number;
    imageUrl: string;
    title: string;
    originalPrice: number;
    discountPrice: number | null;
    quantity: number;
    shippingCost: number;
    status: Status[];
    estimateDate: string;
    delivered: boolean;
  }

  const renderShipmentItem = ({item}: {item: Shipment}) => {
    const filteredStatus = getFilteredStatus(item.status);

    // Jika tidak ada status yang sesuai, tidak perlu menampilkan item
    if (filteredStatus.length === 0) {
      return null;
    }

    const currentStatus = filteredStatus[filteredStatus.length - 1];

    return (
      <TouchableOpacity
        style={styles.shipmentContainer}
        onPress={() =>
          navigation.navigate('DetailScreen', {shipmentId: item.id})
        }>
        <View style={styles.shipmentItem}>
          <Image source={{uri: item.imageUrl}} style={styles.productImage} />
          <View>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.quantity}>QTY: {item.quantity}</Text>
            {/* <View style={styles.priceContainer}>
          {item.discountPrice ? (
            <>
              <Text
                style={styles.discountPrice}>{`Rp${item.discountPrice}`}</Text>
              <Text
                style={styles.originalPrice}>{`Rp${item.originalPrice}`}</Text>
            </>
          ) : (
            <Text style={styles.price}>{`Rp${item.originalPrice}`}</Text>
          )}
        </View>
        <Text style={styles.shippingCost}>
          Ongkir: Rp{item.shippingCost.toLocaleString()}
        </Text> */}
          </View>
        </View>
        <Text style={styles.totalPrice}>
          Rp{' '}
          {(
            (item.discountPrice ?? item.originalPrice) * item.quantity +
            item.shippingCost
          ).toLocaleString()}
        </Text>
        <TouchableOpacity
          style={[
            styles.statusContainer,
            item.delivered && {
              borderColor: '#2ecc71',
              backgroundColor: '#2ecc71',
            },
          ]}
          onPress={() =>
            navigation.navigate('DeliveryStatus', {
              status: item.status,
              estimateDate: item.estimateDate,
              delivered: item.delivered,
            })
          }>
          <Text style={[styles.statusText, item.delivered && {color: '#fff'}]}>
            {currentStatus.date} - {currentStatus.description}
          </Text>
        </TouchableOpacity>
        {item.delivered && status === 'delivery' && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.returnButton}>
              <Icon name="refresh" size={20} color="#fff" />
              <Text style={styles.returnButtonText}>
                Pengembalian Barang/Dana
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.completeButton}>
              <Icon name="check-circle" size={20} color="#fff" />
              <Text style={styles.completeButtonText}>Pesanan Selesai</Text>
            </TouchableOpacity>
          </View>
        )}
        {status === 'packet' && (
          <TouchableOpacity style={styles.contactButton}>
            <Icon name="support-agent" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Hubungi CS</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ButtonHeader
        title={status === 'packet' ? 'Pesanan Di Kemas' : 'Pesanan Di Kirim'}
      />
      <View style={styles.container}>
        <FlatList
          data={shipments}
          keyExtractor={item => String(item.id)}
          renderItem={renderShipmentItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  shipmentContainer: {
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
  shipmentItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    // marginBottom: ,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  // price: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#4C76A3',
  // },
  // discountPrice: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#4C76A3',
  //   marginRight: 10,
  // },
  // originalPrice: {
  //   fontSize: 14,
  //   color: '#999',
  //   textDecorationLine: 'line-through',
  // },
  quantity: {
    fontSize: 14,
    color: '#333',
    // marginTop: 5,
  },
  // shippingCost: {
  //   fontSize: 14,
  //   color: '#333',
  //   marginTop: 5,
  // },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginTop: 10,
  },
  statusContainer: {
    borderColor: '#4C76A3',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#4C76A3',
  },
  estimate: {
    fontSize: 14,
    color: '#4C76A3',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C76A3',
    borderRadius: 5,
    paddingVertical: 5,
    marginRight: 5,
    paddingHorizontal: 5,
  },
  returnButtonText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  completeButtonText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
  },
  map: {
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C76A3',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 5,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
});

export default ShippingScreen;
