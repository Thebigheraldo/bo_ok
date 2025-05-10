import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import books from '../data/books';

function BookList() {
  return (
    <>
      <h2 className="my-4">📚 Latest Books</h2>
      <Row>
        {books.map(book => (
          <Col md={4} key={book.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default BookList;
