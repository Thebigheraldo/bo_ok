import React from 'react';
import { Container } from 'react-bootstrap';
import BookList from '../components/BookList';

function Home() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">📖 Welcome to Bo_ok</h1>
      <BookList />
    </Container>
  );
}

export default Home;
