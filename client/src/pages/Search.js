import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SearchCard from '../components/SearchCard';

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState();

  useEffect(() => {
    const getSearch = async () => {
      setIsLoading(true);
      await axios
        .get(`/search?query=${searchParams.get('search_query')}`)
        .then((res) => {
          setResults(res.data.data);
          setChannels(res.data.included);
          setIsLoading(false);
        })
        .catch((err) => toast(err.message));
    };

    getSearch();
  }, [searchParams]);

  return (
    <div className="px-5 flex flex-col gap-2">
      {!isLoading &&
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
