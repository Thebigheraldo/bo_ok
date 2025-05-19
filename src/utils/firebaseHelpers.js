import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

export const getUserProfile = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const saveUserProfile = async (uid, data) => {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
};

export const uploadProfilePicture = async (uid, file) => {
  const storageRef = ref(storage, `profilePictures/${uid}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const deleteProfilePicture = async (uid) => {
  const storageRef = ref(storage, `profilePictures/${uid}`);
  await deleteObject(storageRef);
};

