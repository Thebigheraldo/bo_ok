import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const saveUserProfile = async (uid, profile) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, profile, { merge: true }); // merge evita di sovrascrivere tutto
};

export const getUserProfile = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};
