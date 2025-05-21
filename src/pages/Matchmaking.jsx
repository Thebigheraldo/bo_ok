import React, { useEffect, useState } from 'react';
import './Matchmaking.css';
import { useUser } from '../context/UserContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Matchmaking = () => {
  const { firebaseUser, currentUser } = useUser();
  const [matches, setMatches] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      if (!firebaseUser || !currentUser) return;

      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);

      const potentialMatches = snapshot.docs
        .filter(doc => doc.id !== firebaseUser.uid)
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => {
          const sharedGenres = user.favoriteGenres?.filter(g => currentUser.favoriteGenres?.includes(g));
          return sharedGenres && sharedGenres.length > 0;
        });

      setMatches(potentialMatches);
    };

    fetchMatches();
  }, [firebaseUser, currentUser]);

  const getAffinity = (user) => {
    const shared = user.favoriteGenres.filter(g => currentUser.favoriteGenres.includes(g)).length;
    const total = currentUser.favoriteGenres.length;
    return Math.round((shared / total) * 100);
  };

  const filteredMatches = selectedGenre
    ? matches.filter(user => user.favoriteGenres.includes(selectedGenre))
    : matches;

  const genreOptions = Array.from(
    new Set(matches.flatMap(user => user.favoriteGenres || []))
  ).filter(g => currentUser.favoriteGenres.includes(g));

  return (
    <div className="matchmaking-wrapper">
      <div className="matchmaking-box">
        <h2>🤝 Matchmaking Letterario</h2>
        <p className="description">
          Scopri altri utenti con gusti simili ai tuoi! Il sistema ti suggerisce lettori che condividono i tuoi generi preferiti.
        </p>

        {genreOptions.length > 0 && (
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="genre-filter"
          >
            <option value="">Tutti i generi</option>
            {genreOptions.map((genre, i) => (
              <option key={i} value={genre}>{genre}</option>
            ))}
          </select>
        )}

        {filteredMatches.length === 0 ? (
          <p>🔍 Nessun match trovato al momento.</p>
        ) : (
          filteredMatches.map((user) => {
            const affinity = getAffinity(user);
            const lastBook = user.readBooks?.[user.readBooks.length - 1];
            return (
              <div key={user.id} className="match-card">
                <h4>📚 {user.name || 'Utente anonimo'}</h4>
                <p><strong>Affinità:</strong> {affinity}%</p>
                {user.bio && <p><em>"{user.bio}"</em></p>}
                {lastBook && <p><strong>Sta leggendo:</strong> {lastBook}</p>}
                <p><strong>Generi comuni:</strong> {user.favoriteGenres.filter(g => currentUser.favoriteGenres.includes(g)).join(', ')}</p>
                <button>Visualizza profilo</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Matchmaking;