/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FaStream } from 'react-icons/fa';
import {
  AiFillHome,
  AiFillCompass,
  AiFillVideoCamera,
  AiFillStar,
} from 'react-icons/ai';
import { RiSettingsFill } from 'react-icons/ri';
import { BsMusicPlayerFill } from 'react-icons/bs';
import { MdSubscriptions } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SubSideBarButton from './SubSideBarButton';

function SubSideBar({ setDropdownOpen }) {
  const dropdownToggle = () => {
    setDropdownOpen(true);
  };
  return (
    <div className="bg-sec h-full min-w-[72px] max-w-[72px] flex flex-col overflow-y-scroll [&>section]:py-4 [&>section]:border-b-[0.5px] [&>section]:border-icon-color [&>section]:border-dotted">
      <div className="py-4 px-4 flex flex-row items-center justify-between">
        <div
          onClick={() => dropdownToggle()}
          className="h-fit p-3 flex items-center cursor-pointer rounded-full hover:bg-hover"
        >
          <FaStream className="h-5 w-5 fill-text-color" />
        </div>
      </div>
      <section>
        <SubSideBarButton icon={<AiFillHome />} />
        <SubSideBarButton icon={<AiFillCompass />} />
        <SubSideBarButton icon={<AiFillVideoCamera />} />
        <SubSideBarButton icon={<AiFillStar />} />
        <SubSideBarButton icon={<BsMusicPlayerFill />} />
        <SubSideBarButton icon={<MdSubscriptions />} />
        <Link to="/settings">
          <SubSideBarButton icon={<RiSettingsFill />} />
        </Link>
      </section>
    </div>
  );
}

export default SubSideBar;
