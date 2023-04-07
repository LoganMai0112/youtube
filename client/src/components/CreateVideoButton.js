/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { RiFileUploadFill } from 'react-icons/ri';
import { CiStreamOn } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { UserSignedInContext } from '../contexts/UserContext';
import CreateStreamPortal from './CreateStreamPortal';
import MenuButton from './MenuButton';
import UploadVideoPortal from './UploadVideoPortal';

function CreateVideoButton() {
  const [creating, setCreating] = useState(false);
  const [createStream, setCreateStream] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const useUserSignedIn = useContext(UserSignedInContext);
  const menuRef = useRef();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openPortal = () => {
    if (useUserSignedIn) {
      setCreating(true);
    } else {
      navigate('/login');
    }
  };

  const openStreamPortal = () => {
    if (useUserSignedIn) {
      setCreateStream(true);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <button
        type="button"
        ref={menuRef}
        onClick={() => toggleMenu()}
        className="relative rounded-full p-3 bg-sec-color flex items-center w-fit h-fit hover:bg-hover"
      >
        <div className="h-5 w-5 mr-3">
          <AiOutlineVideoCameraAdd className="h-full w-full fill-main-color" />
        </div>
        <p className="text-white">Create</p>
        {menuOpen && (
          <div className="absolute flex flex-col right-0 top-14 bg-sec w-fit h-fit [&>section]:py-4 [&>section]:border-b-[0.5px] [&>section]:border-icon-color [&>section]:border-dotted rounded-xl">
            <section>
              <button
                type="button"
                className="w-full"
                onClick={() => openPortal()}
              >
                <MenuButton icon={<RiFileUploadFill />} text="Upload video" />
              </button>
            </section>
            <section>
              <button
                type="button"
                className="w-full"
                onClick={() => openStreamPortal()}
              >
                <MenuButton icon={<CiStreamOn />} text="Go live" />
              </button>
            </section>
          </div>
        )}
      </button>

      {creating && <UploadVideoPortal setCreating={setCreating} />}
      {createStream && <CreateStreamPortal setCreateStream={setCreateStream} />}
    </>
  );
}

export default CreateVideoButton;
