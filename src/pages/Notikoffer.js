import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import './Notikoffer.css';
import { APIKEY_NOTIK, PUBID_NOTIK, APPID_NOTIK, notik_api } from '../config';
import { decryptData, key } from "../App";
import fetchCountryFromIP from './Dashboard';

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  let device_name = "other";
  let device_type = "desktop";
  let device_os = "other";

  if (/iphone/.test(userAgent)) {
    device_name = "iphone";
    device_type = "mobile";
    device_os = "ios";
  } else if (/ipad/.test(userAgent)) {
    device_name = "ipad";
    device_type = "tablet";
    device_os = "ios";
  } else if (/android/.test(userAgent)) {
    device_name = "other";
    device_type = "mobile";
    device_os = "android";
  } else if (/windows/.test(userAgent)) {
    device_name = "other";
    device_type = "desktop";
    device_os = "windows";
  } else if (/macintosh|mac os x/.test(userAgent)) {
    device_name = "other";
    device_type = "desktop";
    device_os = "macosx";
  } else if (/linux/.test(userAgent)) {
    device_name = "other";
    device_type = "desktop";
    device_os = "linux";
  }

  return { device_name, device_type, device_os };
};

const Notikoffer = () => {
  const [loading, setLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [error, setError] = useState(null);
  const [offersnotik, setOffersNotik] = useState([]);
  const [countryCode, setCountryCode] = useState(null);

  // Determine valid `device_name`, `device_type`, and `device_os`

  const fetchOffers = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if we have cached offers and they are still valid (less than 1 minute old)
      const cachedData = localStorage.getItem('notikOffersCache');
      if (cachedData) {
        const { offers, timestamp } = JSON.parse(cachedData);
        const currentTime = new Date().getTime();
        // If cache is less than 1 minute old, use it
        if (currentTime - timestamp < 60000) {
          console.log("Using cached Notik offers", offers);
          setOffersNotik(offers);
          setLoading(false);
          return offers;
        }
        // Otherwise cache is expired, continue to fetch new data
      }
  
      // Get authentication information
      const user_id = localStorage.getItem("uuid");
      const userEmail = localStorage.getItem("email");
      const encryptedIp = Cookies.get("userip");
      
      if (!user_id || !encryptedIp) {
        throw new Error("Missing required authentication information (user_id or IP).");
      }
      
      // Decrypt IP address
      const ip = decryptData(encryptedIp, key);
      if (!ip) {
        throw new Error("Failed to decrypt IP address.");
      }
      
      // Get device information
      const { device_name, device_type, device_os } = getDeviceInfo();
      
      // Get country code from IP
      const country_code = await fetchCountryFromIP(ip);
      setCountryCode(country_code);
      if (!country_code) {
        throw new Error(`Unable to determine country code ${countryCode} from IP address ${ip}`);
      }
      
      // Build the Notik API request URL
      const apiUrl = `${notik_api}`;
      const response = await axios.get(apiUrl, {
        params: {
          api_key: APIKEY_NOTIK,
          pub_id: PUBID_NOTIK,
          app_id: APPID_NOTIK,
          user_id,
          s1: userEmail || "unknown",
          device_name,
          device_type,
          device_os,
          country_code,
          user_agent: navigator.userAgent,
          ip,
        },
      });
      
      console.log("Raw Notik API response:", response.data);
      
      // Extract offers from response
      let fetchedOffers = [];
      if (response.data?.data && Array.isArray(response.data.data)) {
        fetchedOffers = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        fetchedOffers = response.data;
      } else {
        console.warn("API response doesn't contain an array at expected paths", response.data);
      }
      
      console.log("Processed offers:", fetchedOffers);
      
      // Save to localStorage with timestamp
      const cacheData = {
        offers: fetchedOffers,
        timestamp: new Date().getTime()
      };
      localStorage.setItem('notikOffersCache', JSON.stringify(cacheData));
      
      setOffersNotik(fetchedOffers);
      return fetchedOffers;
      
    } catch (err) {
      console.error("Error fetching offers from Notik:", err);
      setError(err.message || "An error occurred while fetching offers.");
      
      // Try to use cached data even if expired in case of error
      const cachedData = localStorage.getItem('notikOffersCache');
      if (cachedData) {
        const { offers } = JSON.parse(cachedData);
        console.log("Using expired cached offers due to fetch error", offers);
        setOffersNotik(offers);
        return offers;
      } else {
        setOffersNotik([]);
        return [];
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleCardClick = (offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
  };

  if (loading) {
    return (
      <div className="loading-container-google align-items-center justify-content-center min-vh-100">
        <div className="spinner-google"></div>
        <div className="loading-text-google">Fetching Notik Offers...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
   <Container className="py-5">
  <Row className="d-flex flex-wrap justify-content-start">
    {offersnotik.map((offer, index) => (
      <Col key={index} className="mb-3 d-flex justify-content-start mt-auto">
        <Card
          className="shadow-lg offer-card"
          style={{
            borderRadius: "10px",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
            border: "2px solid #ddd",
            position: "relative",
            transition: "border 0.3s ease-in-out",
            overflow: "hidden",
          }}
          onClick={() => handleCardClick(offer)} // Pass offer object
        >
          <Card.Img
            variant="top"
            src={offer.image_url || "https://via.placeholder.com/300"}
            alt={offer.name}
            style={{
              height: "150px", // Fixed height for all images
              width: "100%", // Make the image cover full width of the card
              objectFit: "cover", // Ensures the image is scaled and cropped properly
              borderTopLeftRadius: "8px", // Match card border radius
              borderTopRightRadius: "8px",
            }}
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
    <Modal.Header className='modal-header-notik' closeButton>
      <Modal.Title>
        <i className="bi bi-gift" style={{ marginRight: '10px' }}></i>
        <strong>{selectedOffer.name}</strong>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='modal-body-notik'>
      <div className='modal-inside-body' style={{  padding: '20px', borderRadius: '10px' }}>
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
              <div className="total-payout-notik" style={{ color: '#28a745', padding: '8px 12px', borderRadius: '8px', fontSize: '18px' }}>
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
                  className="list-offer-notik"
                  style={{
                    marginBottom: '10px',
            
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

    <Modal.Footer className='modal-footer-notik' style={{ justifyContent: 'center', padding: '20px' }}>
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
};

export default Notikoffer;
