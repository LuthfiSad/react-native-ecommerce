import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CartScreen = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Jean Coat',
      price: 24,
      quantity: 2,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      discount: null,
    },
    {
      id: 2,
      name: 'Pink Singlet',
      price: 28,
      quantity: 1,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      discount: null,
    },
    {
      id: 3,
      name: 'Plaid Shirt',
      price: 32,
      quantity: 3,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      discount: { originalPrice: 135, discountPercent: 29 },
    },
    {
      id: 4,
      name: "Orange Women's Sweater",
      price: 65,
      quantity: 1,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      discount: null,
    },
  ]);

  const [selectedCourier, setSelectedCourier] = useState('DHL');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');

  const couriers = [
    { name: 'DHL', price: 10 },
    { name: 'FedEx', price: 15 },
    { name: 'UPS', price: 12 },
  ];

  const handleQuantityChange: (id: number, action: 'increase' | 'decrease') => void = (id, action) => {
    setProducts(prevProducts =>
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
    const productTotal = products.reduce(
      (acc, product) =>
        acc +
        product.quantity *
          (product.discount
            ? product.price * (1 - product.discount.discountPercent / 100)
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
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={28} color="#4C76A3" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Keranjang Saya</Text>
        </View>

        <View style={styles.productList}>
          {products.map(product => (
            <View key={product.id} style={styles.productItem}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.priceSection}>
                  {product.discount ? (
                    <>
                      <Text style={styles.originalPrice}>
                        Rp{product.discount.originalPrice}
                      </Text>
                      <Text style={styles.discountedPrice}>
                        Rp{product.price}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.productPrice}>Rp{product.price}</Text>
                  )}
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(product.id, 'decrease')}
                    style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{product.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(product.id, 'increase')}
                    style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.totalPrice}>
                  Total: Rp{(product.quantity * product.price).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.courierSection}>
          <Text style={styles.sectionTitle}>Pilih Kurir</Text>
          <Picker
            selectedValue={selectedCourier}
            style={styles.picker}
            onValueChange={itemValue => setSelectedCourier(itemValue)}>
            {couriers.map(courier => (
              <Picker.Item
                key={courier.name}
                label={`${courier.name} (Rp${courier.price})`}
                value={courier.name}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.couponSection}>
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
        {couponError ? <Text style={styles.errorText}>{couponError}</Text> : null}

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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C76A3',
    flex: 1,
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
    color: '#4C76A3',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#4C76A3',
    fontWeight: 'bold',
  },
  discountedPrice: {
    fontSize: 16,
    color: '#4C76A3',
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#000',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#4C76A3',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#4C76A3',
  },
  courierSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4C76A3',
  },
  picker: {
    height: 50,
    color: '#4C76A3',
  },
  couponSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  couponInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#4C76A3',
  },
  applyButton: {
    backgroundColor: '#4C76A3',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
  },
  totalSection: {
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#4C76A3',
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CartScreen;
