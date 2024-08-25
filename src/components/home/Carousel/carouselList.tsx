import React, {useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

interface CarouselCardItemProps {
  item: {title: string; body: string; imgUrl: string};
  index: number;
}

const CarouselCardItem: React.FC<CarouselCardItemProps> = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{uri: item.imgUrl}} style={styles.image} />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
};

const data = [
  {
    title: 'Aenean leo',
    body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    imgUrl: 'https://picsum.photos/id/11/200/300',
  },
  {
    title: 'In turpis',
    body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
    imgUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    title: 'Lorem Ipsum',
    body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: 'https://picsum.photos/id/12/200/300',
  },
];

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.85);

const CarouselList: React.FC = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        layoutCardOffset={9}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        onSnapToItem={index => setIndex(index)}
        inactiveSlideShift={0}
        useScrollView={true}
        vertical={false} // Tambahkan properti vertical
        loop={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 25, // Memperpanjang dot saat aktif
          height: 8,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(76, 118, 163, 0.92)',
        }}
        inactiveDotStyle={{
          width: 15,
          height: 15,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        inactiveDotOpacity={0.4}
        // inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center', // Untuk memastikan carousel di tengah
    justifyContent: 'center',
    width: '100%',
    gap: -20,
    marginTop: 20,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 150,
    alignSelf: 'center', // Memastikan gambar di tengah
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center', // Memastikan teks di tengah
  },
});

export default CarouselList;
