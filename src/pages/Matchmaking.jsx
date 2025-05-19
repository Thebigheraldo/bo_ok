import React from 'react';
import './Matchmaking.css';

const Matchmaking = () => {
  return (
    <div className="matchmaking-wrapper">
      <div className="matchmaking-box">
        <h2>🤝 Matchmaking Letterario</h2>
        <p className="description">
          Scopri altri utenti con gusti simili ai tuoi! Il sistema ti suggerirà lettori che condividono i tuoi generi preferiti e libri letti.
        </p>

        <div className="match-card">
          <h4>📚 Emma R.</h4>
          <p>Generi comuni: Fantasy, Romanzi Storici</p>
          <button>Visualizza profilo</button>
        </div>

        <div className="match-card">
          <h4>📚 Luca M.</h4>
          <p>Generi comuni: Thriller, Fantascienza</p>
          <button>Visualizza profilo</button>
        </div>

        {/* altri suggerimenti... */}
      </div>
    </div>
  );
};

export default Matchmaking;
