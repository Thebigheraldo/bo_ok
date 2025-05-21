import React, { useEffect, useState } from 'react';
import './Recommendations.css';
import { useUser } from '../context/UserContext';

const allBooks = [
  { title: 'Il piccolo principe', author: 'Antoine de Saint-Exupéry', genre: 'Narrativa', mood: 'riflessivo', length: 'breve', rating: 4.8 },
  { title: '1984', author: 'George Orwell', genre: 'Distopico', mood: 'intenso', length: 'medio', rating: 4.7 },
  { title: 'L’amica geniale', author: 'Elena Ferrante', genre: 'Narrativa', mood: 'emotivo', length: 'lungo', rating: 4.5 },
  { title: 'Il gabbiano Jonathan Livingston', author: 'Richard Bach', genre: 'Motivazionale', mood: 'ispirante', length: 'breve', rating: 4.3 },
  { title: 'Orgoglio e pregiudizio', author: 'Jane Austen', genre: 'Classico', mood: 'romantico', length: 'medio', rating: 4.6 }
];

const Recommendations = () => {
  const { currentUser } = useUser();
  const [filters, setFilters] = useState({ genre: '', mood: '', length: '' });
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  useEffect(() => {
    let result = allBooks;
    if (filters.genre) {
      result = result.filter(book => book.genre === filters.genre);
    }
    if (filters.mood) {
      result = result.filter(book => book.mood === filters.mood);
    }
    if (filters.length) {
      result = result.filter(book => book.length === filters.length);
    }
    setFilteredBooks(result);
  }, [filters]);

  return (
    <div className="recommend-wrapper">
      <div className="recommend-box">
        <h2>📚 Suggerimenti Personalizzati</h2>
        <p className="description">Scopri nuovi libri in base ai tuoi gusti, stati d’animo e preferenze di lettura.</p>

        <div className="filters">
          <select value={filters.genre} onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}>
            <option value="">Tutti i generi</option>
            <option>Narrativa</option>
            <option>Distopico</option>
            <option>Motivazionale</option>
            <option>Classico</option>
          </select>
          <select value={filters.mood} onChange={(e) => setFilters(prev => ({ ...prev, mood: e.target.value }))}>
            <option value="">Tutti i mood</option>
            <option>riflessivo</option>
            <option>intenso</option>
            <option>emotivo</option>
            <option>ispirante</option>
            <option>romantico</option>
          </select>
          <select value={filters.length} onChange={(e) => setFilters(prev => ({ ...prev, length: e.target.value }))}>
            <option value="">Tutte le lunghezze</option>
            <option>breve</option>
            <option>medio</option>
            <option>lungo</option>
          </select>
        </div>

        {filteredBooks.length === 0 ? (
          <p className="no-result">Nessun libro trovato con i filtri selezionati.</p>
        ) : (
          <ul className="book-list">
            {filteredBooks.map((book, i) => (
              <li key={i} className="book-item">
                <h4>{book.title}</h4>
                <p><strong>Autore:</strong> {book.author}</p>
                <p><strong>Genere:</strong> {book.genre} | <strong>Mood:</strong> {book.mood} | <strong>Lunghezza:</strong> {book.length}</p>
                <p><strong>Valutazione:</strong> ⭐ {book.rating}</p>
                <button className="btn-read">📖 Aggiungi alla tua lista</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recommendations;



