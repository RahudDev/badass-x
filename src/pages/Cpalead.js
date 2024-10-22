import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaPlay } from 'react-icons/fa'; // Make sure to install react-icons
import { API_URL } from '../App';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const uuid = localStorage.getItem('uuid');
        
        if (!uuid) {
          throw new Error('UUID not found in localStorage');
        }

        // Fetch offers from both CPAlead and CPAgrip
        const [cpaleadResponse, cpagripResponse] = await Promise.all([
          axios.get(`${API_URL}/api/cpalead-offers?uuid=${uuid}`),
          axios.get(`${API_URL}/api/cpagrip-offers?uuid=${uuid}`)
        ]);

        const cpaleadOffers = cpaleadResponse.data.offers || [];
        const cpagripOffers = (cpagripResponse.data.offers || []).map((offer) => ({
          id: offer.offer_id,
          title: offer.title,
          description: offer.description,
          amount: parseFloat(offer.payout), // Map payout to amount
          creatives: { url: offer.offerphoto }, // Map offerphoto to creatives.url
          link: offer.offerlink, // Map offerlink to link
          device: offer.accepted_countries, // This can be changed if needed
          conversion: offer.category, // Use category for conversion or similar
          payout_type: offer.type // Map type to payout_type if applicable
        }));

        // Combine the offers from both sources
        const combinedOffers = [...cpaleadOffers, ...cpagripOffers];

        setOffers(combinedOffers);
        setLoading(false);
      } catch (err) {
        setError('Error fetching offers');
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);
  
  const handleClose = () => setShow(false);
  const handleShow = (offer) => {
    setSelectedOffer(offer);
    setShow(true);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading offers...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        {offers.map((offer) => (
          <Col md={4} className="mb-4" key={offer.id}>
            <Card className="h-100 w-75 shadow-sm">
              <Card.Img
                variant="top"
                src={offer.creatives.url}
                alt={offer.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{offer.title}</Card.Title>
                <Card.Text>
                <strong>Amount:</strong> {(offer.amount * 100 * 0.7).toFixed(0)} $CUAN
                </Card.Text>
                <Button variant="primary" className='ml-2' onClick={() => handleShow(offer)}>
                Go to Offer
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedOffer && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedOffer.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Description:</strong></p>
            <div dangerouslySetInnerHTML={{ __html: selectedOffer.description }} />
            <p><strong>Steps:</strong> {selectedOffer.conversion}</p>
            <p><strong>Device:</strong> {selectedOffer.device}</p>
            <p><strong>Payout Type:</strong> {selectedOffer.payout_type}</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              variant="primary"
              className="w-100 d-flex align-items-center justify-content-center"
              onClick={() => window.open(selectedOffer.link, '_blank')}
            >
              <FaPlay className="me-2" />
              Earn {(selectedOffer.amount * 100 * 0.7).toFixed(0)} $CUAN
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default OffersPage;
