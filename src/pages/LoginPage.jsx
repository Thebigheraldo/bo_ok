import React from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import './LoginPage.css';

const LoginPage = () => {
  const { firebaseUser } = useUser();
  const [showModal, setShowModal] = React.useState(true);

  if (firebaseUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Benvenuto su <span className="logo">Bo_oK</span></h1>
        <p>Effettua il login o registrati per iniziare il tuo viaggio letterario.</p>
        <button className="login-button" onClick={() => setShowModal(true)}>Accedi o Registrati</button>
      </div>
      <AuthModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default LoginPage;
