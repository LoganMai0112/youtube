import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

function ShareVideoPortal({ setShareBox }) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,.7)] z-10 flex justify-center items-center">
      <div className="bg-gray-900 min-w-min mx-10 h-fit rounded-2xl flex flex-col px-6 py-4 overflow-y-scroll">
        <div className="w-full flex justify-between px-6 py-4 border-b border-main-color">
          <p className="text-xl text-white flex items-center">Share</p>
          <button
            type="button"
            onClick={() => setShareBox(false)}
            className="w-9 h-9 p-2 rounded-full hover:bg-hover"
          >
            <AiOutlineClose className="fill-main-color w-full h-full" />
          </button>
        </div>
        <div className="flex gap-1 justify-start mt-2 px-6">
          <a
            href={`http://www.facebook.com/sharer.php?u=${window.location.href}`}
            target="_blank"
            className="p-1 flex flex-col items-center gap-2 hover:bg-hover rounded-xl"
            rel="noreferrer"
          >
            <BsFacebook className="h-10 w-10 fill-blue-600" />
            <span className="text-text-color text-xs">Facebook</span>
          </a>
        </div>
        <div className="w-fit my-2">
          <input
            className="bg-sec border-main-color border-2 focus:outline-lime-600 rounded-xl text-white py-2 px-4 whitespace-nowrap"
            value={window.location.href}
          />
        </div>
      </div>
    </div>
  );
}

export default ShareVideoPortal;
