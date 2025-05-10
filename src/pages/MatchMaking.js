import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import users from '../data/Users';

const currentUser = users[0];

function getMatches(user, allUsers) {
  return allUsers.filter(
    u => u.id !== user.id && u.favoriteGenres.some(genre => user.favoriteGenres.includes(genre))
  );
}

function Matchmaking() {
  const matches = getMatches(currentUser, users);

  return (
    <Container className="mt-4">
      <h2>📖 Literary Matches for {currentUser.name}</h2>
      <Row>
        {matches.length > 0 ? matches.map(match => (
          <Col md={4} key={match.id}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{match.name}</Card.Title>
                <Card.Text>{match.bio}</Card.Text>
                <strong>Common Genres:</strong>
                <ul>
                  {match.favoriteGenres
                    .filter(g => currentUser.favoriteGenres.includes(g))
                    .map((g, idx) => <li key={idx}>{g}</li>)}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        )) : <p>No literary matches found. Try updating your profile!</p>}
      </Row>
    </Container>
  );
}

export default Matchmaking;
