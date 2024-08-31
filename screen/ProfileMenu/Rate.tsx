import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonHeader from '../../src/components/_global/ButtonHeader';

const RateScreen = () => {
  const productsToRate = [
    {
      id: '1',
      title: 'Produk A',
      quantity: 2,
      deliveryDate: '20 September 2024',
      imageUrl: 'https://via.placeholder.com/100', // Gambar dummy
    },
    {
      id: '2',
      title: 'Produk B',
      quantity: 10,
      deliveryDate: '30 September 2024',
      imageUrl: 'https://via.placeholder.com/100', // Gambar dummy
    },
    // Tambahkan produk lainnya di sini
  ];

  const navigation = useNavigation<any>();

  interface Product {
    id: string;
    title: string;
    deliveryDate: string;
    imageUrl: string;
    quantity: number;
  }

  const [ratings, setRatings] = useState<{[key: string]: number}>({});
  const [messages, setMessages] = useState<{[key: string]: string}>({});

  const handleRatingChange = (productId: string, rating: number) => {
    setRatings(prev => ({...prev, [productId]: rating}));
  };

  const handleMessageChange = (productId: string, message: string) => {
    setMessages(prev => ({...prev, [productId]: message}));
  };

  const renderStars = (rating: number, productId: string) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRatingChange(productId, star)}>
            <Icon
              name="star"
              size={25}
              color={star <= rating ? '#FFD700' : '#E0E0E0'}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderProductItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('RatingScreen', {productId: item.id})}>
      <View style={styles.productItem}>
        <Image source={{uri: item.imageUrl}} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.quantity}>QTY: {item.quantity}</Text>
          <Text style={styles.deliveryDate}>
            Diterima pada: {item.deliveryDate}
          </Text>
        </View>
      </View>
      {renderStars(ratings[item.id] || 0, item.id)}
      <TextInput
        style={styles.textarea}
        multiline
        placeholder="Tulis pesan..."
        onFocus={e => e.target.setNativeProps({style: {borderColor: '#000'}})}
        onBlur={e => {
          if (!messages[item.id]) {
            e.target.setNativeProps({style: {borderColor: '#888'}});
          }
        }}
        value={messages[item.id] || ''}
        onChangeText={text => handleMessageChange(item.id, text)}
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Kirim</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
      <ButtonHeader title='Ulasan' />
      <View style={styles.container}>
        <FlatList
          data={productsToRate}
          keyExtractor={item => item.id}
          renderItem={renderProductItem}
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
  productContainer: {
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
  productItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 14,
    color: '#333',
    // marginTop: 5,
  },
  deliveryDate: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    marginRight: 5,
  },
  textarea: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#4C76A3',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default RateScreen;
