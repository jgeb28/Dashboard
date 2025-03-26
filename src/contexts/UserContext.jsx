import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("userId")));

  const changeUser = (newUserId) => {
    localStorage.setItem("userId", JSON.stringify(newUserId));
    setUserId(newUserId);
  };

  return (
    <UserContext.Provider value={{ userId, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};