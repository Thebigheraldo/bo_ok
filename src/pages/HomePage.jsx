// HomePage.jsx
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const quotes = [
  { text: 'Leggere ci dà un posto dove andare anche quando dobbiamo restare dove siamo.', author: 'Mason Cooley' },
  { text: 'Un libro è un giardino che puoi custodire in tasca.', author: 'Proverbio arabo' },
  { text: 'Leggere significa sognare con occhi aperti.', author: 'Daniel Pennac' },
  { text: 'I libri sono specchi: riflettono ciò che abbiamo dentro.', author: 'Carlos Ruiz Zafón' },
  { text: 'Una stanza senza libri è come un corpo senz’anima.', author: 'Cicerone' }
];

const HomePage = () => {
  const { firebaseUser, currentUser } = useUser();
  const [quote, setQuote] = useState(quotes[0]);
  const [progress, setProgress] = useState({
    currentBook: 'Il piccolo principe',
    totalPages: 98,
    currentPage: 0,
    notes: ''
  });
  const [log, setLog] = useState([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  useEffect(() => {
    if (!firebaseUser?.uid) return;
    const fetchProgress = async () => {
      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().readingProgress) {
        setProgress(docSnap.data().readingProgress);
      }

      const logRef = collection(db, 'users', firebaseUser.uid, 'readingLog');
      const q = query(logRef, orderBy('timestamp'));
      const querySnapshot = await getDocs(q);
      const logData = querySnapshot.docs.map(doc => doc.data());
      setLog(logData);
    };
    fetchProgress();
  }, [firebaseUser]);
  const handleSaveCurrentBook = async () => {
    if (!firebaseUser?.uid) return;
    const docRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(docRef, {
      readingProgress: {
        ...progress,
        lastUpdated: new Date()
      }
    });
  };
  

  const handleSaveProgress = async () => {
    if (!firebaseUser?.uid) return;
    if (progress.currentPage <= 0 || progress.totalPages <= 0) {
      alert("Inserisci valori validi prima di aggiornare il progresso.");
      return;
    }

    const docRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(docRef, {
      readingProgress: {
        ...progress,
        lastUpdated: new Date()
      }
    });

    const logRef = collection(db, 'users', firebaseUser.uid, 'readingLog');
    await addDoc(logRef, {
      ...progress,
      timestamp: new Date()
    });

    const q = query(logRef, orderBy('timestamp'));
    const querySnapshot = await getDocs(q);
    const logData = querySnapshot.docs.map(doc => doc.data());
    setLog(logData);
  };

  const handleResetProgress = async () => {
    if (!firebaseUser?.uid) return;
    if (!window.confirm("Sei sicuro di voler azzerare tutti i progressi?")) return;

    const userRef = doc(db, 'users', firebaseUser.uid);
    await updateDoc(userRef, {
      readingProgress: {
        currentBook: progress.currentBook,
        currentPage: 0,
        totalPages: 0,
        notes: '',
        lastUpdated: null
      }
    });

    const logRef = collection(db, 'users', firebaseUser.uid, 'readingLog');
    const querySnapshot = await getDocs(logRef);
    const batch = [];

    querySnapshot.forEach((docSnap) => {
      batch.push(deleteDoc(docSnap.ref));
    });

    await Promise.all(batch);

    setProgress({
      ...progress,
      currentPage: 0,
      totalPages: 0,
      notes: ''
    });

    setLog([]);
  };

  const chartData = {
    labels: log.map(entry => new Date(entry.timestamp.seconds * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Progresso di lettura (%)',
        data: log.map(entry => Math.round((entry.currentPage / entry.totalPages) * 100)),
        fill: false,
        backgroundColor: '#9376E0',
        borderColor: '#9376E0'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="homepage-wrapper">
      <div className="homepage-box">
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
            <h2>📖 Stai leggendo</h2>
            <input
              type="text"
              placeholder="Titolo del libro in lettura"
              value={progress.currentBook}
              onChange={(e) => setProgress({ ...progress, currentBook: e.target.value })}
            />
            <div className="reading-actions">
            <button className="btn" onClick={handleSaveCurrentBook} disabled={!progress.currentBook.trim()}>
  Salva
</button>


              <button className="btn danger" onClick={() => setProgress({ ...progress, currentBook: '' })}>Rimuovi</button>
            </div>
          </div>

          <div className="card thought">
            <h2>✍️ Il tuo pensiero del giorno</h2>
            <textarea placeholder="Scrivi qui…">Un libro che sembra per bambini ma è un pugno allo stomaco per gli adulti.</textarea>
          </div>

          <div className="card cardprogress">
            <h2>📊 Il tuo percorso</h2>
            <label>Pagina attuale:</label>
            <input
              type="number"
              value={progress.currentPage}
              onChange={(e) => setProgress({ ...progress, currentPage: parseInt(e.target.value) })}
            />
            <label>Pagine totali:</label>
            <input
              type="number"
              value={progress.totalPages}
              onChange={(e) => setProgress({ ...progress, totalPages: parseInt(e.target.value) })}
            />
            <label>Note emozionali:</label>
            <textarea
              placeholder="Es. Ispirato, nostalgico, commosso..."
              value={progress.notes}
              onChange={(e) => setProgress({ ...progress, notes: e.target.value })}
            />
            <button
              className="btn"
              onClick={handleSaveProgress}
              disabled={progress.currentPage <= 0 || progress.totalPages <= 0}
            >
              Aggiorna progresso
            </button>
            <button className="btn danger" onClick={handleResetProgress}>
              Azzera progresso
            </button>
            {progress.totalPages > 0 && progress.currentPage > 0 && (
              <p>📈 Progresso: {Math.round((progress.currentPage / progress.totalPages) * 100)}%</p>
            )}
            {log.length > 0 && (
              <div className="progress-chart">
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
          </div>

          <div className="card quote">
            <h2>💡 Ispirazione</h2>
            <blockquote>
              “{quote.text}”<br />
              <span className="author">– {quote.author}</span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;





