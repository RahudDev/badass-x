import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Task.css'; // Make sure to import the CSS file

const Task = ({ task }) => {
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';

  return (
    <Card
      className={`shadow-sm task-card ${!isVerified ? 'animate-slide' : ''}`}>
      <Card.Img variant="top" src={task.image} className="task-image" />
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <Button variant="primary" href={task.href[0]}>
          Go to Task
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Task;
