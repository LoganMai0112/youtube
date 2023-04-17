/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';
import Card from '../Card';

function Carousel({ listName, datas }) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className="px-5 mt-5">
      {listName && <div className="py-3 text-lg text-white">{listName}</div>}
      <Swiper
        className="relative"
        spaceBetween={5}
        slidesPerView={5}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
      >
        {datas &&
          datas.map((data) => (
            <SwiperSlide>
              <Card
                type={data.type}
                id={data.id}
                title={data.attributes.title}
                createdAt={data.attributes.createdAt}
                thumbnailUrl={data.attributes.thumbnailUrl}
                status={data.attributes.status}
                view={data.attributes.viewCount}
              />
            </SwiperSlide>
          ))}
        {datas && datas.length > 6 && (
          <div
            className="cursor-pointer bg-hover hover:bg-text-color rounded-full p-2  w-fit absolute right-0 z-10 top-1/2"
            ref={navigationNextRef}
          >
            <AiFillCaretRight className="w-5 h-5 fill-main-color" />
          </div>
        )}
        {datas && datas.length > 6 && (
          <div
            className="cursor-pointer bg-hover hover:bg-text-color rounded-full p-2  w-fit absolute left-0 z-10 top-1/2"
            ref={navigationPrevRef}
          >
            <AiFillCaretLeft className="w-5 h-5 fill-main-color" />
          </div>
        )}
      </Swiper>
    </div>
  );
}

export default Carousel;
