/* eslint-disable react/no-array-index-key */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoSettings } from 'react-icons/go';
import SearchCard from '../components/SearchCard';
import SideCard from '../components/recommend/SideCard';
import SubscribeButton from '../components/SubscribeButton';
import { UserContext } from '../contexts/UserContext';

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [date, setDate] = useState();
  const [type, setType] = useState('video');
  const [filterBox, setFilterBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const currentUser = useContext(UserContext);
  const containerRef = useRef(null);
  const [page, setPage] = useState(1);
  const filterRef = useRef();

  useEffect(() => {
    setResults([]);
    setPage(1);
  }, [searchParams]);

  const getSearch = async () => {
    setIsLoading(true);
    await axios
      .get(
        `/search?query=${searchParams.get('search_query')}&type=${type}${
          date ? `&date=${date}` : ''
        }&page=${page}`
      )
      .then((res) => {
        setResults((result) => [...result, ...res.data.data]);
        if (type === 'video')
          setChannels((data) => [...data, ...res.data.included]);
        setIsLoading(false);
      })
      .catch((err) => toast(err.message));
  };

  useEffect(() => {
    getSearch();
  }, [searchParams, type, date, page]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterBox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterRef]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: '1.0',
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

  return (
    <div className="w-full">
      <div className="px-5 mx-auto flex flex-col gap-2 w-[1024px]">
        <div
          ref={filterRef}
          className="w-full flex justify-end relative border-b border-text-color"
        >
          <button
            type="button"
            onClick={() => setFilterBox(!filterBox)}
            className="flex gap-2 text-white items-center p-2 rounded-3xl hover:bg-hover"
          >
            <GoSettings className="fill-main-color w-4 h-4" />
            Filters
          </button>
          {filterBox && (
            <div className="absolute top-full right-0 flex bg-third rounded-xl z-10">
              <div className="flex flex-col text-text-color [&>button]:p-2">
                <button
                  className={`rounded-xl hover:bg-hover  ${
                    date === 'hour' ? 'bg-hover text-white' : ''
                  }`}
                  disabled={type !== 'video'}
                  onClick={() => {
                    setDate('hour');
                    setPage(1);
                    setResults([]);
                  }}
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
                  onClick={() => {
                    setDate('day');
                    setPage(1);
                    setResults([]);
                  }}
                >
                  Today
                </button>
                <button
                  className={`rounded-xl hover:bg-hover ${
                    date === 'week' ? 'bg-hover text-white' : ''
                  }`}
                  disabled={type !== 'video'}
                  type="button"
                  onClick={() => {
                    setDate('week');
                    setPage(1);
                    setResults([]);
                  }}
                >
                  This week
                </button>
                <button
                  className={`rounded-xl hover:bg-hover ${
                    date === 'month' ? 'bg-hover text-white' : ''
                  }`}
                  disabled={type !== 'video'}
                  type="button"
                  onClick={() => {
                    setDate('month');
                    setPage(1);
                    setResults([]);
                  }}
                >
                  This month
                </button>
                <button
                  className={`rounded-xl hover:bg-hover ${
                    date === 'year' ? 'bg-hover text-white' : ''
                  }`}
                  disabled={type !== 'video'}
                  type="button"
                  onClick={() => {
                    setDate('year');
                    setPage(1);
                    setResults([]);
                  }}
                >
                  This year
                </button>
              </div>
              <div className="flex flex-col text-text-color [&>button]:p-2">
                <button
                  className={`rounded-xl hover:bg-hover ${
                    type === 'video' ? 'bg-hover text-white' : ''
                  }`}
                  onClick={() => {
                    setType('video');
                    setResults([]);
                    setPage(1);
                  }}
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
                    setResults([]);
                    setPage(1);
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
                    setResults([]);
                    setPage(1);
                  }}
                  type="button"
                >
                  Playlist
                </button>
              </div>
            </div>
          )}
        </div>
        {type === 'video' &&
          results.length > 0 &&
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
              view={video.attributes.viewsCount}
            />
          ))}
        {type === 'playlist' &&
          results.length > 0 &&
          results.map((playlist) => (
            <SideCard
              type={playlist.type}
              title={playlist.attributes.title}
              id={playlist.id}
              thumbnail={playlist.attributes.thumbnailUrl}
              channel={playlist.attributes.author}
              createdAt={playlist.attributes.createdAt}
            />
          ))}
        {type === 'channel' &&
          results.length > 0 &&
          results.map((channel) => (
            <div className="w-full flex">
              <Link to={`/users/${channel.id}`}>
                <div className="px-32 flex-1 min-w-[400px]">
                  <img
                    className="rounded-full w-36 h-36 object-cover"
                    src={channel.attributes.avatarUrl}
                    alt="avatar"
                  />
                </div>
              </Link>
              <div className="flex justify-between flex-1 items-center">
                <div className="pr-2">
                  <p className="text-white text-xl">
                    {channel.attributes.name}
                  </p>
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
                {currentUser.id != channel.id && (
                  <SubscribeButton
                    subscribedYet={channel.attributes.subscribedYet}
                    channelId={channel.id}
                  />
                )}
              </div>
            </div>
          ))}
        {/* {!isLoading && results.length > 0 && (
          <p className="text-text-color text-lg">
            There are no results matching your query
          </p>
        )} */}
        <div ref={containerRef} className="flex flex-col gap-2">
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:flex md:items-start"
              >
                <div className="min-w-[200px] w-1/4 aspect-video bg-gray-300 rounded dark:bg-gray-700" />
                <div className="flex-1 ml-3">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
