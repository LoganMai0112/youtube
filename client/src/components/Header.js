import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineVideoCameraAdd, AiTwotoneBell } from 'react-icons/ai';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const logOut = async () => {
    await axios
      .delete('/logout')
      .then(async (res) => {
        if (res.data.code === '200') {
          localStorage.clear();
          navigate('/login');
        }
      })
      .catch((err) => err);
  };

  return (
    <div className="p-5 w-full h-fit flex justify-between items-center">
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
      <div className="flex items-center gap-2">
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
          className="transition-all ease-in-out p-0 rounded-full border-2 border-solid border-main-color hover:p-2 hover:border-dashed m-2 hover:m-0 hover:rotate-90"
        >
          <img src="logo.png" alt="avatar" className="w-10 h-10 rounded-full" />
        </button>
        <button type="button" onClick={() => logOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
