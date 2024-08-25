import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface CardItemProps {
  product: {
    imgUrl: string;
    title: string;
    rating: number;
    reviews: number;
    sold: number;
    price: number;
    discountPrice?: number;
  };
}

const CardItem: React.FC<CardItemProps> = ({product}) => {
  const {imgUrl, title, rating, reviews, sold, price, discountPrice} = product;

  return (
    <View style={styles.card}>
      <Image source={{uri: imgUrl}} style={styles.image} />
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
          <Text style={styles.reviewText}>{`${reviews} ulasan`}</Text>
        </View>
      </View>
    </View>
  );
};

const CardProductList = () => {
  const products = [
    {
      imgUrl: 'https://picsum.photos/200/300',
      title: 'Product 1',
      rating: 4,
      reviews: 120,
      sold: 200,
      price: 150000,
      discountPrice: 120000,
    },
    {
      imgUrl: 'https://picsum.photos/200/300',
      title: 'Product 2',
      rating: 5,
      reviews: 200,
      sold: 300,
      price: 200000,
      discountPrice: null,
    },
    // Tambahkan produk lainnya
  ];
  return (
    <View style={styles.cardList}>
      {products.map((product, index) => (
        <CardItem key={index} product={product as CardItemProps['product']} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 10,
  },
  title: {
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

export default CardProductList;
