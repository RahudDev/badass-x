import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { TOKENBITLABS, bitlatbs_url_surveys } from '../config';

const BitlabsSurveyslist = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restrictionMessage, setRestrictionMessage] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      const userid = localStorage.getItem('uuid');
      if (!userid) {
        setError('UUID not found in local storage');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(bitlatbs_url_surveys, {
          method: 'GET',
          headers: {
            'X-Api-Token': TOKENBITLABS,
            'X-User-Id': userid,
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Handle restriction reasons
        if (data.data.restriction_reason) {
          const { not_verified, using_vpn, banned_until, reason, unsupported_country } = data.data.restriction_reason;

          if (not_verified) {
            setRestrictionMessage('The publisher account that owns this app has not been verified and therefore cannot receive surveys.');
          } else if (using_vpn) {
            setRestrictionMessage('You are using a VPN and cannot access surveys.');
          } else if (banned_until) {
            setRestrictionMessage(`You have been temporarily banned until ${new Date(banned_until).toLocaleString()}. Reason: ${reason}`);
          } else if (unsupported_country) {
            setRestrictionMessage('Surveys are not available for your country.');
          }
          
          setLoading(false);
          return;
        }

        // If no surveys are returned, set a message
        if (data.data.surveys.length === 0) {
          setRestrictionMessage('No surveys available at the moment.');
          setLoading(false);
          return;
        }

        setSurveys(data.data.surveys);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const StarRating = ({ rating, ratingCount }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);
    return (
      <div className="star-rating d-flex align-items-center">
        {stars.map((star) => (
          <span key={star} className={star <= rating ? 'text-warning' : 'text-muted'}>
            ★
          </span>
        ))}
        <span className="ms-2">({ratingCount})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-google" role="status">
          <p className="visually-hidden">Loading Surveys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (restrictionMessage) {
    return (
      <Container className="text-center my-5">
        <Alert variant="warning">{restrictionMessage}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="my-4">Available Surveys</h1>
      <Row className="d-flex flex-wrap justify-content-center">
        {surveys.map((survey) => (
          <Col key={survey.id} className="mb-3 d-flex justify-content-center">
          <Card className="shadow-lg offer-card" style={{ borderRadius: '10px', padding: '10px', width: '200px', margin: '0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <Card.Img variant="top" src={survey.category.icon_url} />
              <Card.Body>
                <Card.Title>{survey.category.name}</Card.Title>
                <Card.Text>
                  {survey.value} $CUAN<br />
                  <FontAwesomeIcon icon={faClock} className="me-2" />{survey.loi} mins <br />
                  <StarRating rating={survey.rating} ratingCount={survey.rating} />
                </Card.Text>
                <Button 
                  variant="primary" 
                  href={survey.click_url} 
                  target="_blank"
                >
                  Take Survey
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BitlabsSurveyslist;
