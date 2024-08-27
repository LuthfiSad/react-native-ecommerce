import React, {useState} from 'react';
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

  const [selectedCourier, setSelectedCourier] = useState(' ');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');

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
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(false);
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
                        <Text style={styles.price}>{`Rp${product.price}`}</Text>
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
                    <Text style={styles.quantityText}>{product.quantity}</Text>
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

        <View style={styles.courierSection}>
          <Text style={styles.sectionTitle}>Pilih Kurir</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCourier}
              onValueChange={itemValue => {
                setSelectedCourier(itemValue);
                console.log(itemValue);
              }}>
              <Picker.Item label="Pilih" value=" " />
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
          <View style={styles.couponInputButtonContainer}>
            <TextInput
              style={styles.couponInput}
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
            Subtotal: Rp{totals.productTotal.toFixed(2)}
          </Text>
          {appliedCoupon && (
            <Text style={styles.totalText}>
              Diskon Kupon: -Rp{totals.discountAmount.toFixed(2)}
            </Text>
          )}
          <Text style={styles.totalText}>
            Kurir: Rp{totals?.courierPrice?.toFixed(2)}
          </Text>
          <Text style={styles.grandTotal}>
            Total: Rp{totals.grandTotal.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Bayar Sekarang</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  productList: {
    marginBottom: 20,
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
    color: '#999',
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
  courierSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black for the section title
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  couponSection: {
    marginBottom: 20,
  },
  couponInputButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    height: 50, // Matching the height with the picker
    color: '#000',
  },
  applyButton: {
    backgroundColor: '#4C76A3',
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: 50, // Matching the height with the input
    borderRadius: 5,
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
