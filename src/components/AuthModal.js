import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Tab, Nav } from 'react-bootstrap';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function AuthModal({ show, handleClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setEmail('');
    setPassword('');
    setConfirm('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      reset();
      handleClose();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      reset();
      handleClose();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{activeTab === 'login' ? 'Login' : 'Sign Up'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeTab} onSelect={(k) => { setActiveTab(k); setError(''); }}>
          <Nav variant="tabs" className="justify-content-center mb-3">
            <Nav.Item>
              <Nav.Link eventKey="login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="signup">Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Form onSubmit={handleLogin}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button type="submit">Login</Button>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="signup">
              <Form onSubmit={handleSignup}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                </Form.Group>
                <Button type="submit">Sign Up</Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
