import React, { useState } from 'react';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([
    { user: 'Chiara', text: 'Ho appena finito “Norwegian Wood”. Emozionante!' },
    { user: 'Luca', text: 'Qualcuno ha letto “La strada”? Che ne pensate?' }
  ]);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts(prev => [...prev, { user: 'Tu', text: newPost }]);
      setNewPost('');
    }
  };

  return (
    <div className="community-wrapper">
      <div className="community-box">
        <h2>🌍 La tua Community</h2>
        <p className="description">Condividi riflessioni e scopri cosa stanno leggendo gli altri utenti.</p>

        <textarea
          placeholder="Scrivi qualcosa per la community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>

        <button onClick={handlePost}>Pubblica</button>

        <div className="community-feed">
          {posts.map((p, i) => (
            <div key={i} className="community-post">
              <strong>{p.user}:</strong> <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;

