import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AdminRoute = ({ children }) => {
  const { firebaseUser, currentUser } = useUser();

  if (!firebaseUser) return <Navigate to="/login" />;
  if (currentUser?.role !== 'admin') return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
