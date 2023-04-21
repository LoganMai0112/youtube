/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiFillYoutube, AiFillFlag } from 'react-icons/ai';
import { FaStream } from 'react-icons/fa';
import { RiSettingsFill, RiDashboardFill } from 'react-icons/ri';
import { IoMdAnalytics } from 'react-icons/io';
import SideBarButton from './SideBarButton';
import { UserContext } from '../../contexts/UserContext';

function SettingSideBar() {
  const currentUser = useContext(UserContext);
  return (
    <div className="bg-sec h-full 2xl:min-w-[320px] xl:min-w-[240px] min-w-[240px] flex flex-col [&>section]:py-4 [&>section]:border-b-[0.5px] [&>section]:border-icon-color [&>section]:border-dotted">
      <div className="py-4 2xl:py-8 px-10 flex flex-row items-center justify-between">
        <Link to="/">
          <AiFillYoutube className="fill-main-color h-14 w-14 cursor-pointer" />
        </Link>
        <div className="h-3/4 w-1 border-l border-icon-color" />
        <div className="h-fit p-3 flex items-center cursor-pointer rounded-full hover:bg-hover">
          <FaStream className="h-5 w-5 fill-text-color" />
        </div>
      </div>
      <div className="overflow-y-scroll">
        <section>
          <Link to="/dashboard">
            <SideBarButton icon={<RiDashboardFill />} text="Dashboard" />
          </Link>
        </section>
        {currentUser.role === 'admin' && (
          <section>
            <Link to="/admin/reports">
              <SideBarButton icon={<AiFillFlag />} text="Report" />
            </Link>
          </section>
        )}
        <section>
          <Link to="/analytics">
            <SideBarButton icon={<IoMdAnalytics />} text="Analytics" />
          </Link>
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

export default SettingSideBar;
