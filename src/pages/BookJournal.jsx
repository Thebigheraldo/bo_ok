import React, { useState } from 'react';
import './BookJournal.css';
import { useUser } from '../context/UserContext';

const moodOptions = ['😊', '😢', '😠', '😍', '💭', '😌'];

const BookJournal = () => {
  const { currentUser } = useUser();
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const handleSave = () => {
    if (entry.trim()) {
      setEntries(prev => [
        ...prev,
        {
          text: entry,
          date: new Date().toLocaleDateString(),
          book: selectedBook,
          mood: selectedMood
        }
      ]);
      setEntry('');
      setSelectedBook('');
      setSelectedMood('');
    }
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm('Sei sicuro di voler eliminare questo pensiero?');
    if (confirmed) {
      setEntries(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="journal-wrapper">
      <div className="journal-box">
        <h2>📓 Il tuo diario di lettura</h2>
        <p className="description">Scrivi le tue riflessioni, associa un libro e un'emozione al tuo pensiero.</p>

        <textarea
          placeholder="Scrivi qui il tuo pensiero del giorno..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        ></textarea>

        {currentUser?.readBooks?.length > 0 && (
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="journal-dropdown"
          >
            <option value="">Scegli un libro letto</option>
            {currentUser.readBooks.map((book, i) => (
              <option key={i} value={book}>{book}</option>
            ))}
          </select>
        )}

        <div className="mood-picker">
          {moodOptions.map((mood, i) => (
            <button
              key={i}
              className={`mood-btn ${selectedMood === mood ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>

        <button onClick={handleSave}>Salva pensiero</button>

        <div className="journal-entries">
          {entries.length === 0 ? (
            <p className="no-entry">Nessun pensiero salvato ancora.</p>
          ) : (
            entries.map((e, i) => (
              <div key={i} className="journal-entry">
                <div className="entry-header">
                  <span className="date">📅 {e.date}</span>
                  <button className="delete-entry" onClick={() => handleDelete(i)}>✖</button>
                </div>
                {e.book && <p><strong>📖 Libro:</strong> {e.book}</p>}
                {e.mood && <p><strong>🧠 Emozione:</strong> {e.mood}</p>}
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



