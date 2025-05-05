import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Task.css'; // Import the CSS file
import { useTranslation } from 'react-i18next';


const Task = ({ task }) => {
  const { t } = useTranslation();

  const Cuangreen = (text) => {
    const parts = text.split("$CUAN");
    return (
      <>
        {parts[0]}
        <strong style={{ color: "#28a745" }}>$CUAN</strong>
        {parts[1]}
      </>
    );
  };


  return (
    <Card className={`shadow-sm task-card`} >
      <Card.Img variant="top" src={task.image} className="task-image" />
      <Card.Body className='card_prime' style={{border: '2px solid #ddd'}}>
        <Card.Title><strong>{task.title}</strong></Card.Title>
        <Card.Text>{Cuangreen(task.description)}</Card.Text>
        <Button variant="primary" onClick={task.onClick}>
          {t('task.button_task')}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Task;
