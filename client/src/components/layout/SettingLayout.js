import React from 'react';
import { Outlet } from 'react-router-dom';
import SettingSideBar from '../sidebar/SettingSideBar';
import Header from '../Header';

function SettingLayout() {
  return (
    <div className="flex flex-row h-screen w-full">
      <SettingSideBar />
      <div className="flex flex-col h-full w-full bg-main overflow-y-scroll">
        <Header dropdownOpen />
        <Outlet />
      </div>
    </div>
  );
}

export default SettingLayout;
