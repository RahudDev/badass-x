import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Card } from "react-bootstrap";
import { faApple } from '@fortawesome/free-brands-svg-icons'; // For Apple icon
import { faGlobe, faPlay } from '@fortawesome/free-solid-svg-icons'; // For Globe icon
import { faAndroid } from '@fortawesome/free-brands-svg-icons'; // For Android icon
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { HandlePageClick } from '../App';
import './Dashboard.css';
import './Notikoffer.css';




const OfferBitlabs = ({ offer }) => {

    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleCardClick = () => {
        setSelectedOffer(offer); // Set the selected offer to open modal
    };

    const handleCloseModal = () => {
        setSelectedOffer(null); // Close modal by resetting selected offer
    };

    return (
        <>
            <div className="col-md-2 col-4 mb-3">
                <div
                    className="card-offers h-100 shadow-sm"
                    style={{
                     width: '100%',
                     cursor: 'pointer',
                      borderRadius: '15px',
                      border: '2px solid #ddd',
                       position: 'relative', // Necessary for the positioning of the play button
                       transition: 'border 0.3s ease-in-out',
                        overflow: 'hidden', // Ensures that play button and blurred overlay stay inside card
                         } }
                    onClick={handleCardClick} // Handle click event to open modal
                >
                    <img
                        src={offer.image || 'https://via.placeholder.com/150'}
                        alt={offer.title}
                        className="card-img-top"
                        style={{ objectFit: 'cover', transition: 'transform 0.3s ease'  }}
                    />
                    <div className="card-body text-center p-2">
                        <h6 className="card-title small card-text-black title-ellipsis">{offer.title}</h6>
                        <p className="card-text-i card-text-black"> <strong>+{Math.round(offer.points)} $CUAN </strong></p>
                    </div>

                    <div className="play-overlay">
                      <button className="play-btn">
                      <FontAwesomeIcon icon={faPlay} size="2x" />
                     </button>
                   </div>
                </div>
            </div>

            {/* Modal for showing offer details */}
            {selectedOffer && (
              <>  
                <div className="blur-background"></div>
                <Modal
                    show={true}
                    onHide={handleCloseModal}
                    centered
                    size="lg" // Makes the modal wider
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <i className="bi bi-gift" style={{ marginRight: '10px' }}></i>
                            <strong>{selectedOffer.title}</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={selectedOffer.image}
                                    alt={selectedOffer.title}
                                    className="img-fluid mb-3"
                                    style={{ maxHeight: '200px', borderRadius: '10px' }}
                                />
                                <div style={{ marginLeft: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                 <strong>Devices: </strong>
                                  {selectedOffer.web_to_mobile_devices?.length > 0 ? (
                                      selectedOffer.web_to_mobile_devices.map((device, index) => (
                                  <span key={index} style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                            {device === 'android' && (
                             <FontAwesomeIcon
                                 icon={faAndroid}
                                style={{ fontSize: '24px', color: '#3ddc84', marginRight: '10px' }}
                                    />
                                      )}
                           {(device === 'ipad' || device === 'iphone') && (
                                    <FontAwesomeIcon
                                icon={faApple}
                                style={{ fontSize: '24px', color: '#000', marginRight: '10px' }}
                                             />
                                       )}
                                            {device === 'web' && (
                                           <FontAwesomeIcon
                                                  icon={faGlobe}
                                                style={{ fontSize: '24px', color: '#007bff', marginRight: '10px' }}
                                                   />
                                                      )}
                                        <span style={{ fontSize: '14px' }}>{device}</span> {/* Display device name next to icon */}
                                                   </span>
                                                                    ))
                                                               ) : (
                                                           <span style={{ marginLeft: '10px', fontStyle: 'italic', color: '#666' }}>
                                                           Available on this device
                                                          </span>
                                                                      )}
                                                                    </div>

                                    <div style={{ backgroundColor: '#e9ecef', color: '#28a745', padding: '8px 12px', borderRadius: '8px', fontSize: '18px' }}>
                                        <strong> +{selectedOffer.points} $CUAN </strong>
                                    </div>
                                </div>
                            </div>
                            <p>
                                <strong>Description:</strong> {selectedOffer.description}
                            </p>
                            <p>
                                <strong>Confirmation Time:</strong> {selectedOffer.confirmation_time}
                            </p>
                            <h5 style={{ marginTop: '20px', color: '#28a745' }}>
                                <i className="bi bi-check-circle-fill" style={{ marginRight: '10px' }}></i>
                                Tasks to Complete:
                            </h5>
                            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                {selectedOffer.events.map((event, index) => (
                                    <li key={index} style={{ marginBottom: '10px', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                            <h5 style={{ color: '#007bff', marginTop: '20px' }}>
                                <i className="bi bi-device-laptop" style={{ marginRight: '10px' }}></i>
                                Requirements
                            </h5>
                            <p>{selectedOffer.requirements}</p>
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
                            <strong> Earn {selectedOffer.points} $CUAN </strong>
                        </a>
                    </Modal.Footer>
                </Modal>
             </>   
            )}
            
        </>
    );
}


const OfferNotik = ({ offer }) => {

   
      const [selectedOffer, setSelectedOffer] = useState(null);

      if (!offer || !Array.isArray(offer) || offer.length === 0) {
        console.log("Offers prop is not a valid array:", offer);
        return <div className="my-3">No offers available at this time</div>;
      }


    const handleCardClick = (offer) => {
        setSelectedOffer(offer);
      };
    
      const handleCloseModal = () => {
        setSelectedOffer(null);
      };
    
    
      return (
       <Container className="col-md-2 col-4 mb-3">
      <Row className="">
        {offer.map((offer, index) => (
          <Col key={index} className="">
            <Card
              className="notik-offer h-100 shadow-sm"
              style={{
                     cursor: 'pointer',
                      borderRadius: '15px',
                      border: '2px solid #ddd',
                       position: 'relative', // Necessary for the positioning of the play button
                       transition: 'border 0.3s ease-in-out',
                        overflow: 'hidden', // Ensures that play button and blurred overlay stay inside card
                         } }

              onClick={() => handleCardClick(offer)} // Pass offer object
            >
              <Card.Img
                src={offer.image_url || "https://via.placeholder.com/150"}
                alt={offer.name}
                className="card-img-top-notik"
                style={{ objectFit: 'cover', transition: 'transform 0.3s ease'}}
              />
              <Card.Body>
                <Card.Title className="text-center title-ellipsis">
                  <strong>{offer.name}</strong>
                </Card.Title>
                <Card.Text className="text-center" style={{ color: "#28a745", marginBottom: "10px" }}>
                  <strong>+{offer.payout} $CUAN</strong>
                </Card.Text>
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
    
      {selectedOffer && (
      <Modal
        show={true}
        onHide={handleCloseModal}
        centered
        size="lg" // Makes the modal wider
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-gift" style={{ marginRight: '10px' }}></i>
            <strong>{selectedOffer.name}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
            {/* Image Section */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={selectedOffer.image_url}
                alt={selectedOffer.name}
                className="img-fluid"
                style={{ maxHeight: '200px', borderRadius: '10px', marginRight: '15px' }}
              />
              <div>
                <strong>Categories:</strong> {selectedOffer.categories.join(", ")}
                  {/* Payout */}
                  <div style={{ backgroundColor: '#e9ecef', color: '#28a745', padding: '8px 12px', borderRadius: '8px', fontSize: '18px' }}>
                  <strong> +{selectedOffer.payout} $CUAN </strong>
                   </div>
              </div>
            </div>
    
            {/* Description */}
            <p>
              <strong>Description:</strong>{" "}
              {[
                selectedOffer.description1,
                selectedOffer.description2,
                selectedOffer.description3,
              ]
                .filter((desc) => desc.trim() !== "")
                .join(" ")}
            </p>
    
    
            {/* Events Section */}
            {selectedOffer.events && selectedOffer.events.length > 0 && (
              <>
                <h5 style={{ color: '#28a745', marginTop: '20px' }}>
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
                        <strong>{event.name}</strong>
                      </div>
                      <div>
                        <strong style={{ color: '#28a745' }}>+{event.payout} $CUAN</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
    
           
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
              backgroundColor: '#0b65c5',
            }}
          >
            <i className="bi bi-play-circle" style={{ marginRight: '10px', fontSize: '22px' }}></i>
            <strong> Earn {selectedOffer.payout} $CUAN </strong>
          </a>
        </Modal.Footer>
        </Modal>
       )}
    
       </Container>
      );
}


export const OfferRow = ({ title, offers }) => {
    const navigate = useNavigate();
    const contactSectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [hasOverflow, setHasOverflow] = useState(false);
    useEffect(() => {
        const checkOverflow = () => {
            if (scrollContainerRef.current) {
                const { scrollWidth, clientWidth } = scrollContainerRef.current;
                setHasOverflow(scrollWidth > clientWidth); // Set true if content overflows horizontally
            }
        };
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, []);
    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };
    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="mb-4">
            <h6><strong>{title}</strong></h6>
            {offers.length > 0 ? (
                <div className="position-relative">
                    {hasOverflow && (
                        <button
                            className="scroll-btn left"
                            onClick={scrollLeft}
                        >
                            &#8249; 
                        </button>
                    )}
                    <div
                        className="row flex-nowrap overflow-hidden scroll-container"
                        ref={scrollContainerRef}
                    >
                        {offers.map((offer) => (
                            /*<OfferBitlabs key={offer.id} offer={offer} />*/
                            <OfferNotik key={offer.id} offer={[offer]} />

                        ))}
                    </div>
                    {hasOverflow && (
                        <button
                            className="scroll-btn right"
                            onClick={scrollRight}
                        >
                            &#8250; {/* Right arrow symbol */}
                        </button>
                    )}
                    <div className="text-center mt-3 button-games">
                    <button 
                        className="btn btn-outline-primary" 
                        onClick={(e) => HandlePageClick(e, '/notik-offers', contactSectionRef, navigate)}
                    >
                        View all Games <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                </div>
                </div>
            ) : (
                <div className="text-muted d-flex justify-content-center align-items-center" style={{ height: '150px', width: '100%' }}>
                    Sorry, you have no offer matches right now. Please check again later.
                </div>
            )}
        </div>
    );
};