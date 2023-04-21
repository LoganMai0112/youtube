import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const UserContext = React.createContext();
export const UserUpdateContext = React.createContext();
export const UserSignedInContext = React.createContext();

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('current_user');
  const [signedIn, setSignedIn] = useState();

  useEffect(() => {
    setSignedIn(Object.keys(currentUser).length !== 0);
  }, [currentUser]);

  return (
    <UserContext.Provider value={currentUser}>
      <UserUpdateContext.Provider value={setCurrentUser}>
        <UserSignedInContext.Provider value={signedIn}>
          {children}
        </UserSignedInContext.Provider>
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
