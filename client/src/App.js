/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
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
            </Route>
            <Route element={<WatchLayout />}>
              <Route path="/videos/:videoId" element={<WatchVideo />} />
              <Route path="/videos/:videoId/edit" element={<EditVideo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
