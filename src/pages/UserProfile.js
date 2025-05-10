import React from 'react';
import { Card, ListGroup, Container, Form } from 'react-bootstrap';
import users from '../data/Users.js';
import { useUser } from '../context/UserContext.js';

function UserProfile() {
  const { selectedUserId, setSelectedUserId, currentUser } = useUser();

  const handleChange = (e) => {
    setSelectedUserId(parseInt(e.target.value));
  };

  return (
    <Container className="mt-4">
      <h2>👤 Profile: {currentUser.name}</h2>

      <Form.Select
        onChange={handleChange}
        value={selectedUserId}
        className="mb-4"
        style={{ maxWidth: '300px' }}
      >
        {users.map((user, index) => (
          <option key={user.id} value={index}>
            {user.name}
          </option>
        ))}
      </Form.Select>

      <Card>
        <Card.Body>
          <Card.Title>Bio</Card.Title>
          <Card.Text>{currentUser.bio}</Card.Text>

          <Card.Title className="mt-4">Favorite Genres</Card.Title>
          <ListGroup>
            {currentUser.favoriteGenres.map((genre, idx) => (
              <ListGroup.Item key={idx}>{genre}</ListGroup.Item>
            ))}
          </ListGroup>

          <Card.Title className="mt-4">Books Read</Card.Title>
          <ListGroup>
            {currentUser.readBooks.map((book, idx) => (
              <ListGroup.Item key={idx}>{book}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserProfile;

