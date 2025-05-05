import React, { useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { HandlePageClick } from '../App'; // Import HandlePageClick from your App.js

const Pointshintnotik = ({ showModal, handleClose }) => {
  const navigate = useNavigate();
  const contactSectionRef = useRef(null);

  const handleProceed = (e) => {
    // Call HandlePageClick for navigation and scrolling
    HandlePageClick(e, '/notik-frame', contactSectionRef, navigate);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><strong>Boost Your Earnings with Notik!</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Get rewarded instantly!</strong> Earn <strong style={{ color: '#28a745' }}>$CUAN</strong> for every task you complete.
        </p>
        <p>
          No complicated conversions—just real earnings! Start completing offers now and watch your <strong style={{ color: '#28a745' }}>$CUAN</strong> balance grow.
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          variant="primary"
          className="w-100 d-flex align-items-center justify-content-center"
          onClick={handleProceed} // Use the handleProceed function to close modal and navigate
        >
          <FaPlay className="me-2" />
          <strong>Proceed to Featured Offers</strong>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Pointshintnotik;
