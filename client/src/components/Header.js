/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AiTwotoneBell, AiFillYoutube } from 'react-icons/ai';
import { createConsumer } from '@rails/actioncable';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { UserContext, UserSignedInContext } from '../contexts/UserContext';
import LogOutButton from './LogOutButton';
import CreateVideoButton from './CreateVideoButton';
import SearchBar from './SearchBar';

function Header({ dropdownOpen }) {
  const useUser = useContext(UserContext);
  const useUserSignedIn = useContext(UserSignedInContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notiBox, setNotiBox] = useState(false);
  const menuRef = useRef();
  const notiRef = useRef();
  const [notifications, setNotifications] = useState([]);
  const [haveUnread, setHaveUnread] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        setNotiBox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notiRef]);

  useEffect(() => {
    const getNotifications = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/notifications`)
        .then((res) => setNotifications(res.data.data))
        .catch((err) => toast(err.message));
    };
    if (useUserSignedIn) {
      getNotifications();
    }
  }, [useUserSignedIn]);

  useEffect(() => {
    const cable = createConsumer('ws://localhost:3001/cable');
    const notificationChannel = cable.subscriptions.create(
      'NotificationsChannel',
      {
        received: (data) => {
          setNotifications((prev) => [data.notification.data, ...prev]);
        },
      }
    );

    return () => {
      cable.subscriptions.remove(notificationChannel);
    };
  }, []);

  useEffect(() => {
    const havingUnread = notifications.some((notification) => {
      if (notification.attributes.read === false) {
        return true;
      }
      return false;
    });

    setHaveUnread(havingUnread);
  }, [notifications]);

  const readNotification = (notificationId, index) => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/notifications/${notificationId}`,
        {
          notification: { read: true },
        }
      )
      .then((res) => {
        if (res) {
          setNotifications((prevState) => [
            ...prevState.slice(0, index),
            {
              ...notifications[index],
              attributes: { ...notifications[index].attributes, read: true },
            },
            ...prevState.slice(index + 1),
          ]);
        }
      })
      .catch((err) => toast(err.message));
  };

  return (
    <div className="p-5 pb-0 mb-5 w-full h-fit flex justify-between items-center sticky top-0 bg-main z-10">
      {!dropdownOpen && (
        <Link to="/">
          <AiFillYoutube className="fill-main-color h-14 w-14 cursor-pointer" />
        </Link>
      )}
      <SearchBar />
      {useUserSignedIn && (
        <div className="flex items-center gap-2 relative">
          <CreateVideoButton />
          <div ref={notiRef} className="relative">
            {haveUnread && (
              <span className="absolute flex h-3 w-3 right-2 top-2 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500" />
              </span>
            )}
            <button
              type="button"
              onClick={() => setNotiBox(!notiBox)}
              className="group rounded-full p-3 hover:bg-hover relative"
            >
              <AiTwotoneBell className="w-6 h-6 fill-icon-color group-hover:fill-main-color" />
            </button>
            {notiBox && (
              <div className="absolute top-full right-0 w-[500px] rounded-2xl pb-5 bg-gray-900">
                <div className="py-2 px-5 text-xl text-white w-full">
                  Notifications
                </div>
                <div className="overflow-y-scroll max-h-96">
                  {notifications.length > 0 &&
                    notifications.map((notification, index) => (
                      <Link
                        onClick={() => {
                          setNotiBox(false);
                          readNotification(notification.id, index);
                        }}
                        to={`/${notification.attributes.notifiableType.toLowerCase()}s/${
                          notification.attributes.notifiableId
                        }`}
                      >
                        <div
                          className={`px-5 w-full py-3 cursor-pointer ${
                            notification.attributes.read === false
                              ? 'bg-gray-500'
                              : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Link
                                to={`/users/${notification.attributes.userId}`}
                              >
                                <img
                                  className="rounded-full w-14 h-14 object-cover"
                                  src={notification.attributes.avatarUrl}
                                  alt="avatar"
                                />
                              </Link>
                              <div className="text-white ml-4">
                                <p>{notification.attributes.content}</p>
                                <p className="text-text-color">
                                  {moment(
                                    notification.attributes.createdAt
                                  ).fromNow()}
                                </p>
                              </div>
                            </div>
                            <img
                              className="w-24"
                              src={notification.attributes.thumbnailUrl}
                              alt="thumbnail"
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  {notifications.length <= 0 && (
                    <div className="text-white flex justify-center items-center h-32">
                      There is no notification
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div ref={menuRef}>
            <button
              type="button"
              onClick={() => toggleMenu()}
              className="transition-all ease-in-out p-0 rounded-full border-2 border-solid border-main-color hover:p-2 hover:border-dashed m-2 hover:m-0 hover:rotate-360"
            >
              <img
                src={useUser.avatarUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>
            {menuOpen && (
              <div className="absolute flex flex-col right-0 top-16 bg-sec w-fit h-fit [&>section]:py-4 [&>section]:border-b-[0.5px] [&>section]:border-icon-color [&>section]:border-dotted rounded-xl">
                <section>
                  <Link to={`/users/${useUser.id}`}>
                    <div className="flex flex-row px-3 items-center">
                      <div className="w-10 h-10 mr-3">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src={useUser.avatarUrl}
                          alt="avatar"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white">{useUser.name}</p>
                        <p className="text-text-color">{useUser.email}</p>
                      </div>
                    </div>
                  </Link>
                </section>
                <section>
                  <LogOutButton />
                </section>
              </div>
            )}
          </div>
        </div>
      )}
      {!useUserSignedIn && (
        <Link to="/login">
          <div className="px-4 py-2 bg-main-color hover:bg-yellow-700 rounded-2xl hover:text-white">
            Sign in
          </div>
        </Link>
      )}
    </div>
  );
}

export default Header;
