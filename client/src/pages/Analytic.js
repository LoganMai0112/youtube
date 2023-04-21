/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import AnalyticUser from '../components/AnalyticUser';
import AnalyticAdmin from '../components/AnalyticAdmin';

function Analytic() {
  const currentUser = useContext(UserContext);

  return (
    <>
      {currentUser.role === 'admin' && <AnalyticAdmin />}
      {currentUser.role === 'user' && <AnalyticUser />}
    </>
  );
}

export default Analytic;
