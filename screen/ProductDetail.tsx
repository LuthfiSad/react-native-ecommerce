import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

interface Product {
  imgUrl: string;
  title: string;
  rating: number;
  reviews: {
    userImage: string;
    userName: string;
    description: string;
    rating: number;
  }[];
  sold: number;
  price: number;
  discountPrice?: number;
  description: string;
}

type ProductDetailScreenProps = NativeStackScreenProps<
  ParamListBase,
  'ProductDetail'
>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {product} = route.params as {product: Product};
  const [selectedTab, setSelectedTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#4C76A3" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <MaterialIcons name="favorite-border" size={24} color="#4C76A3" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="share" size={24} color="#4C76A3" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={{uri: product.imgUrl}} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>
          {product.discountPrice ? (
            <View style={styles.priceContainer}>
              <Text style={styles.discountPrice}>
                Rp{product.discountPrice}
              </Text>
              <Text style={styles.originalPrice}>Rp{product.price}</Text>
            </View>
          ) : (
            <Text style={styles.price}>Rp{product.price}</Text>
          )}
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, i) => (
              <FontAwesome
                key={i}
                name="star"
                size={14}
                color={i < (product.rating || 0) ? '#FFD700' : '#ccc'}
              />
            ))}
            <Text style={styles.soldText}>({product.sold} terjual)</Text>
          </View>

          <View style={styles.sizeContainer}>
            {['S', 'M', 'L', 'XL'].map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.activeSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}>
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.activeSizeText,
                  ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setSelectedTab('description')}
              style={[
                styles.tabButton,
                selectedTab === 'description' && styles.activeTab,
              ]}>
              <Text style={styles.tabText}>Deskripsi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('reviews')}
              style={[
                styles.tabButton,
                selectedTab === 'reviews' && styles.activeTab,
              ]}>
              <Text style={styles.tabText}>Ulasan</Text>
            </TouchableOpacity>
          </View>

          {selectedTab === 'description' ? (
            <Text style={styles.descriptionText}>{product.description}</Text>
          ) : (
            <View style={styles.reviewsContainer}>
              {product?.reviews?.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Image
                    source={{uri: review.userImage}} // Asumsi bahwa review.userImage adalah URL gambar user
                    style={styles.userImage}
                  />
                  <View style={styles.reviewContent}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.userName}>{review.userName}</Text>
                      <View style={styles.ratingContainer}>
                        {[...Array(5)].map((_, i) => (
                          <FontAwesome
                            key={i}
                            name="star"
                            size={14}
                            color={
                              i < (review.rating || 0) ? '#FFD700' : '#ccc'
                            }
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewDescription}>
                      {review.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 60, // Reserve space for the footer
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#4C76A3',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  discountPrice: {
    color: '#4C76A3',
    marginRight: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  reviewsContainer: {
    // marginBottom: 10,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewDescription: {
    // marginLeft: 10,
    color: '#555',
  },
  userName: {
    fontWeight: 'bold',
    color: '#222',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewText: {
    color: '#555',
  },
  soldText: {
    marginLeft: 10,
    color: '#555',
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#4C76A3',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    margin: 5,
    width: 60,
    alignItems: 'center',
  },
  sizeText: {
    color: '#4C76A3',
    fontWeight: 'bold',
  },
  activeSizeButton: {
    backgroundColor: '#4C76A3',
  },
  activeSizeText: {
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4C76A3',
  },
  tabText: {
    color: '#4C76A3',
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#555',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2, // Add shadow for iOS
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: {width: 0, height: -2}, // Add shadow for iOS
    shadowOpacity: 0.1, // Add shadow for iOS
    shadowRadius: 3, // Add shadow for iOS
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#4C76A3',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4C76A3',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
