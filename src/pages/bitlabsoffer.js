import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons'; // For Apple icon
import { faGlobe, faChevronDown, faPlay } from '@fortawesome/free-solid-svg-icons'; // For Globe icon
import { faAndroid } from '@fortawesome/free-brands-svg-icons'; // For Android icon
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TOKENBITLABS, API_URL_BIT } from '../config';

import Cookies from 'js-cookie';
import { key, decryptData } from '../App';
import './bitlabsoffer.css';

const API_TOKEN = TOKENBITLABS;



const OffersPagebitlabs = ( ) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const USER_ID = localStorage.getItem('uuid');
  const clientIp_encrypted = Cookies.get('userip');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]);


  const [selectedOffer, setSelectedOffer] = useState(null); // To track selected offer for modal
  const clientIp = decryptData(clientIp_encrypted, key);

  useEffect(() => {
    

    const fetchOffers = async () => {
      try {
        // Build the params object dynamically
        const params = {
          in_app: 'false',
          client_user_agent: navigator.userAgent,
          client_ip: clientIp, // Client IP fetched above
        };
    
        // Only include the devices param if selectedDevices is not empty
        if (selectedDevices.length > 0) {
          params.devices = selectedDevices;
        }
    
        // Make the API request
        const response = await axios.get(API_URL_BIT, {
          headers: {
            'User-Agent': navigator.userAgent,
            'X-Api-Token': API_TOKEN,
            'X-User-Id': USER_ID,
            'accept': 'application/json',
          },
          params: params, // Use the dynamically built params object
        });
    
        // Set the fetched offers in the state
        setOffers(response.data.data.offers);
      } catch (err) {
        setError('Error fetching offers');
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch the offers when the component mounts or dependencies change
    fetchOffers();
    }, [USER_ID, clientIp, selectedDevices]);
    

  // Function to handle showing detailed modal
  const showOfferDetails = (offer) => {
    setSelectedOffer(offer);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedOffer(null);
  };
  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle device selection
  const toggleDevice = (device) => {
    setSelectedDevices((prevSelectedDevices) => {
      if (prevSelectedDevices.includes(device)) {
        // If the device is already selected, remove it from the array
        return prevSelectedDevices.filter((d) => d !== device);
      } else {
        // If the device is not selected, add it to the array
        return [...prevSelectedDevices, device];
      }
    });
  };

  if (loading) {
    return (
      <div className='loading-container-google align-items-center justify-content-center min-vh-100'>
      <div className="spinner-google"></div>
      <div className="loading-text-google">Fetching Games...</div>
    </div>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

const isMobile = /android|iphone|ipad|ipod|mobile|tablet/i.test(navigator.userAgent);
  return (
    <Container className="mt-5">
    <>
    {!isMobile && (
  <div style={{ position: 'relative', marginBottom : '20px' }}>
       {/* Dropdown button */}
       <button
        onClick={toggleDropdown}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: 'white',
          color: '#fff',
          cursor: 'pointer',
        }}
       >
        {/* Device icons */}
        <FontAwesomeIcon
          icon={faAndroid}
          style={{ fontSize: '20px', marginRight: '8px', color: selectedDevices.includes('android') ? '#3ddc84' : '#7f8c8d' }}
        />
        <FontAwesomeIcon
          icon={faApple}
          style={{ fontSize: '20px', marginRight: '8px', color: selectedDevices.includes('iphone') ? '#000' : '#7f8c8d' }}
        />
        <FontAwesomeIcon
          icon={faApple}
          style={{ fontSize: '20px', marginRight: '8px', color: selectedDevices.includes('ipad') ? '#007bff' : '#7f8c8d' }}
        />

         {/* Arrow icon to indicate dropdown */}
       <FontAwesomeIcon
         icon={faChevronDown} // You can replace this with another arrow icon if you'd prefer
          style={{ fontSize: '16px', marginLeft: 'auto', color: '#7f8c8d' }}
         />
      </button>

      {/* Dropdown list for selecting devices */}
      {dropdownOpen && (
     <div
    style={{
      position: 'absolute',
      top: '40px',
      left: '0',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '10px',
      zIndex: '1000',
    }}
  >
    {/* Android */}
    <div
      onClick={() => toggleDevice('android')}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px'}}
    >
      <FontAwesomeIcon icon={faAndroid} style={{ fontSize: '18px', color: '#3ddc84', marginRight: '8px' }} />
      Android
      {/* Square checkbox */}
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '1px solid #ccc',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selectedDevices.includes('android') && (
          <FontAwesomeIcon icon={faCheck} style={{ fontSize: '14px', color: '#28a745'}} />
        )}
      </div>
    </div>

    {/* iOS */}
    <div
      onClick={() => toggleDevice('iphone')}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px' }}
    >
      <FontAwesomeIcon icon={faApple} style={{ fontSize: '18px', color: '#000', marginRight: '8px' }} />
      iOS
      {/* Square checkbox */}
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '1px solid #ccc',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selectedDevices.includes('iphone') && (
          <FontAwesomeIcon icon={faCheck} style={{ fontSize: '14px', color: '#28a745' }} />
        )}
      </div>
    </div>

    {/* Web */}
    <div
      onClick={() => toggleDevice('ipad')}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px' }}
    >
      <FontAwesomeIcon icon={faApple} style={{ fontSize: '18px', color: '#007bff', marginRight: '8px' }} />
      Ipad
      {/* Square checkbox */}
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '1px solid #ccc',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selectedDevices.includes('ipad') && (
          <FontAwesomeIcon icon={faCheck} style={{ fontSize: '14px', color: '#28a745' }} />
        )}
      </div>
    </div>
</div>
   )}

    </div>
    )}
    </>
    <Row className="d-flex flex-wrap justify-content-start">
  {offers.map((offer) => (
    <Col key={offer.id} className="mb-3 d-flex justify-content-start mt-auto">
      <Card
        className="shadow-lg offer-card"
        style={{
          borderRadius: '15px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer', // Add pointer cursor for better UX
          border: '2px solid #ddd',
          position: 'relative', // Necessary for the positioning of the play button
          transition: 'border 0.3s ease-in-out',
          overflow: 'hidden', // Ensures that play button and blurred overlay stay inside card
        }}
        onClick={() => showOfferDetails(offer)} // Trigger the function when the card is clicked
      >
        <Card.Img
          variant="top"
          src={offer.icon_url || 'https://via.placeholder.com/300x200'}
          alt={offer.anchor}
          style={{objectFit: 'cover', margin: '0 auto' }}
        />
        <Card.Body style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <div style={{ flexGrow: 1 }}>
          <Card.Title className="text-center title-ellipsis">
              <strong>{offer.anchor}</strong>
            </Card.Title>
            <Card.Text className="text-center" style={{ color: '#28a745', marginBottom : '10px' }}>
              <strong>+{offer.total_points} $CUAN</strong>
            </Card.Text>
          </div>
        </Card.Body>
        <div className="play-overlay">
                      <button className="play-btn">
                      <FontAwesomeIcon icon={faPlay} size="2x" />
                     </button>
        </div>
      </Card>
    </Col>
  ))}
