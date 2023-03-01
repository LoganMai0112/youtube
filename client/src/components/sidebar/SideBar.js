/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FaStream } from 'react-icons/fa';
import {
  AiFillYoutube,
  AiFillHome,
  AiFillCompass,
  AiFillVideoCamera,
  AiFillStar,
} from 'react-icons/ai';
import { RiSettingsFill } from 'react-icons/ri';
import { BsPlusCircleDotted, BsMusicPlayerFill } from 'react-icons/bs';
import { IoIosArrowDropdown } from 'react-icons/io';
import { MdSubscriptions } from 'react-icons/md';
import SideBarButton from './SideBarButton';

function SideBar({ setDropdownOpen }) {
  const dropdownToggle = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="bg-sec h-full 2xl:min-w-[320px] xl:min-w-[240px] min-w-[240px] flex flex-col [&>section]:py-4 [&>section]:border-b-[0.5px] [&>section]:border-icon-color [&>section]:border-dotted">
      <div className="py-4 2xl:py-8 px-10 flex flex-row items-center justify-between">
        <AiFillYoutube className="fill-main-color h-14 w-14 cursor-pointer" />
        <div className="h-3/4 w-1 border-l border-icon-color" />
        <div
          onClick={() => dropdownToggle()}
          className="h-fit p-3 flex items-center cursor-pointer rounded-full hover:bg-hover"
        >
          <FaStream className="h-5 w-5 fill-text-color" />
        </div>
      </div>
      <div className="overflow-y-scroll">
        <section>
          <SideBarButton icon={<AiFillHome />} text="Home" />
          <SideBarButton
            icon={<AiFillCompass />}
            text="Discover"
            option={<IoIosArrowDropdown />}
          />
          <SideBarButton text="CS GO" />
          <SideBarButton text="Dota 2" />
          <SideBarButton text="Fortnite" />
        </section>
        <section>
          <SideBarButton
            icon={<AiFillVideoCamera />}
            text="My stream"
            endIcon={<BsPlusCircleDotted />}
          />
        </section>
        <section>
          <SideBarButton
            icon={<BsMusicPlayerFill />}
            text="Playlist"
            number={32}
          />
          <SideBarButton icon={<AiFillStar />} text="Favorites" number={12} />
        </section>
        <section>
          <SideBarButton
            icon={<MdSubscriptions />}
            text="Subscription"
            option={<IoIosArrowDropdown />}
          />
          <SideBarButton avatar="logo.png" text="User1" />
          <SideBarButton avatar="logo.png" text="User2" />
          <SideBarButton avatar="logo.png" text="User3" />
        </section>
        <section>
          <SideBarButton icon={<RiSettingsFill />} text="Settings" />
        </section>
      </div>
    </div>
  );
}

export default SideBar;
