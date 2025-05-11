import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserProfile } from '../utils/firebaseHelpers';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);        // utente loggato (email, uid)
  const [currentUser, setCurrentUser] = useState(null);          // profilo salvato su Firestore
  const [loading, setLoading] = useState(true);                  // carica i dati del profilo

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(true);

      if (user) {
        const profile = await getUserProfile(user.uid);
        setCurrentUser(profile || null); // se non esiste ancora, null
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
    <UserContext.Provider value={{
      firebaseUser,
      currentUser,
      setCurrentUser, // 👈 IMPORTANTE: serve per aggiornare il profilo dopo edit
      loading,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);



