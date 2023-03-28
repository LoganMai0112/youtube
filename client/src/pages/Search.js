import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoSettings } from 'react-icons/go';
import SearchCard from '../components/SearchCard';
import SideCard from '../components/recommend/SideCard';
import SubscribeButton from '../components/SubscribeButton';

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState();
  const [date, setDate] = useState();
  const [type, setType] = useState('video');
  const [filterBox, setFilterBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState();

  useEffect(() => {
    const getSearch = async () => {
      setIsLoading(true);
      await axios
        .get(
          `/search?query=${searchParams.get('search_query')}&type=${type}${
            date ? `&date=${date}` : ''
          }`
        )
        .then((res) => {
          console.log(res);
          setResults(res.data.data);
          if (type === 'video') setChannels(res.data.included);
          setIsLoading(false);
        })
        .catch((err) => toast(err.message));
    };

    getSearch();
  }, [searchParams, type, date]);

  return (
    <div className="px-5 flex flex-col gap-2">
      <div className="w-full flex justify-end relative">
        <button
          type="button"
          onClick={() => setFilterBox(!filterBox)}
          className="flex gap-2 text-white items-center p-2 rounded-3xl hover:bg-hover"
        >
          <GoSettings className="fill-main-color w-4 h-4" />
          Filters
        </button>
        {filterBox && (
          <div className="absolute top-full right-0 flex bg-third rounded-xl">
            <div className="flex flex-col text-text-color [&>button]:p-2">
              <button
                className={`rounded-xl hover:bg-hover  ${
                  date === 'hour' ? 'bg-hover text-white' : ''
                }`}
                disabled={type !== 'video'}
                onClick={() => setDate('hour')}
                type="button"
              >
                Last hour
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  date === 'day' ? 'bg-hover text-white' : ''
                }`}
                disabled={type !== 'video'}
                type="button"
                onClick={() => setDate('day')}
              >
                Today
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  date === 'week' ? 'bg-hover text-white' : ''
                }`}
                disabled={type !== 'video'}
                type="button"
                onClick={() => setDate('week')}
              >
                This week
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  date === 'month' ? 'bg-hover text-white' : ''
                }`}
                disabled={type !== 'video'}
                type="button"
                onClick={() => setDate('month')}
              >
                This month
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  date === 'year' ? 'bg-hover text-white' : ''
                }`}
                disabled={type !== 'video'}
                type="button"
                onClick={() => setDate('year')}
              >
                This year
              </button>
            </div>
            <div className="flex flex-col text-text-color [&>button]:p-2">
              <button
                className={`rounded-xl hover:bg-hover ${
                  type === 'video' ? 'bg-hover text-white' : ''
                }`}
                onClick={() => setType('video')}
                type="button"
              >
                Video
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  type === 'channel' ? 'bg-hover text-white' : ''
                }`}
                onClick={() => {
                  setType('channel');
                  setDate(null);
                }}
                type="button"
              >
                Channel
              </button>
              <button
                className={`rounded-xl hover:bg-hover ${
                  type === 'playlist' ? 'bg-hover text-white' : ''
                }`}
                onClick={() => {
                  setType('playlist');
                  setDate(null);
                }}
                type="button"
              >
                Playlist
              </button>
            </div>
          </div>
        )}
      </div>
      {!isLoading &&
        type === 'video' &&
        results.length &&
        results.map((video) => (
          <SearchCard
            id={video.id}
            title={video.attributes.title}
            channel={channels.find(
              (c) =>
                c.id === video.relationships.user.data.id && c.type === 'user'
            )}
            createdAt={video.attributes.createdAt}
            thumbnail={video.attributes.thumbnailUrl}
            description={video.attributes.description}
          />
        ))}
      {!isLoading &&
        type === 'playlist' &&
        results.length &&
        results.map((playlist) => (
          <SideCard
            type={playlist.type}
            title={playlist.attributes.title}
            id={playlist.id}
            thumbnailUrl={playlist.attributes.thumbnailUrl}
            channel={playlist.attributes.author}
            createdAt={playlist.attributes.createdAt}
          />
        ))}
      {!isLoading &&
        type === 'channel' &&
        results.length &&
        results.map((channel) => (
          <div className="w-full flex">
            <Link to={`/users/${channel.id}`}>
              <div className="px-32 flex-1">
                <img
                  className="rounded-full w-36 h-36 object-cover"
                  src={channel.attributes.avatarUrl}
                  alt="avatar"
                />
              </div>
            </Link>
            <div className="flex justify-between flex-1 items-center">
              <div className="pr-2">
                <p className="text-white text-xl">{channel.attributes.name}</p>
                <div className="flex items-center">
                  <p className="text-sm text-text-color">
                    {channel.attributes.email}
                  </p>
                  <div className="rounded-full w-1 h-1 mx-2 bg-icon-color" />
                  <p className="text-sm text-text-color">
                    {channel.attributes.subscribersCount > 0
                      ? `${channel.attributes.subscribersCount} subscriber`
                      : 'No subscribers'}
                  </p>
                </div>
              </div>
              <SubscribeButton
                subscribedYet={channel.attributes.subscribedYet}
                channelId={channel.id}
              />
            </div>
          </div>
        ))}
      {!isLoading && !results.length && (
        <p className="text-text-color text-lg">
          There are no results matching your query
        </p>
      )}
      {isLoading && <p className="text-white">Loading...</p>}
    </div>
  );
}

export default Search;
