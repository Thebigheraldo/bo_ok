import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useUser } from '../context/UserContext';

function Community() {
  const { currentUser } = useUser();
  const storageKey = 'community_posts';

  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  const handlePost = () => {
    const newPost = {
      user: currentUser.name,
      userId: currentUser.id,
      text: message,
      date: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem(storageKey, JSON.stringify(updatedPosts));
    setMessage('');
  };

  return (
    <Container className="mt-4">
      <h2>💬 Community Discussion</h2>

      <Form className="my-3">
        <Form.Group>
          <Form.Label>Write something...</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button
          className="mt-2"
          onClick={handlePost}
          disabled={!message.trim()}
        >
          Post
        </Button>
      </Form>

      {posts.length === 0 && <p>No posts yet. Start the discussion!</p>}
      {posts.map((post, idx) => (
        <Card key={idx} className="mb-3">
          <Card.Body>
            <Card.Text>{post.text}</Card.Text>
            <Card.Footer className="text-muted text-end" style={{ fontSize: '0.8em' }}>
              {post.user} • {post.date}
            </Card.Footer>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Community;
