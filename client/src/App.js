/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import UserProvider from './contexts/UserContext';
import WatchLayout from './components/layout/WatchLayout';
import WatchVideo from './pages/WatchVideo';
import EditVideo from './pages/EditVideo';
import Search from './pages/Search';
import 'video-react/dist/video-react.css';
import 'react-toastify/dist/ReactToastify.css';
import Stream from './components/Stream';
import User from './pages/User';
import Featured from './components/user/Featured';
import Videos from './components/user/Videos';
import Playlists from './components/user/Playlists';
import Live from './components/user/Live';
import SettingLayout from './components/layout/SettingLayout';
import Dashboard from './pages/Dashboard';
import Setting from './pages/Setting';
import useLocalStorage from './hooks/useLocalStorage';

function ProtectedRoute({ signedIn }) {
  if (!signedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

function App() {
  const currentUser = useLocalStorage('current_user');
  const [signedIn, setSignedIn] = useState();
  useEffect(() => {
    console.log(currentUser);
    setSignedIn(currentUser ? Object.keys(currentUser).length !== 0 : false);
  }, [currentUser]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/result" element={<Search />} />
              <Route path="/users/:userId" element={<User />}>
                <Route index element={<Featured />} />
                <Route path="/users/:userId/featured" element={<Featured />} />
                <Route path="/users/:userId/videos" element={<Videos />} />
                <Route path="/users/:userId/live" element={<Live />} />
                <Route
                  path="/users/:userId/playlists"
                  element={<Playlists />}
                />
              </Route>
            </Route>
            <Route element={<WatchLayout />}>
              <Route path="/streams/:streamId" element={<Stream />} />
              <Route path="/videos/:videoId" element={<WatchVideo />} />
              <Route element={<ProtectedRoute signedIn={signedIn} />}>
                <Route path="/videos/:videoId/edit" element={<EditVideo />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute signedIn={signedIn} />}>
              <Route element={<SettingLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Setting />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
