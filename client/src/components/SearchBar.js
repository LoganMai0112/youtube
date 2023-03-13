import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/result?search_query=${query}`);
  };

  return (
    <div className="flex bg-sec-color py-2 px-4 rounded-full items-center">
      <button
        type="button"
        className="h-5 w-5 mr-3 flex items-center justify-center"
        onClick={submitSearch}
      >
        <BsSearch className="w-full h-full fill-white" />
      </button>
      <form onSubmit={submitSearch}>
        <input
          className="bg-sec-color outline-none text-white"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchBar;
