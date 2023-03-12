import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserSignedInContext } from '../contexts/UserContext';

function SubscribeButton({ subscribed, setSubscribed, channelId }) {
  const navigate = useNavigate();
  const signedIn = useContext(UserSignedInContext);
  const subscribe = async () => {
    await axios
      .post(`/users/${channelId}/subscribe`)
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
    await axios
      .delete(`/users/${channelId}/subscribe`)
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
          className="py-2 px-4 rounded-3xl bg-main-color text-black ml-5"
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
          className="py-2 px-4 rounded-3xl bg-main-color text-black ml-5"
        >
          Subscribed
        </button>
      )}
    </div>
  );
}

export default SubscribeButton;
