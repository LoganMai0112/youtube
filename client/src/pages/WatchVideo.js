/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Player } from 'video-react';
import { BiShare } from 'react-icons/bi';
import { RiPlayListAddFill } from 'react-icons/ri';
import { AiFillFlag } from 'react-icons/ai';
import moment from 'moment';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import RecommendSide from '../components/recommend/RecommendSide';
import { UserContext, UserSignedInContext } from '../contexts/UserContext';
import LikeVideoButton from '../components/LikeVideoButton';
import Comment from '../components/Comment';
import ShareVideoPortal from '../components/ShareVideoPortal';
import SubscribeButton from '../components/SubscribeButton';
import SaveVideoPortal from '../components/SaveVideoPortal';
import ReportPortal from '../components/ReportPortal';

import 'video-react/dist/video-react.full';

function WatchVideo() {
  const [video, setVideo] = useState({});
  const [videoSource, setVideoSource] = useState('');
  const [channel, setChannel] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState();
  const [commentsCount, setCommentsCount] = useState();
  const [shareBox, setShareBox] = useState(false);
  const [reportBox, setReportBox] = useState(false);
  const [deletedYet, setDeletedYet] = useState();
  const [playerState, setPlayerState] = useState();
  const currentUser = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
  const [saveBox, setSaveBox] = useState(false);
  const signedIn = useContext(UserSignedInContext);

  const findChannel = (channelId, includedData) => {
    const videoCreator = includedData.find(
      (c) => c.id === channelId && c.type === 'user'
    );
    return videoCreator.attributes;
  };

  const countView = async () => {
    await axios
      .post(`/videos/${params.videoId}/view`)
      .then(() => {})
      .catch((err) => toast(err.message));
  };

  useEffect(() => {
    const getVideo = async () => {
      await axios
        .get(`/videos/${params.videoId}`)
        .then((res) => {
          const { attributes } = res.data.data;
          setVideo(attributes);
          setDeletedYet(attributes.deletedYet);
          setVideoSource(attributes.videoUrl);
          setChannel(
            findChannel(
              res.data.data.relationships.user.data.id,
              res.data.included
            )
          );
          setLikeCount(attributes.likesCount);
          setCommentsCount(attributes.commentsCount);
          if (attributes.likedYet && attributes.likedYet !== null) {
            setLiked(true);
          } else {
            setLiked(false);
          }
          playerState.load();
        })
        .catch((err) => {
          if (err.response) {
            toast(err.response.data.message);
            navigate('/unavailable');
          }
        });
    };

    getVideo();
  }, [params]);

  useEffect(() => {
    countView();
  }, []);

  const softDelete = async () => {
    await axios
      .delete(`/videos/${params.videoId}`)
      .then((res) => {
        if (res) {
          toast('Deleted video');
          setDeletedYet(true);
          navigate('/admin/reports');
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  const recover = async () => {
    await axios
      .put(`/videos/${params.videoId}/recover`)
      .then((res) => {
        if (res) {
          setDeletedYet(false);
          toast('Recovery video');
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 px-5 h-fit">
        {videoSource && (
          <div className="max-h-[600px]">
            <Player
              fluid={false}
              height={600}
              width="100%"
              ref={(player) => {
                setPlayerState(player);
              }}
              autoPlay
            >
              <source src={videoSource} />
            </Player>
          </div>
        )}
        <div className="flex w-full flex-col mt-4">
          {video && video.status === 'privated' && (
            <div className="p-[1px] bg-hover w-fit">
              <p className="text-text-color">Private</p>
            </div>
          )}
          <p className="text-white text-2xl font-bold">{video.title}</p>
          <div className="flex justify-between items-center w-full pt-3">
            <div className="flex flex-row items-center">
              <div className="p-1 min-w-[48px] rounded-full border-dashed border-2 border-main-color mr-3">
                <Link to={`/users/${channel.id}`}>
                  <img
                    src={channel.avatarUrl}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </Link>
              </div>
              <div>
                <Link to={`/users/${channel.id}`}>
                  <p className="text-white text-xl">{channel.name}</p>
                  <p className="text-text-color text-sm">
                    {channel.subscribersCount > 0
                      ? `${channel.subscribersCount} subscribers`
                      : 'No subscribers'}
                  </p>
                </Link>
              </div>
              {channel.id !== currentUser.id && (
                <SubscribeButton
                  subscribedYet={channel.subscribedYet !== null}
                  channelId={channel.id}
                />
              )}
              {channel.id === currentUser.id && (
                <button
                  type="button"
                  className="py-2 px-4 rounded-3xl bg-main-color text-black ml-5"
                  onClick={() => navigate(`/videos/${params.videoId}/edit`)}
                >
                  Edit video
                </button>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <LikeVideoButton
                liked={liked}
                likeCount={likeCount}
                setLikeCount={setLikeCount}
                setLiked={setLiked}
                videoId={params.videoId}
              />
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
                onClick={() => {
                  if (signedIn) {
                    setSaveBox(true);
                  } else {
                    navigate('/login');
                  }
                }}
              >
                <RiPlayListAddFill className="w-5 h-5" />
                Save
              </button>
              {currentUser.role !== 'admin' && (
                <button
                  type="button"
                  className="text-white bg-main-color/50 px-4 py-2 rounded-3xl hover:bg-main-color hover:text-black flex gap-2 items-center"
                  onClick={() => {
                    if (signedIn) {
                      setReportBox(true);
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  <AiFillFlag className="w-5 h-5" />
                  Report
                </button>
              )}
              {currentUser.role === 'admin' && !deletedYet && (
                <button
                  type="button"
                  className="text-white bg-red-500/50 px-4 py-2 rounded-3xl hover:text-black flex gap-2 items-center"
                  onClick={() => softDelete()}
                >
                  Remove
                </button>
              )}
              {currentUser.role === 'admin' && deletedYet && (
                <button
                  type="button"
                  className="text-white bg-red-500/50 px-4 py-2 rounded-3xl hover:text-black flex gap-2 items-center"
                  onClick={() => recover()}
                >
                  Recover
                </button>
              )}
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
              <span>
                <div id="view">{video.viewsCount || 0} views - </div>
                {moment(video.createdAt).fromNow()}
              </span>
              <br />
              {parse(video.description ? video.description : '')}
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
          <Comment
            videoId={params.videoId}
            commentsCount={commentsCount}
            setCommentsCount={setCommentsCount}
          />
        </div>
      </div>
      <div className="w-[420px] flex flex-col">
        <RecommendSide />
      </div>
      {shareBox && <ShareVideoPortal setShareBox={setShareBox} />}
      {saveBox && (
        <SaveVideoPortal setSaveBox={setSaveBox} videoId={params.videoId} />
      )}
      {reportBox && (
        <ReportPortal
          setReportBox={setReportBox}
          videoId={params.videoId}
          channelId={channel.id}
        />
      )}
    </div>
  );
}

export default WatchVideo;
