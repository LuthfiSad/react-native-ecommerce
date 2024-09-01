import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {products} from '../../../config';
import {ProductTypes} from '../../productDetail/types/product';

const CardItem: React.FC<{product: ProductTypes}> = ({product}) => {
  const {
    imgUrl,
    title,
    rating,
    reviews,
    sold,
    price,
    discountPrice,
    id,
    isLike,
  } = product;
  const navigation = useNavigation<any>(); // Use `any` if types are not properly set for navigation

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ProductDetail', {id})}>
      <View style={styles.card}>
        <Image source={{uri: imgUrl}} style={styles.image} />
        <TouchableOpacity style={styles.loveButton}>
          <FontAwesome name="heart" size={20} color={isLike ? 'red' : '#ccc'} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, i) => (
              <FontAwesome
                key={i}
                name="star"
                size={14}
                color={i < rating ? '#FFD700' : '#ccc'}
              />
            ))}
            <Text style={styles.ratingText}>{`(${rating})`}</Text>
          </View>
          <Text style={styles.soldText}>{`${sold} terjual`}</Text>
          <View style={styles.priceContainer}>
            {discountPrice ? (
              <>
                <Text style={styles.discountPrice}>{`Rp${discountPrice}`}</Text>
                <Text style={styles.originalPrice}>{`Rp${price}`}</Text>
              </>
            ) : (
              <Text style={styles.price}>{`Rp${price}`}</Text>
            )}
          </View>
          <View style={styles.reviewContainer}>
            <MaterialIcons name="rate-review" size={16} color="#4C76A3" />
            <Text style={styles.reviewText}>{`${reviews?.length} ulasan`}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ProductList: React.FC<{title?: string}> = ({title}) => {
  return (
    <>
      {title && <Text style={styles.titleList}>{title}</Text>}
      <View style={styles.cardList}>
        {products.map((product, index) => (
          <CardItem key={index} product={product} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleList: {
    borderTopColor: '#aaa',
    paddingVertical: 15,
    borderTopWidth: 1,
    marginTop: 30,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
    paddingHorizontal: 10,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  loveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  soldText: {
    fontSize: 12,
    color: '#555',
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
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default ProductList;
