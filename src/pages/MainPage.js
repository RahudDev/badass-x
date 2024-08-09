import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../App';

const MainPage = ({ handleLogout }) => {
  const [userName, setUserName] = useState('');
  const [userPoints, setUserPoints] = useState(0);
 

  useEffect(() => {
    const name = localStorage.getItem('name');
    const storedPoints = parseInt(localStorage.getItem('points')) || 0;
    setUserName(name);
    setUserPoints(storedPoints);
    
    const fetchPoints = async () => {
      const token = localStorage.getItem('token');
      const uuid = localStorage.getItem('uuid');
      try {
        const response = await axios.get(`${API_URL}/api/get-points/${uuid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const points = response.data.points;
        setUserPoints(points);
        localStorage.setItem('points', points);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoints();
  }, []);

  const handleResetPoints = async () => {
    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid');
    try {
      await axios.post(
        `${API_URL}/api/update-points/${uuid}`,
        { pointsToAdd: -userPoints },
        { headers: { Authorization: `Bearer ${token}`} }
      );
      localStorage.setItem('points', 0);
      setUserPoints(0);
    } catch (error) {
      console.error('Error resetting points:', error);
    }
  };

  const handleNavigateToSquarePage = () => {
    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid');
    const isVerified = localStorage.getItem('isVerified');
    const encodedToken = btoa(token);
    window.location.href = `https://rahuddev.github.io/squaregame-x/?squareUUID=${uuid}&badass=${encodedToken}&isVerified=${isVerified}`;
  };


  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Welcome to the Square game, {userName}!</Card.Title>
              <Card.Text>
                This is a simple main page created with Bootstrap.
                <br />
                $CUAN : {userPoints}
              </Card.Text>
              <Button onClick={handleNavigateToSquarePage} className="btn btn-primary">Petak</Button>
              <Button variant="danger" onClick={handleResetPoints}>Reset Points</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
