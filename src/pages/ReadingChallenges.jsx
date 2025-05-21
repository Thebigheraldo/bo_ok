import React, { useState } from 'react';
import './ReadingChallenges.css';

const ReadingChallenges = () => {
  const [challenges, setChallenges] = useState([
    { title: 'Leggere 5 libri classici', progress: 0, total: 5 },
    { title: 'Completare 3 romanzi fantasy', progress: 0, total: 3 },
    { title: 'Scrivi quattro recensioni', progress: 0, total: 4 },
    { title: 'Leggi due romanzi un un mese', progress: 0, total: 2 }
  ]);
  const [newChallenge, setNewChallenge] = useState('');

  const handleAdd = () => {
    if (newChallenge.trim()) {
      setChallenges(prev => [...prev, { title: newChallenge, progress: 0, total: 1 }]);
      setNewChallenge('');
    }
  };

  const handleIncrement = (index) => {
    setChallenges(prev =>
      prev.map((c, i) =>
        i === index && c.progress < c.total ? { ...c, progress: c.progress + 1 } : c
      )
    );
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm('Vuoi davvero eliminare questa sfida?');
    if (confirmed) {
      setChallenges(prev => prev.filter((_, i) => i !== index));
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
                <div className="challenge-header">
                  <h4>{c.title}</h4>
                  <button className="delete-challenge" onClick={() => handleDelete(i)}>✖</button>
                </div>
                <progress value={c.progress} max={c.total}></progress>
                <p>{c.progress} di {c.total} completati</p>
                {c.progress < c.total && (
                  <button className="increment-btn" onClick={() => handleIncrement(i)}>+1 libro</button>
                )}
                {c.progress === c.total && <span className="badge">🏅 Completata!</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReadingChallenges;



