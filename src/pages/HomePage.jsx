import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const quotes = [
  {
    text: 'Leggere ci dà un posto dove andare anche quando dobbiamo restare dove siamo.',
    author: 'Mason Cooley'
  },
  {
    text: 'Un libro è un giardino che puoi custodire in tasca.',
    author: 'Proverbio arabo'
  },
  {
    text: 'Leggere significa sognare con occhi aperti.',
    author: 'Daniel Pennac'
  },
  {
    text: 'I libri sono specchi: riflettono ciò che abbiamo dentro.',
    author: 'Carlos Ruiz Zafón'
  },
  {
    text: 'Una stanza senza libri è come un corpo senz’anima.',
    author: 'Cicerone'
  }
];

const HomePage = () => {
  const { firebaseUser, currentUser } = useUser();
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="homepage-box">

        {/* Colonna immagine + citazione */}
        <div className="image-column">
          <img
            src="/assets/reader-illustration.png"
            alt="Illustrazione lettura"
            className="illustration"
          />
          <div className="quote-box">
            <blockquote>
              “{quote.text}”
              <span className="author">– {quote.author}</span>
            </blockquote>
          </div>
        </div>

        {/* Colonna contenuti */}
        <div className="content-column">
          <div className="header-row">
            <h1 className="welcome-title">
              Benvenuto in <span>Bo_oK</span>
            </h1>
            <div className="user-info">
              
              <p className="user-name">Ciao, {currentUser?.name || firebaseUser?.email}</p>

              {currentUser?.readBooks?.length > 0 && (
                <p className="user-stats">📚 Libri letti: {currentUser.readBooks.length}</p>
              )}

              {currentUser?.favoriteGenres?.length > 0 && (
                <p className="user-stats">🎯 Genere preferito: {currentUser.favoriteGenres[0]}</p>
              )}

              <Link to="/edit-profile">
                <button className="edit-profile-btn">Modifica profilo</button>
              </Link>
            </div>
          </div>

          <p className="welcome-text">La tua libreria personale, il tuo rifugio letterario.</p>

          <div className="card reading">
            <h2>📖 Continua a leggere</h2>
            <p><strong>Il piccolo principe</strong><br />Antoine de Saint-Exupéry</p>
            <button className="btn">Riprendi la lettura</button>
          </div>

          <div className="card thought">
            <h2>✍️ Il tuo pensiero del giorno</h2>
            <textarea placeholder="Scrivi qui…">Un libro che sembra per bambini ma è un pugno allo stomaco per gli adulti.</textarea>
          </div>

          <div className="card progress">
            <h2>📊 Il tuo percorso</h2>
            <p>Libri letti questo mese: 3</p>
            <p>Emozioni associate: 🎯 riflessivo, 💭 nostalgico</p>
          </div>

          <div className="card quote">
            <h2>💡 Ispirazione</h2>
            <blockquote>
              “Una stanza senza libri è come un corpo senz’anima.”<br />
              <span className="author">– Cicerone</span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;





