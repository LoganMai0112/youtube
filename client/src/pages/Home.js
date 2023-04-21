/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../components/Card';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import axiosClient from '../axios/axiosConfig';

function Home() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [streams, setStreams] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [maxPages, setMaxPages] = useState(1);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '500px',
      threshold: 0.01,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      await axiosClient
        .get(`${process.env.REACT_APP_SERVER_URL}/videos?page=${page}`)
        .then((res) => {
          setMaxPages(res.data.pagy.pages);
          setVideos((data) => [...data, ...res.data.videos.data]);
          setChannels((data) => [...data, ...res.data.videos.included]);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            toast(err.response.data.message);
          }
        });
    };
    if (page <= maxPages) {
      getVideos();
    }
  }, [page]);

  useEffect(() => {
    const getStreams = async () => {
      await axiosClient
        .get(`${process.env.REACT_APP_SERVER_URL}/streams`)
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
        <Swiper spaceBetween={25} slidesPerView={2.5}>
          {streams.map((item) => (
            <SwiperSlide>
              <Link to={`/streams/${item.id}`}>
                <img
                  className="object-cover w-full h-60 rounded-2xl cursor-pointer"
                  src={
                    item.attributes.thumbnailUrl
                      ? item.attributes.thumbnailUrl
                      : '/logo.png'
                  }
                  alt="thumbnail"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full mb-5 h-fit px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5 overflow-y-scroll">
        {videos &&
          videos.map((video) => (
            <Card
              key={video.id}
              id={video.id}
              title={video.attributes.title}
              thumbnailUrl={video.attributes.thumbnailUrl}
              channel={findChannel(video.relationships.user.data.id)}
              createdAt={video.attributes.createdAt}
              view={video.attributes.viewsCount}
            />
          ))}
      </div>
      <div ref={containerRef}>
        {loading && (
          <div className="w-full h-fit px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5 overflow-y-scroll">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                role="status"
                className="w-full rounded shadow animate-pulse"
              >
                <div className="flex items-center justify-center w-full aspect-video mb-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="flex items-center mt-4 space-x-3">
                  <div className="rounded-full w-9 h-9 bg-gray-300" />
                  <div>
                    <div className="h-5 bg-gray-200 rounded-md dark:bg-gray-700 w-48 mb-2" />
                    <div className="w-32 h-2 bg-gray-200 rounded-sm dark:bg-gray-700" />
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
