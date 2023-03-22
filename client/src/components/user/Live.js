import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Carousel from './Carousel';

function Live() {
  const outletContext = useOutletContext();

  return <Carousel datas={outletContext.streams} />;
}

export default Live;
