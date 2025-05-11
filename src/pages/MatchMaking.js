import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useUser } from '../context/UserContext';

const mockUsers = [
  {
    name: 'Clara',
    bio: 'Poetry lover.',
    favoriteGenres: ['Poetry', 'Romance'],
  },
  {
    name: 'Leo',
    bio: 'Obsessed with dystopias.',
    favoriteGenres: ['Sci-fi', 'Dystopia'],
  },
  {
    name: 'Mina',
    bio: 'Exploring world literature.',
    favoriteGenres: ['Drama', 'History'],
  }
];

function Matchmaking() {
  const { firebaseUser, currentUser, loading } = useUser();

  if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
  if (!firebaseUser || !currentUser) {
    return (
      <Container className="mt-4">
        <h3 className="text-danger">🔒 Please log in to see matches.</h3>
      </Container>
    );
  }

  const matches = mockUsers.filter(user =>
    user.favoriteGenres.some(g => currentUser.favoriteGenres?.includes(g))
  );

  return (
    <Container className="mt-4">
      <h2>📖 Literary Matches for {currentUser.name}</h2>
      <Row>
        {matches.map((match, idx) => (
          <Col md={4} key={idx}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{match.name}</Card.Title>
                <Card.Text>{match.bio}</Card.Text>
                <strong>Common Genres:</strong>
                <ul>
                  {match.favoriteGenres
                    .filter(g => currentUser.favoriteGenres?.includes(g))
                    .map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Matchmaking;

