import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserSignedInContext } from '../contexts/UserContext';
import axiosClient from '../axios/axiosConfig';

function SubscribeButton({ subscribedYet, channelId }) {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(subscribedYet);
  const signedIn = useContext(UserSignedInContext);
  const subscribe = async () => {
    await axiosClient
      .post(`${process.env.REACT_APP_SERVER_URL}/users/${channelId}/subscribe`)
      .then((res) => {
        if (res) {
          setSubscribed(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast(err.response.data);
          localStorage.clear();
          navigate('/login');
        } else {
          toast(err.message);
        }
      });
  };
  const unsubscribe = async () => {
    await axiosClient
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/users/${channelId}/subscribe`
      )
      .then((res) => {
        if (res) {
          setSubscribed(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast(err.response.data);
          localStorage.clear();
          navigate('/login');
        } else {
          toast(err.message);
        }
      });
  };
  return (
    <div>
      {!subscribed && (
        <button
          type="button"
          onClick={() => {
            if (signedIn) {
              subscribe();
            } else {
              navigate('/login');
            }
          }}
          className="py-2 px-4 rounded-3xl bg-main-color hover:bg-yellow-600 text-black ml-5"
        >
          Subscribe
        </button>
      )}
      {subscribed && (
        <button
          type="button"
          onClick={() => {
            if (signedIn) {
              unsubscribe();
            } else {
              navigate('/login');
            }
          }}
          className="py-2 px-4 rounded-3xl bg-sec hover:bg-hover text-white ml-5"
        >
          Subscribed
        </button>
      )}
    </div>
  );
}

export default SubscribeButton;
