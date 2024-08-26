import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  {name: 'All', icon: <Ionicons name="apps-outline" size={24} color="#000" />},
  // {
  //   name: 'Baju',
  //   icon: <Ionicons name="shirt-outline" size={24} color="#000" />,
  // },
  {
    name: 'Celana',
    icon: <Ionicons name="man-outline" size={24} color="#000" />,
  },
  {
    name: 'Sepatu',
    icon: <MaterialCommunityIcons name="shoe-sneaker" size={24} color="#000" />,
  },
  {name: 'Jam', icon: <Ionicons name="watch-outline" size={24} color="#000" />},
  {
    name: 'Kaos',
    icon: <Ionicons name="shirt-outline" size={24} color="#000" />,
  },
  {
    name: 'Kemeja',
    icon: <Ionicons name="shirt-outline" size={24} color="#000" />,
  },
  {name: 'Tas', icon: <Ionicons name="bag-outline" size={24} color="#000" />},
  {
    name: 'Topi',
    icon: <FontAwesome5 name="hat-cowboy" size={24} color="#000" />,
  },
  {
    name: 'Aksesoris',
    icon: <Ionicons name="glasses-outline" size={24} color="#000" />,
  },
];

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryPress: (categoryName: string) => void = categoryName => {
    setSelectedCategory(categoryName);
    console.log('Kategori yang dipilih:', categoryName);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryItem,
            selectedCategory === category.name && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryPress(category.name)}>
          {React.cloneElement(category.icon, {
            color: selectedCategory === category.name ? '#fff' : '#000',
          })}
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category.name && styles.selectedText,
            ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    // display: 'flex',
    // gap: 10,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    width: 90,
  },
  selectedCategory: {
    backgroundColor: '#4C76A3',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
});

export default CategoryList;
