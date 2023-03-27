/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import {
  IoIosArrowDropdown,
  IoIosArrowUp,
  IoIosArrowDown,
} from 'react-icons/io';
import { MdSubscriptions, MdPlaylistPlay } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import SideBarButton from './SideBarButton';
import { UserContext } from '../../contexts/UserContext';

function SideBar({ setDropdownOpen }) {
  const dropdownToggle = () => {
    setDropdownOpen(false);
  };
  const [playlists, setPlaylists] = useState();
  const [showPlaylists, setShowPlaylists] = useState(false);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    const getPlaylists = async () => {
      await axios
        .get('/playlists')
        .then((res) => {
          setPlaylists(res.data.data);
        })
        .catch((err) => toast(err.response.data.message));
    };

    getPlaylists();
  }, []);

  return (
    <div className="bg-sec h-full 2xl:min-w-[320px] xl:min-w-[240px] min-w-[240px] flex flex-col [&>section]:py-4 [&>section]:border-b-[0.5px] [&>section]:border-icon-color [&>section]:border-dotted">
      <div className="py-4 2xl:py-8 px-10 flex flex-row items-center justify-between">
        <Link to="/">
          <AiFillYoutube className="fill-main-color h-14 w-14 cursor-pointer" />
        </Link>
        <div className="h-3/4 w-1 border-l border-icon-color" />
        <div
          onClick={() => dropdownToggle()}
          className="h-fit p-3 flex items-center cursor-pointer rounded-full hover:bg-hover"
        >
          <FaStream className="h-5 w-5 fill-text-color" />
        </div>
      </div>
      <div className="overflow-y-scroll [&>section]:border-b [&>section]:border-text-color">
        <section>
          <Link to="/">
            <SideBarButton icon={<AiFillHome />} text="Home" />
          </Link>
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
          <Link to={`/users/${currentUser.id}/playlists`}>
            <SideBarButton
              icon={<BsMusicPlayerFill />}
              text="Playlist"
              number={playlists ? playlists.length : ''}
            />
          </Link>
          <div
            className={`overflow-hidden ${
              showPlaylists ? 'max-h-fit' : 'max-h-[168px]'
            }`}
          >
            {playlists &&
              playlists.map((playlist) => (
                <Link to={`/playlists/${playlist.id}`}>
                  <SideBarButton
                    icon={<MdPlaylistPlay />}
                    text={playlist.attributes.title}
                  />
                </Link>
              ))}
            <SideBarButton
              icon={<AiFillStar />}
              text="Favorites"
              number={playlists ? playlists.length : ''}
            />
          </div>
          <button
            type="button"
            className="w-full"
            onClick={() => setShowPlaylists(!showPlaylists)}
          >
            <SideBarButton
              icon={showPlaylists ? <IoIosArrowUp /> : <IoIosArrowDown />}
              text={showPlaylists ? 'Show less' : 'Show more'}
            />
          </button>
        </section>
        <section>
          <SideBarButton
            icon={<MdSubscriptions />}
            text="Subscription"
            option={<IoIosArrowDropdown />}
          />
          <SideBarButton avatar="/logo.png" text="User1" />
          <SideBarButton avatar="/logo.png" text="User2" />
          <SideBarButton avatar="/logo.png" text="User3" />
        </section>
        <section>
          <Link to="/settings">
            <SideBarButton icon={<RiSettingsFill />} text="Settings" />
          </Link>
        </section>
      </div>
    </div>
  );
}

export default SideBar;
