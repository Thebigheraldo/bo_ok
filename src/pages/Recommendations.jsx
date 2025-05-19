import React, { useEffect, useState } from 'react';
import './Recommendations.css';
import { useUser } from '../context/UserContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Recommendations = () => {
  const { currentUser } = useUser();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!currentUser || !currentUser.favoriteGenres) return;

      const booksRef = collection(db, 'books');
      const snapshot = await getDocs(booksRef);

      const recommendedBooks = snapshot.docs
        .map(doc => doc.data())
        .filter(book =>
          book.genres?.some(genre => currentUser.favoriteGenres.includes(genre))
        );

      setBooks(recommendedBooks);
    };

    fetchRecommendations();
  }, [currentUser]);

  return (
    <div className="recommendations-wrapper">
      <div className="recommendations-box">
        <h2>📚 Suggerimenti di Lettura</h2>
        <p className="description">
          Ecco alcuni libri che potrebbero piacerti, basati sui tuoi generi preferiti.
        </p>

        {books.length === 0 ? (
          <p className="no-recommendation">Nessun suggerimento disponibile al momento.</p>
        ) : (
          <ul className="book-list">
            {books.map((book, index) => (
              <li key={index} className="book-item">
                <h4>{book.title}</h4>
                <p><strong>Autore:</strong> {book.author}</p>
                <p><strong>Generi:</strong> {book.genres.join(', ')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recommendations;



