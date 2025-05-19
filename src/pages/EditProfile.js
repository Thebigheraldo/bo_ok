import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import { saveUserProfile, getUserProfile } from '../utils/firebaseHelpers';
import './EditProfile.css';

function EditProfile() {
  const { firebaseUser, currentUser, setCurrentUser } = useUser();
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    favoriteGenres: [],
    readBooks: []
  });
  const [newGenre, setNewGenre] = useState('');
  const [newBook, setNewBook] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (firebaseUser) {
      getUserProfile(firebaseUser.uid).then((data) => {
        if (data) setProfile(data);
      });
    }
  }, [firebaseUser]);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAddGenre = () => {
    if (newGenre && !profile.favoriteGenres.includes(newGenre)) {
      setProfile(prev => ({
        ...prev,
        favoriteGenres: [...prev.favoriteGenres, newGenre]
      }));
      setNewGenre('');
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setProfile(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.filter(g => g !== genreToRemove)
    }));
  };

  const handleAddBook = () => {
    if (newBook && !profile.readBooks.includes(newBook)) {
      setProfile(prev => ({
        ...prev,
        readBooks: [...prev.readBooks, newBook]
      }));
      setNewBook('');
    }
  };

  const handleRemoveBook = (bookToRemove) => {
    setProfile(prev => ({
      ...prev,
      readBooks: prev.readBooks.filter(b => b !== bookToRemove)
    }));
  };

  const handleSave = async () => {
    try {
      await saveUserProfile(firebaseUser.uid, profile);
      setCurrentUser(profile);
      setMessage('✅ Profilo aggiornato con successo!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Errore durante il salvataggio del profilo.');
    }
  };

  if (!firebaseUser) {
    return (
      <Container className="edit-profile-wrapper">
        <h3 className="text-danger">🔒 Effettua il login per modificare il profilo.</h3>
      </Container>
    );
  }

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-box">
        <h2>✏️ Modifica il tuo profilo</h2>
        {message && <Alert className="mt-3">{message}</Alert>}
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Generi preferiti</Form.Label>
            <ul className="tag-list">
              {profile.favoriteGenres.map((g, i) => (
                <li key={i} className="tag-item">
                  {g} <span onClick={() => handleRemoveGenre(g)} className="remove-tag">✖</span>
                </li>
              ))}
            </ul>
            <Form.Control
              value={newGenre}
              placeholder="Aggiungi un genere"
              onChange={(e) => setNewGenre(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGenre())}
            />
            <Button className="mt-2" onClick={handleAddGenre}>Aggiungi genere</Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Libri letti</Form.Label>
            <ul className="tag-list">
              {profile.readBooks.map((b, i) => (
                <li key={i} className="tag-item">
                  {b} <span onClick={() => handleRemoveBook(b)} className="remove-tag">✖</span>
                </li>
              ))}
            </ul>
            <Form.Control
              value={newBook}
              placeholder="Aggiungi un libro"
              onChange={(e) => setNewBook(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBook())}
            />
            <Button className="mt-2" onClick={handleAddBook}>Aggiungi libro</Button>
          </Form.Group>

          <Button onClick={handleSave}>💾 Salva profilo</Button>
        </Form>
      </div>
    </div>
  );
}

export default EditProfile;

