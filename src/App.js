import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile.js';
import Matchmaking from './pages/MatchMaking.js';
import BookJournal from './pages/BookJournal';
import ReadingChallenges from './pages/ReadingChallenges';
import Community from './pages/Community';
import Recommendations from './pages/Recommendations';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Bo_ok</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/matchmaking">Matchmaking</Nav.Link>
              <Nav.Link as={Link} to="/journal">Journal</Nav.Link>
              <Nav.Link as={Link} to="/challenges">Challenges</Nav.Link>
              <Nav.Link as={Link} to="/community">Community</Nav.Link>
              <Nav.Link as={Link} to="/recommendations">Suggestions</Nav.Link>
            </Nav>
            <Button variant="outline-light">Login</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/matchmaking" element={<Matchmaking />} />
        <Route path="/journal" element={<BookJournal />} />
        <Route path="/challenges" element={<ReadingChallenges />} />
        <Route path="/community" element={<Community />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </Router>
  );
}

export default App;


