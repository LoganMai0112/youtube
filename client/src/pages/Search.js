/* eslint-disable react/no-array-index-key */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';
import { GoSettings } from 'react-icons/go';
import SearchCard from '../components/SearchCard';
import SideCard from '../components/recommend/SideCard';
import SubscribeButton from '../components/SubscribeButton';
import { UserContext } from '../contexts/UserContext';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [date, setDate] = useState();
  const [type, setType] = useState('video');
  const [filterBox, setFilterBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const currentUser = useContext(UserContext);
  const [page, setPage] = useState(1);
  const filterRef = useRef();
  const [maxPages, setMaxPages] = useState(1);

  const getSearch = useCallback(async () => {
    if (page <= maxPages) {
      setIsLoading(true);
      await axios
        .get(
          `/search?query=${searchParams.get('search_query')}&type=${type}${
            date ? `&date=${date}` : ''
          }&page=${page}`
        )
        .then((res) => {
          setMaxPages(res.data.pagy.pages);
          setResults((result) => [...result, ...res.data.data.data]);
          if (type === 'video')
            setChannels((data) => [...data, ...res.data.data.included]);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, [searchParams, type, date, page, maxPages]);

  const containerRef = useInfiniteScroll({
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  useEffect(() => {
    setResults([]);
    setPage(1);
    setMaxPages(1);
  }, [searchParams, type, date]);

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

  useEffect(() => {
    getSearch();
  }, [getSearch]);

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
        <div ref={containerRef} className="flex flex-col gap-2">
          {isLoading && (
            <div role="status" className="w-full flex justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        {!isLoading && results.length == 0 && (
          <p className="text-text-color text-lg">
            There are no results matching your query
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;
