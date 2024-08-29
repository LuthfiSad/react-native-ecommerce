import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonHeader from '../../src/components/_global/ButtonHeader';

const addresses = [
  {
    id: '1',
    name: 'Muhamad Luthfi Sadli',
    phone: '08123456789',
    address: 'Jalan Merdeka No. 10, Jakarta',
    isMain: true,
    isStore: false,
  },
  {
    id: '2',
    name: 'Muhamad Luthfi Sadli',
    phone: '08123456789',
    address: 'Jalan Melawai No. 8, Jakarta',
    isMain: false,
    isStore: true,
  },
  {
    id: '3',
    name: 'Muhamad Luthfi Sadli',
    phone: '08123456789',
    address: 'Jalan Melawai No. 8, Jakarta',
    isMain: false,
    isStore: false,
  },
];

const AddressScreen = () => {
  const renderAddressItem: React.FC<any> = ({item}) => (
    <View style={styles.addressItem}>
      <View style={[styles.addressDetails, (!item.isMain || !item.isStore) && {marginBottom: 0}]}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
      <View style={styles.pinContainer}>
        {item.isMain && <Text style={styles.pinText}>Alamat Utama</Text>}
        {item.isStore && <Text style={styles.pinText}>Alamat Toko</Text>}
      </View>
    </View>
  );

  return (
    <>
      <ButtonHeader title="Daftar Alamat" />
      <View style={styles.container}>
        <FlatList
          data={addresses}
          renderItem={renderAddressItem as any}
          keyExtractor={item => item.id}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.addButton}>
              <Icon name="add-location" size={24} color="#fff" />
              <Text style={styles.addButtonText}>Tambah Alamat Baru</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addressItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  addressDetails: {
    marginBottom: 8,
  },
  name: {
    color: '#4C76A3',
    fontWeight: 'bold',
    fontSize: 16,
  },
  phone: {
    color: '#555',
  },
  address: {
    color: '#777',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pinText: {
    color: '#4C76A3',
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4C76A3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
