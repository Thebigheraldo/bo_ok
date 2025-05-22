import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


const Navbar = ({ firebaseUser, onLogout, onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'menu-active' : ''}`}>
   <div className="navbar-logo clickable" onClick={toggleMenu}>
  <span className="navbar-title">Bo_oK</span>
  <span className="menu-icon">☰</span>
</div>


      <div className={`navbar-overlay ${menuOpen ? 'show' : ''}`} onClick={toggleMenu}></div>

      <div className={`navbar-slideout ${menuOpen ? 'open' : ''}`}>
        <ul className="navbar-menu">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/matchmaking" onClick={toggleMenu}>Matchmaking</Link></li>
          <li><Link to="/journal" onClick={toggleMenu}>Journal</Link></li>
          <li><Link to="/challenges" onClick={toggleMenu}>Sfide</Link></li>
          <li><Link to="/community" onClick={toggleMenu}>Community</Link></li>
          <li><Link to="/recommendations" onClick={toggleMenu}>Suggerimenti</Link></li>
        </ul>

        <div className="navbar-auth">
          {firebaseUser ? (
            <>
              <span className="user-email">👋 {firebaseUser.email}</span>
              <button className="btn-logout" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <button className="btn-login" onClick={onLoginClick}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
