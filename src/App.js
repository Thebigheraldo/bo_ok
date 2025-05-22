import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import Matchmaking from './pages/Matchmaking';

import BookJournal from './pages/BookJournal';
import ReadingChallenges from './pages/ReadingChallenges';
import Community from './pages/Community';
import Recommendations from './pages/Recommendations';
import EditProfile from './pages/EditProfile';
import LoginPage from './pages/LoginPage'; // nuova pagina iniziale

import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import PrivateRoute from './components/PrivateRoute'; // componente per proteggere le rotte
import { useUser } from './context/UserContext';
import WelcomeBeta from './pages/WelcomeBeta';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { firebaseUser, logout } = useUser();

  return (
    <Router>
      {firebaseUser && (
        <Navbar
          firebaseUser={firebaseUser}
          onLogout={logout}
          onLoginClick={() => setShowAuthModal(true)}
        />
      )}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/matchmaking"
          element={
            <PrivateRoute>
              <Matchmaking />
            </PrivateRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <PrivateRoute>
              <BookJournal />
            </PrivateRoute>
          }
        />
        <Route
          path="/challenges"
          element={
            <PrivateRoute>
              <ReadingChallenges />
            </PrivateRoute>
          }
        />
        <Route
          path="/community"
          element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <PrivateRoute>
              <Recommendations />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/welcome" element={<WelcomeBeta />} />
      </Routes>

      <AuthModal show={showAuthModal} handleClose={() => setShowAuthModal(false)} />
    </Router>
  );
}

export default App;




