import React, { useEffect, useState,  useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { API_URL } from '../App';
import { useLocation } from 'react-router-dom'; 
import './surveycpx.css';

const SurveyDashboard = () => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const location = useLocation(); 

    const handleSurveyResponse = useCallback(() => {
        const params = new URLSearchParams(location.search);
        const type = params.get('type'); 
        const rewards = parseFloat(params.get('rewards')); 

        if (type === 'complete') {
            setAlertMessage('🎉 Congratulations! You successfully completed the survey.');
            setShowModal(true); 
        } else if (type === 'out' && rewards === 1) {
            setAlertMessage("😄 Don't be sad! Here's a bonus of 1 cuan for your effort.");
            setShowModal(true); 
        } else if (type === 'out') {
            setAlertMessage('😕 Sorry, you were screened out. Better luck next time!');
            setShowModal(true); 
        } else {
            setAlertMessage(null); 
        }
    }, [location.search]);

    useEffect(() => {
        handleSurveyResponse(); 

        const userid = localStorage.getItem('uuid');
        const useremail = localStorage.getItem('email');
        const fetchSurveys = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/cpx-surveys`, {
                    params: { ext_user_id: userid, email: useremail } 
                });
                const surveyData = response.data.surveys || [];
                setSurveys(Array.isArray(surveyData) ? surveyData : []);
            } catch (error) {
                setError('Failed to fetch surveys');
            } finally {
                setLoading(false);
            }
        };

        fetchSurveys();
    }, [location, handleSurveyResponse]);

    
    const handleCloseModal = () => {
        setShowModal(false);
    };

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
            <div className='loading-container-google align-items-center justify-content-center min-vh-100'>
            <div className="spinner-google"></div>
            <div className="loading-text-google">Fetching Surveys...</div>
          </div>
        );
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }

   

    const countSurveys = surveys.length;

    return (
        <Container>
            <h1 className="my-4"><strong>Available Surveys</strong></h1>
            <p>
                {countSurveys > 0 
                    ? `We have ${countSurveys} available Surveys`
                    : 'Sorry, we have no surveys right now. Please come back later.'}
            </p>
            <Row className="d-flex flex-wrap justify-content-center">
                {surveys.length > 0 ? surveys.map(survey => (
                    <Col key={survey.id} className="mb-3 d-flex justify-content-start">
                    <Card className="shadow-lg offer-card-surveys" style={{ flexDirection: 'column', justifyContent: 'space-between' ,cursor: 'pointer', position: 'relative'}} onClick={() => window.open(survey.href, '_blank', 'noopener noreferrer')}>
                    <Card.Img variant="top" src='https://od.lk/s/NjFfODg3MDAxNjhf/stars-4-removebg-preview.png' />
                    <div className="play-overlay">
                             <button className="play-btn">
                               <FontAwesomeIcon icon={faPlay} size="2x" />
                              </button>
                             </div>
                            <Card.Body>
                                <Card.Title style={{ color: '#28a745', marginBottom : '10px' }}><strong>+{Math.round(survey.payout)} $CUAN</strong></Card.Title>
                                <Card.Text> <FontAwesomeIcon icon={faClock} className="me-2" />{survey.loi} min</Card.Text>
                                <Card.Text> <StarRating rating={survey.statistics_rating_avg} ratingCount={survey.statistics_rating_count} /></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : (
                    <Col>
                        <p>No surveys available at the moment.</p>
                    </Col>
                )}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header>
                    <Modal.Title className='text-center'>Survey Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="fs-4">{alertMessage}</p> 
                </Modal.Body>
                <Modal.Footer>
                <Button className="custom-btn" onClick={handleCloseModal}>Okay</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default SurveyDashboard;
