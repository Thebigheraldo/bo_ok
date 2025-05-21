import React, { useState } from 'react';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      user: 'Chiara',
      text: 'Ho appena finito “Norwegian Wood”. Emozionante!',
      tag: '💭 Riflessione',
      createdAt: new Date().toLocaleString(),
      reactions: { like: 0, love: 0, think: 0 },
      comments: []
    },
    {
      user: 'Luca',
      text: 'Qualcuno ha letto “La strada”? Che ne pensate?',
      tag: '❓ Domanda',
      createdAt: new Date().toLocaleString(),
      reactions: { like: 0, love: 0, think: 0 },
      comments: []
    }
  ]);
  const [newPost, setNewPost] = useState('');
  const [newTag, setNewTag] = useState('💭 Riflessione');

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts(prev => [
        ...prev,
        {
          user: 'Tu',
          text: newPost,
          tag: newTag,
          createdAt: new Date().toLocaleString(),
          reactions: { like: 0, love: 0, think: 0 },
          comments: []
        }
      ]);
      setNewPost('');
    }
  };

  const handleReact = (index, type) => {
    setPosts(prev =>
      prev.map((p, i) =>
        i === index ? { ...p, reactions: { ...p.reactions, [type]: p.reactions[type] + 1 } } : p
      )
    );
  };

  const handleComment = (index, commentText) => {
    if (!commentText.trim()) return;
    setPosts(prev =>
      prev.map((p, i) =>
        i === index ? { ...p, comments: [...p.comments, { user: 'Tu', text: commentText }] } : p
      )
    );
  };

  return (
    <div className="community-wrapper">
      <div className="community-box">
        <h2>🌍 La tua Community</h2>
        <p className="description">Condividi riflessioni, consigli e domande con altri lettori.</p>

        <textarea
          placeholder="Scrivi qualcosa per la community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>

        <select
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="tag-select"
        >
          <option value="💭 Riflessione">💭 Riflessione</option>
          <option value="📚 Consiglio">📚 Consiglio</option>
          <option value="❓ Domanda">❓ Domanda</option>
        </select>

        <button onClick={handlePost}>Pubblica</button>

        <div className="community-feed">
          {posts.map((p, i) => (
            <div key={i} className="community-post">
              <div className="post-header">
                <strong>{p.user}</strong> – <span className="date">📅 {p.createdAt}</span>
              </div>
              <div className="post-tag">{p.tag}</div>
              <p>{p.text}</p>

              <div className="reactions">
                <button onClick={() => handleReact(i, 'like')}>👍 {p.reactions.like}</button>
                <button onClick={() => handleReact(i, 'love')}>❤️ {p.reactions.love}</button>
                <button onClick={() => handleReact(i, 'think')}>🤔 {p.reactions.think}</button>
              </div>

              <div className="comment-section">
                <h5>💬 Commenti</h5>
                <ul>
                  {p.comments.map((c, j) => (
                    <li key={j}><strong>{c.user}:</strong> {c.text}</li>
                  ))}
                </ul>
                <CommentInput onSubmit={(text) => handleComment(i, text)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CommentInput = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSend = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="comment-input">
      <input
        type="text"
        placeholder="Aggiungi un commento..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSend}>Invia</button>
    </div>
  );
};

export default Community;

