/* eslint-disable no-param-reassign */
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import Carousel from './Carousel';

SwiperCore.use([Navigation]);

function Featured() {
  const outletContext = useOutletContext();
  return <Carousel listName="Videos" datas={outletContext.videos} />;
}

export default Featured;
