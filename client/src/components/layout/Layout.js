import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../sidebar/SideBar';

function Layout() {
  return (
    <div className="flex flex-row h-screen w-full">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Layout;
