import React, { useContext } from 'react';
import { GoSignOut } from 'react-icons/go';
import axios from 'axios';
import MenuButton from './MenuButton';
import { UserUpdateContext } from '../contexts/UserContext';

function LogOutButton() {
  const useUserUpdate = useContext(UserUpdateContext);
  const logOut = async () => {
    await axios
      .delete('/logout')
      .then(async (res) => {
        if (res.data.code === '200') {
          useUserUpdate({});
          localStorage.removeItem('token');
        }
      })
      .catch((err) => err);
  };

  return (
    <button className="w-full" type="button" onClick={() => logOut()}>
      <MenuButton icon={<GoSignOut />} text="Log out" />
    </button>
  );
}

export default LogOutButton;