</Row>

      {/* Modal for showing detailed offer info */}
      {selectedOffer && (
  <Modal
    show={true}
    onHide={handleCloseModal}
    centered
    size="lg" // This makes the modal wider
    className='modal-bitlabs-offer'
  >
    <Modal.Header  closeButton>
      <Modal.Title className='header-modal'>
        <i className="bi bi-gift" style={{ marginRight: '10px' }}></i>
        <strong>{selectedOffer.anchor} </strong>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
  <div style={{ padding: '20px', borderRadius: '10px' }}>
    {/* Image, Device Icons, and Total Points */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={selectedOffer.icon_url}
        alt={selectedOffer.anchor}
        className="img-fluid mb-3"
        style={{ maxHeight: '200px', borderRadius: '10px' }}
      />

   <div style={{ marginLeft: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
    <strong> Devices: </strong>
    
    {selectedOffer.web_to_mobile_devices && selectedOffer.web_to_mobile_devices.length > 0 ? (
      selectedOffer.web_to_mobile_devices.map((device, index) => (
        <span key={index} style={{ marginLeft: '10px' }}>
          {/* Android Icon */}
          {device === 'android' && (
            <FontAwesomeIcon icon={faAndroid} style={{ fontSize: '24px', color: '#3ddc84', marginRight: '10px' }} />
          )}
          
          {/* iPad/iPhone Icon */}
          {(device === 'ipad' || device === 'iphone') && (
            <FontAwesomeIcon icon={faApple} style={{ fontSize: '24px', color: '#000', marginRight: '10px' }} />
          )}

          {/* Web Icon */}
          {device === 'web' && (
            <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '24px', color: '#007bff', marginRight: '10px' }} />
          )}
        </span>
      ))
    ) : (
      <span style={{ marginLeft: '10px' , fontSize:"0.6rem"}}>Available on this device</span>
    )}
    </div>

        {/* Total Points with Background */}
        <div className='cuan-amount'style={{ backgroundColor: '#e9ecef', color: '#28a745', padding: '8px 12px', borderRadius: '8px' }}>
          <strong> +{selectedOffer.total_points} $CUAN </strong>
        </div>
      </div>
    </div>

    {/* Offer Details */}
    <p>
      <strong>Description:</strong> {selectedOffer.description}
    </p>
    <p>
      <strong>Confirmation Time:</strong> {selectedOffer.confirmation_time}
    </p>

    {/* Tasks to Complete */}
    <h5 style={{ marginTop: '20px', color: '#28a745' }}>
      <i className="bi bi-check-circle-fill" style={{ marginRight: '10px' }}></i>
      Tasks to Complete:
    </h5>
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      {selectedOffer.events.map((event, index) => (
        <li
          key={index}
          style={{
            marginBottom: '10px',
            backgroundColor: '#e9ecef',
            padding: '10px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <i className="bi bi-check-circle" style={{ color: '#28a745', marginRight: '8px' }}></i>
            <strong>{event.name}:</strong> {event.description}
          </div>
          <div>
            <strong style={{ color: '#28a745'}}>+{event.points} $CUAN</strong>
          </div>
        </li>
      ))}
    </ul>

    {/* Requirements */}
    <h5 style={{ color: '#007bff', marginTop: '20px' }}>
      <i className="bi bi-device-laptop" style={{ marginRight: '10px' }}></i>
      Requirements
    </h5>
    <p>{selectedOffer.requirements}</p>

    {/* Disclaimer */}
    <div style={{ backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
      <small>
        <i className="bi bi-info-circle-fill" style={{ marginRight: '5px' }}></i>
        <strong>Disclaimer:</strong> {selectedOffer.disclaimer}
      </small>
    </div>
  </div>
</Modal.Body>

    <Modal.Footer style={{ justifyContent: 'center', padding: '20px' }}>
  <a
    href={selectedOffer.click_url}
    className="btn btn-success btn-block"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      width: '100%', // Full width
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      padding: '12px',
      textDecoration: 'none',
      backgroundColor: '#0b65c5'
    }}
  >
    <i className="bi bi-play-circle" style={{ marginRight: '10px', fontSize: '22px' }}></i>
    <strong> Earn {selectedOffer.total_points} $CUAN </strong>
  </a>
</Modal.Footer>

  </Modal>
)}

    </Container>
  );
};

export default OffersPagebitlabs;
