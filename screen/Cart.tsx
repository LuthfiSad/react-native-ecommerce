import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {carts, couriers} from '../src/config';

const CartScreen = () => {
  const [cart, setCart] = useState(carts);
  const [pickerIsFocused, setPickerIsFocused] = useState(false);

  const [selectedCourier, setSelectedCourier] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');

  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [
    {
      id: 1,
      name: 'Jl. Contoh Destination 1',
      type: 'Alamat Utama', // ini akan menampilkan badge "Alamat Utama"
    },
    {
      id: 2,
      name: 'Jl. Contoh Destination 2',
      type: 'Alamat Kantor', // ini akan menampilkan badge "Alamat Kantor"
    },
    {
      id: 3,
      name: 'Jl. Contoh Destination 3',
      type: '', // tidak ada badge
    },
    // Tambahkan lebih banyak lokasi jika diperlukan
  ];

  const handleQuantityChange: (
    id: number,
    action: 'increase' | 'decrease',
  ) => void = (id, action) => {
    setCart(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? {
              ...product,
              quantity:
                action === 'increase'
                  ? product.quantity + 1
                  : Math.max(1, product.quantity - 1),
            }
          : product,
      ),
    );
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'Bejir123') {
      setAppliedCoupon(true);
      setCouponCode('');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(false);
      setCouponCode('');
    }
  };

  const calculateTotal = () => {
    const productTotal = cart.reduce(
      (acc, product) =>
        acc +
        product.quantity *
          (product.discountPrice
            ? product.price * (1 - product.discountPrice.discountPercent / 100)
            : product.price),
      0,
    );

    const courierPrice = couriers.find(
      courier => courier.name === selectedCourier,
    )?.price;
    const discountAmount = appliedCoupon ? productTotal * 0.5 : 0;

    return {
      productTotal,
      discountAmount,
      courierPrice,
      grandTotal: productTotal + (courierPrice || 0) - discountAmount,
    };
  };

  const totals = calculateTotal();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <TouchableOpacity style={styles.headerIconButton}>
            <MaterialIcons name="arrow-back" size={28} color="#4C76A3" />
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>Keranjang Saya</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.productList}>
            {cart.map(product => (
              <View key={product.id} style={styles.productItem}>
                <Image
                  source={{uri: product.image}}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.priceSection}>
                    <View style={styles.priceAndTotal}>
                      <View style={styles.priceContainer}>
                        {product.discountPrice ? (
                          <>
                            <Text
                              style={styles.price}>{`Rp${product.price}`}</Text>
                            <Text
                              style={
                                styles.discountOriginalPrice
                              }>{`Rp${product.discountPrice.originalPrice}`}</Text>
                          </>
                        ) : (
                          <Text
                            style={styles.price}>{`Rp${product.price}`}</Text>
                        )}
                      </View>
                      <Text style={styles.totalPrice}>
                        Total: Rp{(product.quantity * product.price).toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(product.id, 'decrease')
                        }
                        style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {product.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(product.id, 'increase')
                        }
                        style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Pilih Lokasi Pengiriman</Text>
            <View
              style={[
                styles.pickerContainer,
                (pickerIsFocused || !!selectedLocation) && {
                  borderColor: '#000',
                },
              ]}>
              <Picker
                selectedValue={selectedLocation}
                onFocus={() => setPickerIsFocused(true)}
                onBlur={() => setPickerIsFocused(false)}
                style={[styles.picker, !!selectedLocation && {color: '#000'}]}
                onValueChange={itemValue => {
                  setSelectedLocation(itemValue);
                  console.log('Selected location:', itemValue);
                }}>
                <Picker.Item label="Pilih" value="" />
                {locations.map(location => (
                  <Picker.Item
                    key={location.id}
                    label={`${location.name} ${
                      location.type ? `(${location.type})` : ''
                    }`}
                    value={location.name}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.courierSection}>
            <Text style={styles.sectionTitle}>Pilih Kurir</Text>
            <View
              style={[
                styles.pickerContainer,
                (pickerIsFocused || !!selectedCourier) && {borderColor: '#000'},
              ]}>
              <Picker
                selectedValue={selectedCourier}
                onFocus={() => setPickerIsFocused(true)}
                onBlur={() => setPickerIsFocused(false)}
                style={[styles.picker, !!selectedCourier && {color: '#000'}]}
                onValueChange={itemValue => {
                  setSelectedCourier(itemValue);
                  console.log('Selected courier:', itemValue);
                }}>
                <Picker.Item label="Pilih" value="" />
                {couriers.map(courier => (
                  <Picker.Item
                    key={courier.name}
                    label={`${courier.name} (Rp${courier.price})`}
                    value={courier.name}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.couponSection}>
            <Text style={styles.sectionTitle}>Kupon</Text>
            <View style={styles.couponInputButtonContainer}>
              <TextInput
                onFocus={e =>
                  e.target.setNativeProps({style: {borderColor: '#000'}})
                }
                onBlur={e => {
                  if (!couponCode) {
                    e.target.setNativeProps({style: {borderColor: '#888'}});
                  }
                }}
                style={styles.couponInput}
                placeholderTextColor={'#888'}
                placeholder="Masukkan kode diskon"
                value={couponCode}
                onChangeText={setCouponCode}
              />
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyCoupon}>
                <Text style={styles.applyButtonText}>Terapkan</Text>
              </TouchableOpacity>
            </View>
            {couponError ? (
              <Text style={styles.errorText}>{couponError}</Text>
            ) : null}
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.totalText}>
              Subtotal: Rp {totals.productTotal.toFixed(2) || 0}
            </Text>
            {appliedCoupon && (
              <Text style={styles.totalText}>
                Diskon Kupon: -Rp {totals.discountAmount.toFixed(2)}
              </Text>
            )}
            <Text style={styles.totalText}>
              Kurir: Rp {totals?.courierPrice?.toFixed(2) || 0}
            </Text>
            <Text style={styles.grandTotal}>
              Total: Rp {totals.grandTotal.toFixed(2) || 0}
            </Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  // headerIconButton: {
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   bottom: 0,
  //   justifyContent: 'center',
  // },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Accent color for the header title
    // flex: 1,
    textAlign: 'center',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productList: {
    marginBottom: 0,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000', // Black for the product name
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  priceAndTotal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3', // Black for the product price
    marginRight: 10,
  },
  discountOriginalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black for the total price
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#4C76A3',
    // borderColor: '#4C76A3',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#fff', // Accent color for the quantity button text
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000', // Black for the quantity text
  },
  locationSection: {
    marginBottom: 5,
  },
  courierSection: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black for the section title
  },
  pickerContainer: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor: '#fff',
  },
  picker: {
    color: '#888',
  },
  couponSection: {
    marginBottom: 20,
  },
  couponInputButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    fontSize: 16,
    flex: 1,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    // height: 50, // Matching the height with the picker
    color: '#000',
  },
  applyButton: {
    backgroundColor: '#4C76A3',
    paddingHorizontal: 15,
    justifyContent: 'center',
    // height: 50, // Matching the height with the input
    borderRadius: 10,
    paddingVertical: 19,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    // marginBottom: 10,
  },
  totalSection: {
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000', // Black for the subtotal and discount texts
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3', // Black for the grand total text
  },
  checkoutButton: {
    backgroundColor: '#4C76A3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
