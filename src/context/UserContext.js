import { createContext, useContext, useState } from 'react';
import users from '../data/Users';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const currentUser = users[selectedUserId];

  return (
    <UserContext.Provider value={{ selectedUserId, setSelectedUserId, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
