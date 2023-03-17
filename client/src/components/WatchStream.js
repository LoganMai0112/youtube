/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import { BiShare } from 'react-icons/bi';
import { RiPlayListAddFill } from 'react-icons/ri';
// import moment from 'moment';
// import parse from 'html-react-parser';
import RecommendSide from './RecommendSide/RecommendSide';
// import { UserContext } from '../contexts/UserContext';
// import LikeVideoButton from './LikeVideoButton';
import ShareVideoPortal from './ShareVideoPortal';
// import SubscribeButton from './SubscribeButton';

function WatchStream({ streamRef }) {
  // const currentUser = useContext(UserContext);
  // const [channel, setChannel] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  // const [liked, setLiked] = useState(false);
  // const [subscribed, setSubscribed] = useState();
  // const [likeCount, setLikeCount] = useState();
  const [shareBox, setShareBox] = useState(false);

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 px-5 h-fit">
        <video width="100%" height="100%" ref={streamRef} />
        <div className="flex w-full flex-col mt-4">
          {/* <p className="text-white text-2xl font-bold">{video.title}</p> */}
          <div className="flex justify-between items-center w-full pt-3">
            <div className="flex flex-row items-center">
              <div className="p-1 min-w-[48px] rounded-full border-dashed border-2 border-main-color mr-3">
                <img
                  // src={channel.avatarUrl}
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
              </div>
              <div>
                {/* <p className="text-white text-xl">{channel.name}</p> */}
                <p className="text-text-color text-sm">subscriber</p>
              </div>
              {/* {channel.id !== currentUser.id && (
                <SubscribeButton
                  subscribed={subscribed}
                  setSubscribed={setSubscribed}
                  channelId={channel.id}
                />
              )} */}
            </div>
            <div className="flex gap-4 items-center">
              {/* <LikeVideoButton
                liked={liked}
                likeCount={likeCount}
                setLikeCount={setLikeCount}
                setLiked={setLiked}
                videoId={params.videoId}
              /> */}
              <button
                type="button"
                onClick={() => setShareBox(true)}
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
              showDescription
                ? 'h-fit'
                : 'h-24 hover:bg-icon-color cursor-pointer'
            } rounded-2xl overflow-hidden`}
          >
            <p
              className=""
              onClick={() => {
                setShowDescription(true);
              }}
            >
              {/* <span>view - {moment(video.createdAt).fromNow()}</span> */}
              <br />
              {/* {parse(video.description ? video.description : '')} */}
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
      {shareBox && <ShareVideoPortal setShareBox={setShareBox} />}
    </div>
  );
}

export default WatchStream;
