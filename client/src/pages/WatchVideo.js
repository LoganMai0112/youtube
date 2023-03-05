/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from 'video-react';
import { BiLike, BiShare } from 'react-icons/bi';
import { RiPlayListAddFill } from 'react-icons/ri';
import moment from 'moment';
import RecommendSide from '../components/RecommendSide/RecommendSide';

function WatchVideo() {
  const [video, setVideo] = useState({});
  const [videoSource, setVideoSource] = useState();
  const [channel, setChannel] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  const player = useRef();
  const params = useParams();

  useEffect(() => {
    const getVideo = async () => {
      const res = await axios.get(`/videos/${params.videoId}`);
      setVideo(res.data.data.attributes);
      setVideoSource(res.data.data.attributes.videoUrl);
      setChannel(res.data.included[0].attributes);
      player.current.load();
    };

    getVideo();
  }, [params, videoSource]);
  return (
    <div className="flex h-full w-full">
      <div className="flex-1 px-5 h-fit">
        {videoSource && (
          <Player ref={player}>
            <source src={videoSource} />
          </Player>
        )}
        <div className="flex w-full flex-col mt-4">
          <p className="text-white text-2xl font-bold">{video.title}</p>
          <div className="flex justify-between items-center w-full pt-3">
            <div className="flex flex-row items-start">
              <div className="p-1 min-w-[48px] rounded-full border-dashed border-2 border-main-color mr-3">
                <img
                  src={channel.avatarUrl}
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
              </div>
              <div>
                <p className="text-white text-xl">{channel.name}</p>
                <p className="text-text-color text-sm">suscriber</p>
              </div>
              <button
                type="button"
                className="py-2 px-4 rounded-3xl bg-main-color text-black ml-5"
              >
                Subscribe
              </button>
            </div>
            <div className="flex gap-4 items-center">
              <button
                type="button"
                className="text-white bg-main-color/50 px-4 py-2 rounded-3xl hover:bg-main-color hover:text-black flex gap-2 items-center"
              >
                <BiLike className="w-6 h-6" />
                Like
              </button>
              <button
                type="button"
                className="text-white bg-main-color/50 px-4 py-2 rounded-3xl hover:bg-main-color hover:text-black flex gap-2 items-center"
              >
                <BiShare className="w-6 h-6" />
                Share
              </button>
              <button
                type="button"
                className="text-white bg-main-color/50 px-4 py-2 rounded-3xl hover:bg-main-color hover:text-black flex gap-2 items-center"
              >
                <RiPlayListAddFill className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
          <div
            className={`p-3 mt-5 bg-icon-color/50 text-white font-normal w-full ${
              showDescription ? 'h-fit' : 'h-24 hover:bg-icon-color'
            } rounded-2xl overflow-hidden`}
          >
            <p
              className=""
              onClick={() => {
                setShowDescription(true);
              }}
            >
              <span>{moment(video.createdAt).fromNow}</span>
              <br />
              {video.description}
            </p>
            {showDescription && (
              <button
                type="button"
                className="font-bold"
                onClick={() => {
                  setShowDescription(false);
                }}
              >
                Show less
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-[420px] flex flex-col">
        <RecommendSide />
      </div>
    </div>
  );
}

export default WatchVideo;
