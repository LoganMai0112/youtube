import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const logOut = async () => {
    await axios
      .delete('/logout')
      .then(async (res) => {
        if (res.data.code === '200') {
          localStorage.clear();
          navigate('/login');
        }
      })
      .catch((err) => err);
  };

  return (
    <div className="w-full bg-main">
      <button type="button" onClick={() => logOut()}>
        Logout
      </button>
    </div>
  );
}

export default Home;
