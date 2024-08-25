import {ScrollView, Text} from 'react-native';
import React from 'react';
import CarouselList from '../src/components/home/Carousel/carouselList';
import FilterHeader from '../src/components/home/Filter';
import CategoryList from '../src/components/home/Category/categoryList';
import CardProductList from '../src/components/home/products/productList';
// import CarouselComponent from '../src/components/home/Carousel';

const Home = () => {
  return (
    <ScrollView>
      <FilterHeader />
      <CarouselList />
      <CategoryList />
      <CardProductList />
      {/* <Text>Home</Text> */}
      {/* <CarouselComponent /> */}
      {/* <Text>Home</Text> */}
    </ScrollView>
  );
};

export default Home;
