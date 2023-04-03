import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Modal from '../Modal';
import SideBar from '../sidebar/SideBar';
import SubSideBar from '../sidebar/SubSideBar';

function Layout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const modalRef = useRef();
  const sidebarRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current.contains(event.target) &&
        !sidebarRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, sidebarRef]);

  return (
    <div className="flex flex-row h-screen w-full">
      <div className="hidden xl:block">
        {dropdownOpen && <SideBar setDropdownOpen={setDropdownOpen} />}
      </div>
      {!dropdownOpen && <SubSideBar setDropdownOpen={setDropdownOpen} />}
      {dropdownOpen && (
        <div className="xl:hidden">
          <SubSideBar setDropdownOpen={setDropdownOpen} />
        </div>
      )}
      {dropdownOpen && (
        <div className="xl:hidden">
          <Modal modalRef={modalRef} setDropdownOpen={setDropdownOpen}>
            <div ref={sidebarRef}>
              <SideBar setDropdownOpen={setDropdownOpen} />
            </div>
          </Modal>
        </div>
      )}
      <div className="flex flex-col h-full w-full bg-main overflow-y-scroll">
        <Header dropdownOpen={dropdownOpen} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
