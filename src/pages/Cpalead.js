import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'; // For Globe icon
import axios from 'axios';
import { FaPlay } from 'react-icons/fa'; // Make sure to install react-icons
import { API_URL } from '../App';
import './cpalead.css';
import './Notikoffer.css';


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
      <div className='loading-container-google bg-secondary align-items-center justify-content-center min-vh-100'>
      <div className="spinner-google"></div>
      <div className="loading-text-google">Fetching offers...</div>
    </div>
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
    <Container className="mt-5">
     <Row className="d-flex-cpalead flex-wrap justify-content-start  justify-content-md-start">
        {offers.map((offer) => (
          <Col key={offer.id} className="mb-3 d-flex-cpalead justify-content-start justify-content-md-start">
          <Card className="shadow-lg offer-card-cpalead" style={{flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', position: 'relative' }} onClick={() => handleShow(offer)}>
              <Card.Img
                variant="top"
                src={offer.creatives.url}
                alt={offer.title}
                className='card-img-cpalead'
                style={{ objectFit: 'cover', margin: '0 auto' }}
              />
               <div className="play-overlay">
                      <button className="play-btn">
                      <FontAwesomeIcon icon={faPlay} size="2x" />
                     </button>
                </div>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ flexGrow: 1 }}>
                <Card.Title className='text-center title-ellipsis'><strong>{offer.description}</strong></Card.Title>
                <Card.Text className="text-center" style={{ color: '#28a745', marginBottom : '10px' }}>
                <strong> +{(offer.amount * 100 * 0.7).toFixed(0)} $CUAN </strong>
                </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedOffer && (
        <Modal className='modal-cpalead' show={show} onHide={handleClose}>
          <Modal.Header className='modal-inside-body' closeButton>
          <i className="bi bi-gift" style={{ marginRight: '10px'}}></i>
            <Modal.Title className='title-modal-cpalead'><strong>{selectedOffer.title}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-inside-body'>
          <div  style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={selectedOffer.creatives.url}
        alt={selectedOffer.title}
        className="img-fluid mb-3"
        style={{ maxHeight: '200px', borderRadius: '10px' }}
      />
       <div style={{ marginLeft: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
           <strong> Devices: </strong> 
            <span className='span-device' style={{ marginLeft: '10px'}}>Available on this device</span>
    
             </div>
              <div className='cuan-amount total-payout-notik'style={{ color: '#28a745', padding: '8px 12px', borderRadius: '8px' }}>
                <strong> +{(selectedOffer.amount * 100 * 0.7).toFixed(0)} $CUAN </strong>
              </div>
          </div> 
        </div>
            <p><strong>Description:</strong></p>
            <div dangerouslySetInnerHTML={{ __html: selectedOffer.description }} /><br/>
            <p><strong>Steps:</strong> {selectedOffer.conversion}</p>
            <p><strong>Device:</strong> {selectedOffer.device}</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center modal-inside-body">
            <Button
              variant="primary"
              className="w-100 d-flex align-items-center justify-content-center"
              onClick={() => window.open(selectedOffer.link, '_blank')}
            >
              <FaPlay className="me-2" />
              <strong>Earn {(selectedOffer.amount * 100 * 0.7).toFixed(0)} $CUAN</strong>
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default OffersPage;
