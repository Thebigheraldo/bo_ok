import React from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import books from '../data/books';

function Recommendations() {
  const { firebaseUser, currentUser, loading } = useUser();

  if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
  if (!firebaseUser || !currentUser) {
    return (
      <Container className="mt-4">
        <h3 className="text-danger">🔒 Please log in to see book suggestions.</h3>
      </Container>
    );
  }

  const recommendedBooks = books.filter(book =>
    book.genres.some(genre => currentUser.favoriteGenres?.includes(genre))
  );

  return (
    <Container className="mt-4">
      <h2>🔍 Recommended for {currentUser.name}</h2>
      {recommendedBooks.length === 0 && <p>No recommendations based on your preferences.</p>}
      <Row>
        {recommendedBooks.map(book => (
          <Col md={4} key={book.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <div>
                  {book.genres.map((g, idx) => (
                    <Badge key={idx} bg="info" className="me-1">{g}</Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Recommendations;


