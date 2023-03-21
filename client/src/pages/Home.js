/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../components/Card';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

function Home() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get('/videos');
      setVideos(response.data.data);
      setChannels(response.data.included);
    };

    try {
      getVideos();
    } catch (err) {
      toast('Something went wrong');
    }
  }, []);

  useEffect(() => {
    const getStreams = async () => {
      axios
        .get('/streams')
        .then((res) => {
          setStreams(res.data.data);
        })
        .catch((err) => toast(err));
    };

    getStreams();
  }, []);

  const findChannel = (channelId) => {
    const channel = channels.find((c) => c.id === channelId);
    return channel.attributes;
  };

  return (
    <div>
      <div className="px-5 mb-6 overflow-hidden">
        <Swiper
          spaceBetween={25}
          slidesPerView={2.5}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {streams.map((item) => (
            <SwiperSlide>
              <Link to={`/streams/${item.id}`}>
                <img
                  className="object-cover w-full h-60 rounded-2xl cursor-pointer"
                  src={item.attributes.thumbnailUrl}
                  alt="thumbnail"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full h-fit px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5 overflow-y-scroll">
        {videos.map((video) => (
          <Card
            key={video.id}
            id={video.id}
            title={video.attributes.title}
            thumbnailUrl={video.attributes.thumbnailUrl}
            channel={findChannel(video.relationships.user.data.id)}
            createdAt={video.attributes.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
