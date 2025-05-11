import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // vai alla home dopo la registrazione
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>🆕 Create an Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
}

export default Signup;
