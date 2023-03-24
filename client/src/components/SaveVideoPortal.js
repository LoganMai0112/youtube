/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlinePlus, AiFillLock } from 'react-icons/ai';
import { GiEarthAmerica } from 'react-icons/gi';
import axios from 'axios';
import { toast } from 'react-toastify';

function SaveVideoPortal({ setSaveBox, videoId }) {
  const [createPlaylistInput, setCreatePlaylistInput] = useState(false);
  const inputRef = useRef();
  const [playlists, setPlaylists] = useState();
  const [isChecked, setIsChecked] = useState([]);

  useEffect(() => {
    axios
      .get('/playlists', { params: { video_id: videoId } })
      .then((res) => {
        setPlaylists(res.data.data);
        const checkedArray = res.data.data.map((item) => item.attributes.added);
        setIsChecked(checkedArray);
      })
      .catch((err) => toast(err.response.data.message));
  }, []);

  const createPlaylist = async (e) => {
    e.preventDefault();

    await axios
      .post('/playlists', {
        playlist: {
          title: e.target.title.value,
          status: e.target.status.value,
        },
      })
      .then(async (res) => {
        axios
          .post(`/playlists/${res.data.id}/playlist_item`, {
            video_id: videoId,
          })
          .then((response) => {
            if (response) {
              toast(`Added this video to ${res.data.title}`);
              setSaveBox(false);
            }
          })
          .catch((err) => toast(err.response.data.message));
      })
      .catch((err) => toast(err.response.data.message));
  };

  const handleCheck = (event, index) => {
    setIsChecked((prevIsChecked) => [
      ...prevIsChecked.slice(0, index),
      !prevIsChecked[index],
      ...prevIsChecked.slice(index + 1),
    ]);
    if (event.target.checked) {
      axios
        .post(`/playlists/${event.target.value}/playlist_item`, {
          video_id: videoId,
        })
        .then((res) => {
          if (res) {
            toast(`Added this video to ${event.target.name}`);
          }
        })
        .catch((err) => toast(err.response.data.message));
    } else {
      axios
        .delete(`/playlists/${event.target.value}/playlist_item`, {
          data: { video_id: videoId },
        })
        .then((res) => {
          if (res) {
            toast(`Removed from ${event.target.name}`);
          }
        })
        .catch((err) => toast(err.response.data.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,.7)] z-10 flex justify-center items-center">
      <div className="bg-gray-900 min-w-min mx-10 h-fit rounded-2xl flex flex-col px-6 py-4">
        <div className="w-full flex justify-between py-4">
          <p className="text-xl text-white flex items-center">Save to...</p>
          <button
            type="button"
            onClick={() => setSaveBox(false)}
            className="w-9 h-9 p-2 rounded-full hover:bg-hover"
          >
            <AiOutlineClose className="fill-main-color w-full h-full" />
          </button>
        </div>
        <div className="overflow-scroll max-h-80">
          {playlists &&
            playlists.map((playlist, index) => (
              <div
                key={playlist.id}
                className="flex justify-between items-center mb-6 pr-2"
              >
                <div className="mr-3">
                  <label
                    htmlFor={playlist.id}
                    className="text-medium font-sm text-white dark:text-gray-300 cursor-pointer"
                  >
                    <input
                      id={playlist.id}
                      type="checkbox"
                      name={playlist.attributes.title}
                      value={playlist.id}
                      checked={isChecked[index]}
                      onChange={(e) => handleCheck(e, index)}
                      className="w-4 h-4 m-1 accent-main-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3">{playlist.attributes.title}</span>
                  </label>
                </div>
                {playlist.attributes.status === 'privated' ? (
                  <AiFillLock className="w-5 h-5 fill-main-color" />
                ) : (
                  <GiEarthAmerica className="w-5 h-5 fill-main-color" />
                )}
              </div>
            ))}
        </div>
        {!createPlaylistInput && (
          <button
            type="button"
            className="flex flex-row items-center  justify-start gap-3 mt-3 py-1 text-white"
            onClick={() => {
              setCreatePlaylistInput(true);
              inputRef.current.focus();
            }}
          >
            <AiOutlinePlus className="w-6 h-6" />
            Create new playlist
          </button>
        )}
        <form
          className={`flex flex-col py-1 text-white ${
            createPlaylistInput ? 'visible' : 'invisible w-0 h-0'
          }`}
          onSubmit={(e) => createPlaylist(e)}
        >
          <span className="text-sm">Name</span>
          <input
            type="text"
            name="title"
            ref={inputRef}
            className="bg-gray-900 text-white outline-none border-b-2 border-main-color"
            placeholder="Enter playlist name..."
          />
          <label id="status" className="text-sm mt-3">
            Privacy
          </label>
          <select
            id="status"
            name="status"
            defaultValue="privated"
            className="bg-gray-900 border-b-2 border-main-color mb-3"
          >
            <option value="published">
              <GiEarthAmerica />
              Public
            </option>
            <option value="privated">Private</option>
          </select>
          <input
            type="submit"
            value="Create"
            className="self-end p-2 hover:bg-hover rounded-2xl cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}

export default SaveVideoPortal;
