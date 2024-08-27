import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

interface Review {
  description: string;
  rating: number;
}

interface ProductFavorite {
  id: number;
  imgUrl: string;
  title: string;
  rating: number;
  reviews: Review[];
  sold: number;
  price: number;
  discountPrice?: number;
  description: string;
  isLike: boolean;
}

interface CardItemProps {
  product: ProductFavorite;
  onRemoveFavorite: (id: number) => void;
}

const CardItem: React.FC<CardItemProps> = ({product, onRemoveFavorite}) => {
  const {
    id,
    imgUrl,
    title,
    rating,
    reviews,
    sold,
    price,
    discountPrice,
    isLike,
  } = product;
  const navigation = useNavigation<any>(); // Use `any` if types are not properly set for navigation

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ProductDetail', {product})}>
      <View style={styles.card}>
        <Image source={{uri: imgUrl}} style={styles.image} />
        <TouchableOpacity
          style={styles.loveButton}
          onPress={() => onRemoveFavorite(id)}>
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
            <Text style={styles.reviewText}>{`${reviews.length} ulasan`}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const FavoriteScreen = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<ProductFavorite[]>([
    {
      id: 1,
      imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      title: 'Jean Coat',
      rating: 4,
      reviews: [],
      sold: 25,
      price: 100000,
      discountPrice: undefined,
      description: 'Jean coat yang sangat stylish dan nyaman dipakai.',
      isLike: true,
    },
    {
      id: 2,
      imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      title: 'Pink Singlet',
      rating: 5,
      reviews: [],
      sold: 40,
      price: 120000,
      discountPrice: 100000,
      description: 'Singlet pink yang modis dan ringan.',
      isLike: true,
    },
    // Tambahkan produk lainnya sesuai kebutuhan
  ]);

  const handleRemoveFavorite = (id: number) => {
    setFavoriteProducts(favoriteProducts.filter(product => product.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.headerIconButton}>
            <MaterialIcons name="arrow-back" size={28} color="#4C76A3" />
          </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Favorit Saya</Text>
      </View>
      <View style={styles.cardList}>
        {favoriteProducts.map(product => (
          <CardItem
            key={product.id}
            product={product}
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
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
  cardList: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  loveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
});

export default FavoriteScreen;
