import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DeliveryScreen = () => {
  const shipments = [
    {
      id: '1',
      title: 'Produk A',
      originalPrice: 150000,
      discountedPrice: 125000,
      shippingCost: 10000,
      status: [
        {date: '10 September 2024', description: 'Pesanan Dibuat'},
        {date: '11 September 2024', description: 'Pesanan Dikemas'},
        {date: '12 September 2024', description: 'Pesanan di Tangerang'},
        // Tambahkan status lainnya di sini
      ],
      estimateDate: '20 September 2024',
      delivered: false, // Ubah ke true jika produk sudah terkirim
    },
    // Tambahkan pengiriman lainnya di sini
  ];

  const navigation = useNavigation<any>();

  interface Shipment {
    id: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    shippingCost: number;
    status: {date: string; description: string}[];
    estimateDate: string;
    delivered: boolean;
  }

  const renderShipmentItem = ({item}: {item: Shipment}) => (
    <TouchableOpacity
      style={styles.shipmentContainer}
      onPress={() =>
        navigation.navigate('DetailScreen', {shipmentId: item.id})
      }>
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
      <View style={styles.statusContainer}>
        {item.status.map((status, index) => (
          <Text key={index} style={styles.statusText}>
            {status.date} - {status.description}
          </Text>
        ))}
      </View>
      <Text style={styles.estimate}>
        Estimasi Kedatangan: {item.estimateDate}
      </Text>
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
  statusContainer: {
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  estimate: {
    fontSize: 14,
    color: '#4C76A3',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C76A3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  returnButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  completeButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
});

export default DeliveryScreen;
