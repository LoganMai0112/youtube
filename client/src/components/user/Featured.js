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
  const findVideosOfPlaylist = (videos) =>
    videos.map((video) =>
      outletContext.includedPlaylists.find((c) => c.id === video.id)
    );

  return (
    <div>
      <Carousel listName="Videos" datas={outletContext.videos} />
      {outletContext.createdPlaylists &&
        outletContext.createdPlaylists.map((playlist) => (
          <Carousel
            listName={playlist.attributes.title}
            datas={findVideosOfPlaylist(playlist.relationships.videos.data)}
          />
        ))}
    </div>
  );
}

export default Featured;
