import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useUser } from '../context/UserContext';

function BookJournal() {
  const { firebaseUser, currentUser, loading } = useUser();
  const storageKey = `journal_${firebaseUser?.uid}`;
  const [entry, setEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);

  useEffect(() => {
    if (firebaseUser) {
      const data = localStorage.getItem(storageKey);
      if (data) setSavedEntries(JSON.parse(data));
    }
  }, [firebaseUser]);

  const handleSave = () => {
    const newEntries = [...savedEntries, { text: entry, date: new Date().toLocaleString() }];
    localStorage.setItem(storageKey, JSON.stringify(newEntries));
    setSavedEntries(newEntries);
    setEntry('');
  };

  if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
  if (!firebaseUser || !currentUser) {
    return (
      <Container className="mt-4">
        <h3 className="text-danger">🔒 Please log in to access your journal.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>📓 {currentUser.name}'s Book Journal</h2>
      <Form className="mt-3">
        <Form.Group>
          <Form.Label>New Entry</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" onClick={handleSave} disabled={!entry.trim()}>
          Save Entry
        </Button>
      </Form>
      <hr />
      <h4 className="mt-4">Previous Entries</h4>
      {savedEntries.length === 0 && <p>No journal entries yet.</p>}
      {savedEntries.map((e, idx) => (
        <Card key={idx} className="mb-3">
          <Card.Body>
            <Card.Text>{e.text}</Card.Text>
            <Card.Footer className="text-muted text-end" style={{ fontSize: '0.8em' }}>
              {e.date}
            </Card.Footer>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default BookJournal;


