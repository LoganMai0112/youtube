/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HiOutlinePencil } from 'react-icons/hi';
import { SlActionRedo } from 'react-icons/sl';
import { BsThreeDotsVertical, BsPlayFill, BsTrashFill } from 'react-icons/bs';
import { MdPlaylistAdd } from 'react-icons/md';
import { FastAverageColor } from 'fast-average-color';
import moment from 'moment/moment';
import ShareVideoPortal from '../components/ShareVideoPortal';
import SaveVideoPortal from '../components/SaveVideoPortal';
import { UserContext, UserSignedInContext } from '../contexts/UserContext';
import SideCard from '../components/recommend/SideCard';
import axiosClient from '../axios/axiosConfig';

function Playlist() {
  const params = useParams();
  const [playlist, setPlaylist] = useState();
  const [videos, setVideos] = useState();
  const [author, setAuthor] = useState();
  const [privacy, setPrivacy] = useState();
  const [shareBox, setShareBox] = useState(false);
  const [saveBox, setSaveBox] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [titleInput, setTitleInput] = useState();
  const [editDescription, setEditDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState();
  const [dropMenu, setDropMenu] = useState(false);
  const [includedVideo, setIncludedVideo] = useState();
  const [createdOrSaved, setCreatedOrSaved] = useState();
  const currentUser = useContext(UserContext);
  const [saveVideoId, setSaveVideoId] = useState(null);
  const [multipleDropdown, setMultipleDropdown] = useState(null);
  const navigate = useNavigate();
  const signedIn = useContext(UserSignedInContext);
  const fac = new FastAverageColor();
  const imgRef = useRef();
  const menuRef = useRef();
  const multipleDropdownRef = useRef();

  const findChannel = (channelId, includedData) => {
    const videoCreator = includedData.find(
      (c) => c.id === channelId && c.type === 'user'
    );
    return videoCreator.attributes;
  };

  useEffect(() => {
    if (videos && imgRef.current) {
      fac.getColorAsync(imgRef.current).then((color) => {
        const container = document.querySelector('#container');
        container.style.background = `linear-gradient(180deg, ${color.rgba} 0%, rgba(21,20,27,1) 100%)`;
      });
    }
  }, [videos]);

  const updateTitle = (event) => {
    if (event) {
      event.preventDefault();
    }

    axiosClient
      .put(
        `${process.env.REACT_APP_SERVER_URL}/playlists/${params.playlistId}`,
        {
          playlist: {
            title: titleInput,
          },
        }
      )
      .then((res) => {
        if (res) {
          setTitleInput(res.data.title);
          setEditTitle(false);
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        multipleDropdownRef.current &&
        !multipleDropdownRef.current.contains(event.target)
      ) {
        setMultipleDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [multipleDropdownRef]);

  const updatePrivacy = (status) => {
    axiosClient
      .put(
        `${process.env.REACT_APP_SERVER_URL}/playlists/${params.playlistId}`,
        {
          playlist: {
            status,
          },
        }
      )
      .then((res) => {
        if (res) {
          setPrivacy(res.data.status);
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  const updateDescription = () => {
    axiosClient
      .put(
        `${process.env.REACT_APP_SERVER_URL}/playlists/${params.playlistId}`,
        {
          playlist: {
            description: descriptionInput,
          },
        }
      )
      .then((res) => {
        if (res) {
          setDescriptionInput(res.data.description);
          setEditDescription(false);
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  const deletePlaylist = (savedOrCreated) => {
    if (savedOrCreated === 'created') {
      axiosClient
        .delete(
          `${process.env.REACT_APP_SERVER_URL}/playlists/${params.playlistId}`
        )
        .then((res) => {
          if (res) {
            toast('Playlist deleted');
            navigate(`/users/${currentUser.id}/playlists`);
          }
        })
        .catch((err) => toast(err.message));
    } else if (savedOrCreated === 'saved') {
      axiosClient
        .delete(
          `${process.env.REACT_APP_SERVER_URL}/playlists/${params.playlistId}/user_playlist`
        )
        .then((res) => {
          if (res) {
            toast('Removed playlist from your Library');
            navigate(`/users/${currentUser.id}/playlists`);
            setCreatedOrSaved(null);
          }
        })
        .catch((err) => toast(err.message));
    }
  };

  const removeVideoFromPlaylist = (videoId) => {
    axiosClient
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/playlists/${params.playlistId}/playlist_item`,
        {
          data: { video_id: videoId },
        }
      )
      .then((res) => {
        if (res) {
          toast(`Removed from ${playlist.attributes.title}`);
          setVideos(videos.filter((video) => video.id !== videoId));
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  const savePlaylist = () => {
    axiosClient
      .post(
        `${process.env.REACT_APP_SERVER_URL}/playlists/${params.playlistId}/user_playlist`
      )
      .then((res) => {
        if (res) {
          toast('Saved this playlist to your library');
          setCreatedOrSaved('saved');
        }
      })
      .catch((err) => toast(err.response.data.message));
  };

  useEffect(() => {
    axiosClient
      .get(`${process.env.REACT_APP_SERVER_URL}/playlists/${params.playlistId}`)
      .then((res) => {
        setCreatedOrSaved(res.data.playlist.data.attributes.createdOrSaved);
        setPlaylist(res.data.playlist.data);
        setIncludedVideo(res.data.videos.included);
        setPrivacy(res.data.playlist.data.attributes.status);
        setTitleInput(res.data.playlist.data.attributes.title);
        setDescriptionInput(res.data.playlist.data.attributes.description);
        setVideos(res.data.videos.data);
        setAuthor(res.data.creater.data);
      })
      .catch((err) => {
        toast(err.message);
        navigate('/unavailable');
      });
  }, [params]);

  return (
    <div className="px-2 flex h-full">
      <div
        id="container"
        className="mt-3 ml-3 h-full w-96 bg-gradient-to-b rounded-xl fixed"
      >
        <div className="p-6 flex flex-col">
          {videos && videos[0] && (
            <img
              className="rounded-xl w-full"
              crossOrigin="anonymous"
              src={videos[0].attributes.thumbnailUrl}
              alt="thumbnail"
              ref={imgRef}
            />
          )}
          <div className="my-6 flex items-center">
            <div className="w-full text-3xl font-bold text-white">
              {!editTitle && titleInput}
              {editTitle && (
                <form onSubmit={(e) => updateTitle(e)}>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="bg-inherit w-full outline-none border-b border-main-color"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        setEditTitle(false);
                        setTitleInput(playlist.attributes.title);
                      }}
                      className="text-sm font-normal px-4 py-2 rounded-3xl hover:bg-white/30"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateTitle()}
                      className="text-sm font-normal px-4 py-2 rounded-3xl hover:bg-white/30"
                      type="button"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
            {!editTitle && createdOrSaved === 'created' && (
              <button
                type="button"
                onClick={() => setEditTitle(true)}
                className="p-2 rounded-full hover:bg-white/25"
              >
                <HiOutlinePencil className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
          {author && (
            <Link className="text-white w-fit" to={`/users/${author.id}`}>
              {author.attributes.name}
            </Link>
          )}
          {playlist && createdOrSaved === 'created' && (
            <select
              id="status"
              name="status"
              value={privacy}
              onChange={(e) => {
                setPrivacy(e.target.value);
                updatePrivacy(e.target.value);
              }}
              className="bg-inherit border-b-2 border-main-color mb-3 w-fit text-white mt-4"
            >
              <option value="published">Public</option>
              <option value="privated">Private</option>
            </select>
          )}
          <div className="flex text-sm text-white gap-2 font-light">
            <p>{videos && videos.length} videos</p>
            <p>
              Updated on{' '}
              {playlist &&
                moment(playlist.attributes.updatedAt).format('MMM Do YYYY')}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            {privacy === 'published' && (
              <button
                type="button"
                onClick={() => setShareBox(true)}
                className="p-2 rounded-full hover:bg-white/25 bg-white/10"
              >
                <SlActionRedo className="w-6 h-6 text-white" />
              </button>
            )}
            <div ref={menuRef} className="relative">
              {playlist && createdOrSaved && (
                <button
                  type="button"
                  onClick={() => setDropMenu(!dropMenu)}
                  className="p-2 rounded-full hover:bg-white/25 bg-white/10 "
                >
                  <BsThreeDotsVertical className="w-6 h-6 text-white" />
                </button>
              )}

              {dropMenu && (
                <div className="absolute flex flex-col left-0 top-full bg-main w-fit h-fit [&>section]:py-2 [&>section]:hover:bg-neutral-500 py-4 rounded-xl">
                  <section>
                    <button
                      type="button"
                      onClick={() => deletePlaylist(createdOrSaved)}
                      className="flex flex-row px-3 items-center"
                    >
                      <BsTrashFill className="mr-3 w-4 h-4 fill-main-color" />
                      <div className="flex flex-col">
                        <p className="text-white whitespace-nowrap">
                          Delete playlist
                        </p>
                      </div>
                    </button>
                  </section>
                </div>
              )}
            </div>
            {playlist && !createdOrSaved && (
              <button
                type="button"
                onClick={() => {
                  if (!signedIn) {
                    navigate('/login');
                  } else {
                    savePlaylist();
                  }
                }}
                className="p-2 rounded-full hover:bg-white/25 bg-white/10 "
              >
                <MdPlaylistAdd className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
          <div className="flex w-full gap-4 mt-4">
            <button
              type="button"
              className="rounded-3xl flex justify-center gap-2 w-full bg-white py-2 px-4 items-center hover:bg-white/80"
            >
              <BsPlayFill className="w-5 h-5" />
              Play all
            </button>
          </div>
          <div className="my-6 flex items-center">
            <div className="w-full text-white">
              {!editDescription && (
                <div>{descriptionInput || 'No description'}</div>
              )}
              {editDescription && (
                <>
                  <textarea
                    type="text"
                    placeholder="Description"
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    className="bg-inherit w-full outline-none border-b border-main-color"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        setEditDescription(false);
                        setDescriptionInput(playlist.attributes.description);
                      }}
                      className="text-sm font-normal px-4 py-2 rounded-3xl hover:bg-white/30"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateDescription()}
                      className="text-sm font-normal px-4 py-2 rounded-3xl hover:bg-white/30"
                      type="button"
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
            {!editDescription && createdOrSaved === 'created' && (
              <button
                type="button"
                onClick={() => setEditDescription(true)}
                className="p-2 rounded-full hover:bg-white/25"
              >
                <HiOutlinePencil className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="pl-[400px] w-full px-5 flex flex-col">
        {videos &&
          includedVideo &&
          videos.map((video) => (
            <div
              key={video.id}
              className="p-3 px-5 rounded-xl flex justify-between hover:bg-neutral-800 group"
            >
              <SideCard
                id={video.id}
                thumbnail={video.attributes.thumbnailUrl}
                title={video.attributes.title}
                channel={findChannel(
                  video.relationships.user.data.id,
                  includedVideo
                )}
                view={video.attributes.viewsCount}
              />
              <div ref={multipleDropdownRef} className="relative h-fit">
                <button
                  type="button"
                  onClick={() =>
                    setMultipleDropdown((prevState) => {
                      if (prevState === video.id) {
                        return null;
                      }
                      return video.id;
                    })
                  }
                  className={`p-2 rounded-full hover:bg-white/25 bg-white/10 group-hover:block ${
                    multipleDropdown === video.id ? 'block' : 'hidden'
                  }`}
                >
                  <BsThreeDotsVertical className="w-6 h-6 text-white" />
                </button>
                {multipleDropdown === video.id && (
                  <div className="absolute flex flex-col right-0 top-full bg-main w-fit h-fit [&>section]:py-2 py-4 rounded-xl z-10">
                    {createdOrSaved && createdOrSaved === 'created' && (
                      <section className="hover:bg-neutral-500">
                        <button
                          type="button"
                          onClick={() => removeVideoFromPlaylist(video.id)}
                          className="flex flex-row px-3 items-center w-full"
                        >
                          <BsTrashFill className="mr-3 w-4 h-4 fill-main-color" />
                          <div className="flex flex-col">
                            <p className="text-white whitespace-nowrap">
                              Remove from {playlist.attributes.title}
                            </p>
                          </div>
                        </button>
                      </section>
                    )}
                    <section className="hover:bg-neutral-500">
                      <button
                        type="button"
                        onClick={() => {
                          if (signedIn) {
                            setSaveBox(true);
                            setSaveVideoId(video.id);
                          } else {
                            navigate('/login');
                          }
                        }}
                        className="flex flex-row px-3 items-center w-full"
                      >
                        <MdPlaylistAdd className="mr-2 w-6 h-6 fill-main-color" />
                        <div className="flex flex-col">
                          <p className="text-white whitespace-nowrap">
                            Save to playlist
                          </p>
                        </div>
                      </button>
                    </section>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      {saveBox && saveVideoId && (
        <SaveVideoPortal setSaveBox={setSaveBox} videoId={saveVideoId} />
      )}
      {shareBox && <ShareVideoPortal setShareBox={setShareBox} />}
    </div>
  );
}

export default Playlist;
