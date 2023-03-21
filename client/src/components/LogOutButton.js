import React, { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { GoSignOut } from 'react-icons/go';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuButton from './MenuButton';
import { UserUpdateContext } from '../contexts/UserContext';

function LogOutButton() {
  const logOutToastify = () => toast('Logged out successfully');
  const navigate = useNavigate();
  const useUserUpdate = useContext(UserUpdateContext);
  const logOut = async () => {
    await axios
      .delete('/logout')
      .then(async (res) => {
        if (res.data.code === '200') {
          useUserUpdate({});
          localStorage.removeItem('token');
          logOutToastify();
        }
      })
      .catch((err) => {
        localStorage.clear();
        toast(err.message);
        navigate('/login');
      });
  };

  return (
    <button className="w-full" type="button" onClick={() => logOut()}>
      <MenuButton icon={<GoSignOut />} text="Log out" />
    </button>
  );
}

export default LogOutButton;
