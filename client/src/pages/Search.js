import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Search() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getSearch = () => {
      axios
        .get(`/search?query=${searchParams.get('search_query')}`)
        .then((res) => console.log(res))
        .catch((err) => toast(err.message));
    };

    getSearch();
  }, [searchParams]);

  return <div>{searchParams}</div>;
}

export default Search;
