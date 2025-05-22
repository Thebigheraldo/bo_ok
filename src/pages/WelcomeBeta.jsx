import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeBeta.css';

const WelcomeBeta = () => {
  return (
    <div className="welcome-beta">
      <h1>👋 Benvenuto alla Beta di Bo_oK</h1>
      <p>Grazie per testare la nostra app! Bo_oK è uno spazio per lettori dove puoi tracciare i tuoi progressi, condividere pensieri e scoprire nuovi libri.</p>
      <ul>
        <li>📚 Personalizza il tuo profilo</li>
        <li>📈 Traccia la tua lettura</li>
        <li>📝 Scrivi il tuo pensiero del giorno</li>
        <li>👥 Entra nella community</li>
      </ul>
      <p>Per iniziare, accedi o registrati:</p>
      <Link to="/login"><button className="btn">Vai al Login</button></Link>
    </div>
  );
};

export default WelcomeBeta;
