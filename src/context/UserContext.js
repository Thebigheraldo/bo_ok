import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserProfile } from '../utils/firebaseHelpers';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // profilo da Firestore
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(true);

      if (user) {
        const profile = await getUserProfile(user.uid);
        setCurrentUser(profile);
      } else {
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <UserContext.Provider value={{ firebaseUser, currentUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


