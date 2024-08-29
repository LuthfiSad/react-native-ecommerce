import React from 'react';
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import ButtonHeader from '../../src/components/_global/ButtonHeader';

const vouchers = [
  {
    id: '1',
    discount: 'Diskon 10% sd Rp 40k',
    minPurchase: 'Min belanja Rp 30k',
    validity: 'Berlaku dalam: 7 hari',
    image: 'https://dummyimage.com/600x400/4C76A3/fff.png&text=Voucher+1',
  },
  {
    id: '2',
    discount: 'Diskon 20% sd Rp 50k',
    minPurchase: 'Min belanja Rp 50k',
    validity: 'Berlaku dalam: 10 hari',
    image: 'https://dummyimage.com/600x400/4C76A3/fff.png&text=Voucher+2',
  },
  {
    id: '3',
    discount: 'Diskon 30% sd Rp 60k',
    minPurchase: 'Min belanja Rp 70k',
    validity: 'Berlaku dalam: 5 hari',
    image: 'https://dummyimage.com/600x400/4C76A3/fff.png&text=Voucher+3',
  },
  {
    id: '4',
    discount: 'Diskon 50% sd Rp 100k',
    minPurchase: 'Min belanja Rp 100k',
    validity: 'Berlaku dalam: 15 hari',
    image: 'https://dummyimage.com/600x400/4C76A3/fff.png&text=Voucher+4',
  },
];

const VoucherScreen = () => {
  const renderVoucherItem: React.FC<any> = ({item}) => (
    <View style={styles.voucherItem}>
      <Image source={{uri: item.image}} style={styles.voucherImage} />
      <View style={styles.voucherDetails}>
        <Text style={styles.discount}>{item.discount}</Text>
        <Text style={styles.minPurchase}>{item.minPurchase}</Text>
        <Text style={styles.validity}>{item.validity}</Text>
      </View>
      <TouchableOpacity style={styles.useButton}>
        <Text style={styles.useButtonText}>Pakai</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ButtonHeader title="Daftar Voucher" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Masukan Kode Voucher</Text>
        </TouchableOpacity>
        <FlatList
          data={vouchers}
          renderItem={renderVoucherItem as any}
          keyExtractor={item => item.id}
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
  addButton: {
    backgroundColor: '#4C76A3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voucherItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    overflow: 'hidden',
  },
  voucherImage: {
    width: 100,
    resizeMode: 'cover',
  },
  voucherDetails: {
    padding: 16,
    flex: 1,
  },
  discount: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  minPurchase: {
    color: '#555',
    marginTop: 4,
  },
  validity: {
    color: '#777',
    marginTop: 4,
  },
  useButton: {
    backgroundColor: '#4C76A3',
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
    marginVertical: 20,
    height: 40, // Tinggi tombol
  },
  useButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default VoucherScreen;
