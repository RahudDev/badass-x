import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Task.css'; // Import the CSS file
import { useTranslation } from 'react-i18next';


const Task = ({ task }) => {
  const { t } = useTranslation();


  return (
    <Card className={`shadow-sm task-card`}>
      <Card.Img variant="top" src={task.image} className="task-image" />
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <Button variant="primary" onClick={task.onClick}>
          {t('task.button_task')}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Task;
