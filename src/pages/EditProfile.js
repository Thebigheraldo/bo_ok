import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import { saveUserProfile, getUserProfile } from '../utils/firebaseHelpers';

function EditProfile() {
  const { firebaseUser } = useUser();
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

  const handleAddBook = () => {
    if (newBook && !profile.readBooks.includes(newBook)) {
      setProfile(prev => ({
        ...prev,
        readBooks: [...prev.readBooks, newBook]
      }));
      setNewBook('');
    }
  };

  const handleSave = async () => {
    try {
      await saveUserProfile(firebaseUser.uid, profile);
      setMessage('✅ Profile saved!');
    } catch (err) {
      setMessage('❌ Error saving profile.');
    }
  };

  if (!firebaseUser) {
    return (
      <Container className="mt-4">
        <h3 className="text-danger">🔒 Please log in to edit your profile.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2>✏️ Edit Your Profile</h2>
      {message && <Alert className="mt-3">{message}</Alert>}
      <Form className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
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
          <Form.Label>Favorite Genres</Form.Label>
          <ul>
            {profile.favoriteGenres.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
          <Form.Control
            value={newGenre}
            placeholder="Add genre"
            onChange={(e) => setNewGenre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddGenre()}
          />
          <Button className="mt-2" onClick={handleAddGenre}>Add Genre</Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Books Read</Form.Label>
          <ul>
            {profile.readBooks.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <Form.Control
            value={newBook}
            placeholder="Add book"
            onChange={(e) => setNewBook(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddBook()}
          />
          <Button className="mt-2" onClick={handleAddBook}>Add Book</Button>
        </Form.Group>

        <Button onClick={handleSave}>💾 Save Profile</Button>
      </Form>
    </Container>
  );
}

export default EditProfile;
