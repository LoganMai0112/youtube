import React, { useContext, useState } from 'react';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { RiFileUploadFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { UserSignedInContext } from '../contexts/UserContext';
import MenuButton from './MenuButton';
import UploadVideoPortal from './UploadVideoPortal';

function CreateVideoButton() {
  const [creating, setCreating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const useUserSignedIn = useContext(UserSignedInContext);
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

  return (
    <>
      <button
        type="button"
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
              <button type="button" onClick={() => openPortal()}>
                <MenuButton icon={<RiFileUploadFill />} text="Upload video" />
              </button>
            </section>
          </div>
        )}
      </button>

      {creating && <UploadVideoPortal setCreating={setCreating} />}
    </>
  );
}

export default CreateVideoButton;
