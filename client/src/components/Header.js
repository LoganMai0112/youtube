/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  AiOutlineVideoCameraAdd,
  AiTwotoneBell,
  AiFillYoutube,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { UserContext, UserSignedInContext } from '../contexts/UserContext';
import LogOutButton from './LogOutButton';

function Header({ dropdownOpen }) {
  const useUser = useContext(UserContext);
  const useUserSignedIn = useContext(UserSignedInContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="p-5 w-full h-fit flex justify-between items-center">
      {!dropdownOpen && (
        <AiFillYoutube className="fill-main-color h-14 w-14 cursor-pointer" />
      )}
      <div className="flex bg-sec-color py-2 px-4 rounded-full items-center">
        <button
          type="button"
          className="h-5 w-5 mr-3 flex items-center justify-center"
        >
          <BsSearch className="w-full h-full fill-white" />
        </button>
        <input
          className="bg-sec-color outline-none text-white"
          placeholder="Search"
        />
      </div>
      {useUserSignedIn && (
        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            className="rounded-full p-3 bg-sec-color flex items-center w-fit h-fit hover:bg-hover"
          >
            <div className="h-5 w-5 mr-3">
              <AiOutlineVideoCameraAdd className="h-full w-full fill-main-color" />
            </div>
            <p className="text-white">Start stream</p>
          </button>
          <button
            type="button"
            className="group rounded-full p-3 hover:bg-hover relative"
          >
            {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main-color opacity-75" /> */}
            <AiTwotoneBell className="w-6 h-6 fill-icon-color group-hover:fill-main-color" />
          </button>
          <button
            type="button"
            onClick={() => toggleMenu()}
            className="transition-all ease-in-out p-0 rounded-full border-2 border-solid border-main-color hover:p-2 hover:border-dashed m-2 hover:m-0 hover:rotate-360"
          >
            <img
              src={useUser.avatar_url}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
          {menuOpen && (
            <div className="absolute flex flex-col right-0 top-full bg-sec w-fit h-fit [&>section]:py-4 [&>section]:border-b-[0.5px] [&>section]:border-icon-color [&>section]:border-dotted rounded-xl">
              <section>
                <div className="flex flex-row px-3">
                  <div className="w-10 h-10 mr-3">
                    <img
                      className="w-full h-full rounded-full"
                      src={useUser.avatar_url}
                      alt="avatar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white">{useUser.name}</p>
                    <p className="text-text-color">{useUser.email}</p>
                  </div>
                </div>
              </section>
              <section>
                <LogOutButton />
              </section>
            </div>
          )}
        </div>
      )}
      {!useUserSignedIn && <Link to="/login">Sign in</Link>}
    </div>
  );
}

export default Header;
