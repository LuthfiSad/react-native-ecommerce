import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import MapView, {Marker} from 'react-native-maps';

const DeliveryScreen = () => {
  const shipments = [
    {
      id: '1',
      title: 'Produk A',
      originalPrice: 150000,
      discountPrice: 125000,
      shippingCost: 10000,
      status: [
        {
          date: '10 September 2024',
          description: 'Pesanan Dibuat',
          location: {latitude: -6.2088, longitude: 106.8456},
        },
        {
          date: '11 September 2024',
          description: 'Pesanan Dikemas',
          location: {latitude: -6.2, longitude: 106.8166},
        },
        {
          date: '12 September 2024',
          description: 'Pesanan di Tangerang',
          location: {latitude: -6.1781, longitude: 106.6319},
        },
        // Tambahkan status lainnya di sini
      ],
      estimateDate: '20 September 2024',
      delivered: false,
    },
  ];

  const navigation = useNavigation<any>();

  interface Shipment {
    id: string;
    title: string;
    originalPrice: number;
    discountPrice: number | null;
    shippingCost: number;
    status: {
      date: string;
      description: string;
      location: {latitude: number; longitude: number};
    }[];
    estimateDate: string;
    delivered: boolean;
  }

  const renderShipmentItem = ({item}: {item: Shipment}) => {
    const currentStatus = item.status[item.status.length - 1];

    return (
      <TouchableOpacity
        style={styles.shipmentContainer}
        onPress={() =>
          navigation.navigate('DetailScreen', {shipmentId: item.id})
        }>
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
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
        </Text>
        <Text style={styles.totalPrice}>
          Total: Rp
          {(
            (item.discountPrice ?? item.originalPrice) + item.shippingCost
          ).toLocaleString()}
        </Text>
        <TouchableOpacity
          style={styles.statusContainer}
          onPress={() =>
            navigation.navigate('DetailScreen', {
              shipmentId: item.id,
              status: currentStatus,
            })
          }>
          <Text style={styles.statusText}>
            {currentStatus.date} - {currentStatus.description}
          </Text>
        </TouchableOpacity>
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentStatus.location.latitude,
            longitude: currentStatus.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker coordinate={currentStatus.location} />
        </MapView> */}
        {item.delivered ? (
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
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={shipments}
        keyExtractor={item => item.id}
        renderItem={renderShipmentItem}
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
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3',
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
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
  statusContainer: {
    backgroundColor: '#4C76A3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#fff',
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
});

export default DeliveryScreen;
