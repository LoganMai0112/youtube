/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';
import SubscribeButton from '../components/SubscribeButton';

function User() {
  const params = useParams();
  const lastSegment = window.location.pathname.split('/').pop();
  const [user, setUser] = useState();
  const currentUser = useContext(UserContext);
  const [isActive, setIsActive] = useState(lastSegment);
  const [streams, setStreams] = useState();
  const [videos, setVideos] = useState();
  const [deletedYet, setDeletedYet] = useState();
  const [createdPlaylists, setCreatedPlaylists] = useState();
  const [savedPlaylists, setSavedPlaylists] = useState();
  const [includedPlaylists, setIncludedPlaylists] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/${params.userId}`)
        .then((res) => {
          setCreatedPlaylists(res.data.createdPlaylists.data);
          setIncludedPlaylists(res.data.createdPlaylists.included);
          setSavedPlaylists(res.data.savedPlaylists.data);
          setUser(res.data.user.data.attributes);
          setDeletedYet(res.data.user.data.attributes.deletedYet);
          setVideos(res.data.videos.data);
          setStreams(res.data.streams.data);
        })
        .catch((err) => {
          toast(err.response.data.message);
          navigate('/unavailable');
        });
    };

    getUser();
  }, []);

  const softDelete = async () => {
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/users/${params.userId}`)
      .then((res) => {
        if (res) {
          toast('Baned user');
          setDeletedYet(true);
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  const recover = async () => {
    await axios
      .put(`${process.env.REACT_APP_SERVER_URL}/users/${params.userId}/recover`)
      .then((res) => {
        if (res) {
          toast('Recover user');
          setDeletedYet(false);
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  return (
    <div>
      {user && user.coverUrl && (
        <img
          className="w-full h-48 mb-5 object-cover"
          src={user.coverUrl}
          alt="cover"
        />
      )}
      {user && (
        <div className="w-full flex justify-between px-5 pb-1">
          <div className="flex justify-between gap-5">
            <img
              className="rounded-full w-20 h-20 object-cover"
              src={user.avatarUrl}
              alt="avatar"
            />
            <div className="text-text-color">
              <p className="text-white text-2xl">{user.name}</p>
              <p>{user.email}</p>
              {user.subscribersCount > 0 ? (
                <p>{user.subscribersCount} subscribers</p>
              ) : (
                <p>No subscribers</p>
              )}
            </div>
          </div>
          {currentUser.id === user.id && currentUser.role !== 'admin' ? (
            <Link to="/settings">
              <div className="px-4 py-2 bg-main-color hover:bg-yellow-600 rounded-2xl">
                Manage channel
              </div>
            </Link>
          ) : (
            <div className="flex items-center">
              <SubscribeButton
                subscribedYet={user.subscribedYet !== null}
                channelId={user.id}
              />
              {currentUser.role === 'admin' && !deletedYet && (
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-2xl ml-3"
                  onClick={() => softDelete()}
                >
                  Ban
                </button>
              )}
              {currentUser.role === 'admin' && deletedYet && (
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-2xl ml-3"
                  onClick={() => recover()}
                >
                  Recover
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <div className="w-full flex text-white justify-between px-5 [&>button]:w-full [&>button]:font-bold [&>button]:text-text-color [&>button]:py-3">
        <button
          type="button"
          className={`transition-all ease-in-out active:translate-y-5 ${
            isActive === 'home' ? 'border-b-2 border-main-color' : ''
          }`}
          onClick={() => {
            setIsActive('home');
            navigate('featured');
          }}
        >
          HOME
        </button>
        <button
          type="button"
          className={`transition-all ease-in-out duration-200 active:translate-y-5 ${
            isActive === 'playlists' ? 'border-b-2 border-main-color' : ''
          }`}
          onClick={() => {
            setIsActive('playlists');
            navigate('playlists');
          }}
        >
          PLAYLISTS
        </button>
        <button
          type="button"
          className={`transition-all ease-in-out duration-200 active:translate-y-5 ${
            isActive === 'live' ? 'border-b-2 border-main-color' : ''
          }`}
          onClick={() => {
            setIsActive('live');
            navigate('live');
          }}
        >
          LIVE
        </button>
        <button
          type="button"
          className={`transition-all ease-in-out duration-200 active:translate-y-5 ${
            isActive === 'videos' ? 'border-b-2 border-main-color' : ''
          }`}
          onClick={() => {
            setIsActive('videos');
            navigate('videos');
          }}
        >
          VIDEOS
        </button>
      </div>
      <Outlet
        context={{
          videos,
          streams,
          createdPlaylists,
          savedPlaylists,
          includedPlaylists,
        }}
      />
    </div>
  );
}

export default User;
