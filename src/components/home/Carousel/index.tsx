import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Carousel, {CarouselProps} from 'react-native-snap-carousel';

const {width: screenWidth} = Dimensions.get('window');

// Define type for carousel data items
interface CarouselItem {
  title: string;
  color: string;
}

const carouselData: CarouselItem[] = [
  {title: 'Item 1', color: '#FF6347'},
  {title: 'Item 2', color: '#4682B4'},
  {title: 'Item 3', color: '#32CD32'},
];

const MyCarousel: React.FC = () => {
  const _renderItem = ({item}: {item: CarouselItem}) => {
    return (
      <View style={[styles.slide, {backgroundColor: item.color}]}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 0.8;

  return (
    <Carousel
      data={carouselData}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      layout={'default'}
      style={{padding: 20}}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 200,
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyCarousel;
