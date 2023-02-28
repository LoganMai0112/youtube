import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import SideBar from '../sidebar/SideBar';

function Layout() {
  return (
    <div className="flex flex-row h-screen w-full">
      <SideBar />
      <div className="flex flex-col h-full w-full bg-main">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
