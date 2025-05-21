import React, { useEffect, useState } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase';
import './UsageDashboard.css';

const UsageDashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    posts: 0,
    journalEntries: 0,
    estimatedReads: 0,
    estimatedWrites: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [usersSnap, postsSnap] = await Promise.all([
        getCountFromServer(collection(db, 'users')),
        getCountFromServer(collection(db, 'posts'))
      ]);

      const usersCount = usersSnap.data().count;
      const postsCount = postsSnap.data().count;
      const journalEntriesCount = usersCount * 5;

      const estimatedReads = usersCount * 3 + postsCount * 2;
      const estimatedWrites = postsCount + journalEntriesCount;

      setCounts({
        users: usersCount,
        posts: postsCount,
        journalEntries: journalEntriesCount,
        estimatedReads,
        estimatedWrites
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className="usage-wrapper">
      <div className="usage-box">
        <h2>📊 Firebase Usage Dashboard</h2>
        <ul>
          <li>👤 Utenti: {counts.users}</li>
          <li>📝 Post pubblicati: {counts.posts}</li>
          <li>📓 Pensieri stimati: {counts.journalEntries}</li>
          <li>📖 Letture stimate (oggi): {counts.estimatedReads}</li>
          <li>✍️ Scritture stimate (oggi): {counts.estimatedWrites}</li>
        </ul>
        <p className="note">⚠️ Stima locale. Per dati reali, usa la Firebase Console → Usage.</p>
      </div>
    </div>
  );
};

export default UsageDashboard;
