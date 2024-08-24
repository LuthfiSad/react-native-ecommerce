// carousel/carouselItem.tsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CarouselItemProps {
  item: {
    id: string;
    title: string;
    color: string;
  };
}

const CarouselItem: React.FC<CarouselItemProps> = ({item}) => {
  return (
    <View style={[styles.itemContainer, {backgroundColor: item.color}]}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 8,
    height: 200,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CarouselItem;
