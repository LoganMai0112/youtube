import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import WatchModal from '../WatchModal';
import SideBar from '../sidebar/SideBar';
import SubSideBar from '../sidebar/SubSideBar';

function WatchLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="flex flex-row h-screen w-full">
      {!dropdownOpen && <SubSideBar setDropdownOpen={setDropdownOpen} />}
      {dropdownOpen && (
        <WatchModal>
          <SideBar setDropdownOpen={setDropdownOpen} />
        </WatchModal>
      )}
      <div className="flex flex-col h-full w-full bg-main overflow-y-scroll">
        <Header dropdownOpen={dropdownOpen} />
        <Outlet />
      </div>
    </div>
  );
}

export default WatchLayout;
