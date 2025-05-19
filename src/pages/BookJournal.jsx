import React, { useState } from 'react';
import './BookJournal.css';

const BookJournal = () => {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSave = () => {
    if (entry.trim()) {
      setEntries(prev => [...prev, { text: entry, date: new Date().toLocaleDateString() }]);
      setEntry('');
    }
  };

  return (
    <div className="journal-wrapper">
      <div className="journal-box">
        <h2>📓 Il tuo diario di lettura</h2>
        <p className="description">Scrivi le tue riflessioni, emozioni e appunti sui libri che stai leggendo.</p>

        <textarea
          placeholder="Scrivi qui il tuo pensiero del giorno..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        ></textarea>

        <button onClick={handleSave}>Salva pensiero</button>

        <div className="journal-entries">
          {entries.length === 0 ? (
            <p className="no-entry">Nessun pensiero salvato ancora.</p>
          ) : (
            entries.map((e, i) => (
              <div key={i} className="journal-entry">
                <span className="date">{e.date}</span>
                <p>{e.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookJournal;



