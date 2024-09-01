import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReviewItem from './ReviewItem';
import {ProductTypes} from './types/product';
import ProductList from '../home/products/productList';

interface ProductInfoProps {
  product: ProductTypes;
}

const ProductInfo: React.FC<ProductInfoProps> = ({product}) => {
  const [selectedTab, setSelectedTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <View style={styles.infoContainer}>
      <Image source={{uri: product.imgUrl}} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>
      {product.discountPrice ? (
        <View style={styles.priceContainer}>
          <Text style={styles.discountPrice}>Rp{product.discountPrice}</Text>
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

      {product.sizes && product.sizes.length > 0 && (
        <View style={styles.sizeContainer}>
          {product.sizes.map(size => (
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
      )}

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
        <>
          <Text style={styles.descriptionText}>{product.description}</Text>
          <ProductList title="Produk Serupa" />
        </>
      ) : (
        <>
          <View style={styles.reviewsContainer}>
            {product?.reviews?.map((review, index) => (
              <ReviewItem
                key={index}
                {...review}
                isLastItem={index === (product?.reviews?.length as number) - 1}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#222',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  soldText: {
    marginLeft: 5,
    color: '#888',
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    paddingBottom: 5,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4C76A3',
  },
  tabText: {
    color: '#888',
    fontWeight: 'bold',
  },
  descriptionText: {
    minHeight: 120,
    color: '#555',
  },
  reviewsContainer: {
    marginTop: 10,
  },
});

export default ProductInfo;
