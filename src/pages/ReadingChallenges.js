import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, Row, Col } from 'react-bootstrap';
import challenges from '../data/challenges';
import { useUser } from '../context/UserContext';

function ReadingChallenges() {
  const { firebaseUser, currentUser, loading } = useUser();
  const storageKey = `challenges_${firebaseUser?.uid}`;
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (firebaseUser) {
      const saved = localStorage.getItem(storageKey);
      if (saved) setProgress(JSON.parse(saved));
    }
  }, [firebaseUser]);

  const toggleChallenge = (id) => {
    const updated = {
      ...progress,
      [id]: !progress[id],
    };
    setProgress(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
  if (!firebaseUser || !currentUser) {
    return (
      <Container className="mt-4">
        <h3 className="text-danger">🔒 Please log in to access Challenges.</h3>
      </Container>
    );
  }

  const completedPoints = challenges.reduce((sum, c) => (
    progress[c.id] ? sum + c.points : sum
  ), 0);

  return (
    <Container className="mt-4">
      <h2>🏆 Reading Challenges</h2>
      <p>
        Progress: <Badge bg="success">{completedPoints} pts</Badge>
      </p>
      <Row>
        {challenges.map(ch => (
          <Col md={6} key={ch.id} className="mb-3">
            <Card border={progress[ch.id] ? 'success' : 'secondary'}>
              <Card.Body>
                <Card.Title>
                  {ch.title} {progress[ch.id] && <Badge bg="success">Completed</Badge>}
                </Card.Title>
                <Card.Text>{ch.description}</Card.Text>
                <Button
                  variant={progress[ch.id] ? 'outline-danger' : 'primary'}
                  onClick={() => toggleChallenge(ch.id)}
                >
                  {progress[ch.id] ? 'Remove' : 'Join'}
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                Reward: {ch.points} pts
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ReadingChallenges;


