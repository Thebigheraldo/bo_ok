import React, { useState } from 'react';
import './ReadingChallenges.css';

const ReadingChallenges = () => {
  const [challenges, setChallenges] = useState([
    { title: 'Leggere 5 libri classici', progress: 2, total: 5 },
    { title: 'Completare 3 romanzi fantasy', progress: 1, total: 3 }
  ]);
  const [newChallenge, setNewChallenge] = useState('');

  const handleAdd = () => {
    if (newChallenge.trim()) {
      setChallenges(prev => [...prev, { title: newChallenge, progress: 0, total: 1 }]);
      setNewChallenge('');
    }
  };

  return (
    <div className="challenges-wrapper">
      <div className="challenges-box">
        <h2>🏁 Sfide di Lettura</h2>
        <p className="description">Imposta i tuoi obiettivi e monitora i tuoi progressi.</p>

        <div className="add-challenge">
          <input
            type="text"
            placeholder="Aggiungi una nuova sfida"
            value={newChallenge}
            onChange={(e) => setNewChallenge(e.target.value)}
          />
          <button onClick={handleAdd}>Aggiungi</button>
        </div>

        {challenges.length === 0 ? (
          <p className="no-challenge">Nessuna sfida attiva.</p>
        ) : (
          <ul className="challenge-list">
            {challenges.map((c, i) => (
              <li key={i} className="challenge-item">
                <h4>{c.title}</h4>
                <progress value={c.progress} max={c.total}></progress>
                <p>{c.progress} di {c.total} completati</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReadingChallenges;


