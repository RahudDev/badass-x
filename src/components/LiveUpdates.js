import React, { useState, useRef } from 'react';
import { FaCheckSquare, FaTag, FaInfinity, FaGift } from 'react-icons/fa';
import './LiveUpdates.css';

const renderOfferIcon = (nameOffer) => {
  switch (nameOffer) {
    case 'Survey':
      return <FaCheckSquare title="Survey" />;
    case 'Offers':
      return <FaTag title="Offers" />;
    case 'Referral':
      return <FaInfinity title="Referral" />;
    case 'Redeemed':
      return <FaGift title="Redeemed" />;
    default:
      return null;
  }
};

const LiveUpdates = ({ updates, loading }) => {
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const updatesGridRef = useRef(null); // Reference for the scrollable container
  const isDragging = useRef(false); // Track drag status
  const startX = useRef(0); // Track the starting point of the drag
  const scrollLeft = useRef(0); // Track the starting scroll position

  const handleUpdateClick = (update) => {
    setSelectedUpdate(update);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  // Handle mouse drag for desktop users
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - updatesGridRef.current.offsetLeft;
    scrollLeft.current = updatesGridRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - updatesGridRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Increase scrolling speed
    updatesGridRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Handle touch events for mobile users
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - updatesGridRef.current.offsetLeft;
    scrollLeft.current = updatesGridRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - updatesGridRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    updatesGridRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="live-updates-container">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-google" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : updates.length > 0 ? (
        <div
          className="updates-grid"
          ref={updatesGridRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart} // Touch event for mobile
          onTouchMove={handleTouchMove}   // Touch move event for mobile
          onTouchEnd={handleTouchEnd}     // End touch event for mobile
        >
          {updates.map((update, index) => (
            <div className="update-item bg-secondary" key={index} onClick={() => handleUpdateClick(update)}>
              <div className="update-left">
                <div className="icon-square">
                  {renderOfferIcon(update.nameOffer)}
                </div>
                <div className="text-container">
                  <span className="update-name">{update.name}</span>
                  <span className="update-description">{update.description}</span>
                </div>
              </div>
              <div className="points-square">
                {update.points.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : <div className="spinner-google" role="status">
          </div>}

      {isPopupVisible && selectedUpdate && (
        <div className="popup-overlay">
          <div className="popup-content bg-secondary">
            <h3>Transaction Details</h3>
            <p><strong>Name:</strong> {selectedUpdate.name}</p>
            <p><strong>Offer:</strong> {selectedUpdate.description}</p>
            <p><strong style={{ color: '#28a745' }}>$CUAN:</strong> {selectedUpdate.points.toLocaleString()}</p>
            <button onClick={handleClosePopup} className="close-popup-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveUpdates;
