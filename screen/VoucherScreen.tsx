import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';

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
  // Tambahkan 2 data lagi untuk memenuhi minimal 4
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
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers}
        renderItem={renderVoucherItem as any}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  voucherItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  voucherImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  voucherDetails: {
    flex: 1,
    paddingLeft: 16,
  },
  discount: {
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
});

export default VoucherScreen;
