import React from 'react';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { AiFillYoutube } from 'react-icons/ai';

function SideBar() {
  return (
    <div className="bg-sec h-full 2xl:min-w-[320px] xl:min-w-[240px] min-w-[72px] max-w-[72px] flex flex-col">
      <div className="p-8 px-12 flex flex-row items-center justify-between">
        <AiFillYoutube className="fill-main-color h-14 w-14 cursor-pointer" />
        <div className="h-3/4 w-1 border-l border-icon-color" />
        <div className="h-fit p-2 flex items-center cursor-pointer rounded-full hover:bg-hover">
          <IoReorderThreeOutline className="h-8 w-8 stroke-text-color" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
