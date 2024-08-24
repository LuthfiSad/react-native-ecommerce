// carousel/carouselList.tsx

import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet } from 'react-native';
import CarouselItem from './carouselItem';

// Menentukan dimensi layar
const { width } = Dimensions.get('window');

const carouselData = [
  { id: '1', title: 'Item 1', color: '#FF6347' },
  { id: '2', title: 'Item 2', color: '#4682B4' },
  { id: '3', title: 'Item 3', color: '#32CD32' },
];

const CarouselList = () => {
  return (
    <View style={styles.container}>
      <Carousel
        data={carouselData}
        renderItem={({ item }) => <CarouselItem item={item} />}
        sliderWidth={width}
        itemWidth={width * 0.8}
        layout={'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CarouselList;
