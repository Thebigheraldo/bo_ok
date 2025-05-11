import React from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import { useUser } from '../context/UserContext';

function UserProfile() {
  const { firebaseUser, currentUser, loading } = useUser();

  if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
  if (!firebaseUser || !currentUser) {
    return (
      <Container className="mt-4">
        <h3 className="text-danger">🔒 Please log in to view your profile.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>👤 Profile: {currentUser.name}</h2>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Bio</Card.Title>
          <Card.Text>{currentUser.bio}</Card.Text>

          <Card.Title className="mt-4">Favorite Genres</Card.Title>
          <ListGroup>
            {currentUser.favoriteGenres?.map((genre, idx) => (
              <ListGroup.Item key={idx}>{genre}</ListGroup.Item>
            ))}
          </ListGroup>

          <Card.Title className="mt-4">Books Read</Card.Title>
          <ListGroup>
            {currentUser.readBooks?.map((book, idx) => (
              <ListGroup.Item key={idx}>{book}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserProfile;


