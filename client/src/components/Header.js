/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext } from 'react';
import { AiTwotoneBell, AiFillYoutube } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { UserContext, UserSignedInContext } from '../contexts/UserContext';
import LogOutButton from './LogOutButton';
import CreateVideoButton from './CreateVideoButton';
import SearchBar from './SearchBar';

function Header({ dropdownOpen }) {
  const useUser = useContext(UserContext);
  const useUserSignedIn = useContext(UserSignedInContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="p-5 pb-0 mb-5 w-full h-fit flex justify-between items-center sticky top-0 bg-main z-10">
      {!dropdownOpen && (
        <Link to="/">
          <AiFillYoutube className="fill-main-color h-14 w-14 cursor-pointer" />
        </Link>
      )}
      <SearchBar />
      {useUserSignedIn && (
        <div className="flex items-center gap-2 relative">
          <CreateVideoButton />
          <button
            type="button"
            className="group rounded-full p-3 hover:bg-hover relative"
          >
            <AiTwotoneBell className="w-6 h-6 fill-icon-color group-hover:fill-main-color" />
          </button>
          <button
            type="button"
            onClick={() => toggleMenu()}
            className="transition-all ease-in-out p-0 rounded-full border-2 border-solid border-main-color hover:p-2 hover:border-dashed m-2 hover:m-0 hover:rotate-360"
          >
            <img
              src={useUser.avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
          {menuOpen && (
            <div className="absolute flex flex-col right-0 top-16 bg-sec w-fit h-fit [&>section]:py-4 [&>section]:border-b-[0.5px] [&>section]:border-icon-color [&>section]:border-dotted rounded-xl">
              <section>
                <Link to={`/users/${useUser.id}`}>
                  <div className="flex flex-row px-3 items-center">
                    <div className="w-10 h-10 mr-3">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={useUser.avatarUrl}
                        alt="avatar"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white">{useUser.name}</p>
                      <p className="text-text-color">{useUser.email}</p>
                    </div>
                  </div>
                </Link>
              </section>
              <section>
                <LogOutButton />
              </section>
            </div>
          )}
        </div>
      )}
      {!useUserSignedIn && (
        <Link to="/login">
          <div className="px-4 py-2 bg-main-color hover:bg-yellow-700 rounded-2xl hover:text-white">
            Sign in
          </div>
        </Link>
      )}
    </div>
  );
}

export default Header;
