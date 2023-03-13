import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SearchCard from '../components/SearchCard';

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSearch = async () => {
      setIsLoading(true);
      await axios
        .get(`/search?query=${searchParams.get('search_query')}`)
        .then((res) => {
          if (res.data[0]) {
            setResults(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => toast(err.message));
    };

    getSearch();
  }, [searchParams]);

  return (
    <div className="px-5 flex flex-col gap-2">
      {!isLoading &&
        results &&
        results.map((video) => (
          <SearchCard
            id={video.data.id}
            title={video.data.attributes.title}
            channel={video.included[0].attributes}
            createdAt={video.data.attributes.createdAt}
            thumbnail={video.data.attributes.thumbnailUrl}
            avatar={video.included[0].attributes.avatarUrl}
            description={video.data.attributes.description}
          />
        ))}
      {!isLoading && !results && (
        <p className="text-text-color text-lg">
          There are no results matching your query
        </p>
      )}
      {isLoading && <p className="text-white">Loading...</p>}
    </div>
  );
}

export default Search;
