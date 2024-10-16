import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './DeleteAccount.css'; // Include this for styling
import { API_URL } from '../App';

const DeleteAccount = () => {
  const [emailInput, setEmailInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [step, setStep] = useState(0); // State to track the confirmation step
  const [showSpinner, setShowSpinner] = useState(false); // State to handle the spinner after deletion
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation message
  const userEmail = localStorage.getItem('email');

  const handleDelete = async () => {
    if (emailInput !== userEmail) {
      setErrorMessage('Email does not match.');
      return;
    }

    if (!userEmail) {
      setErrorMessage('No user email found in local storage.');
      return;
    }

    setIsDeleting(true); // Show loading state

    try {
      const uuid = Cookies.get('uuid');
      const token = `Bearer ${uuid}`; // UUID as a Bearer token in the header
      const response = await axios.delete(`${API_URL}/api/delete-account`, {
        headers: {
          'x-hub-id': token,
        },
      });

      if (response.data.message === 'User account deleted and all associated data removed successfully') {
        // Show confirmation message
        setShowConfirmation(true);
        setTimeout(() => {
          // Perform logout actions
          localStorage.clear();
          Cookies.remove('userip');
          Cookies.remove('uuid');
          // Redirect or reload the page
          window.location.reload();
        }, 2000); // Wait for 2 seconds before reloading
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const openConfirmation = () => {
    setStep(1); // Move to the first confirmation step
  };

  const confirmStepOne = () => {
    setStep(2); // Move to the second confirmation step
  };

  const confirmStepTwo = () => {
    // Validate email input before proceeding
    if (emailInput !== userEmail) {
      setErrorMessage('Email does not match. Please try again.');
      return;
    }
    // Move to the final confirmation step
    setStep(3);
  };

  const confirmDeletion = () => {
    handleDelete(); // Proceed to delete the account
  };

  const closePopup = () => {
    setStep(0); // Reset to initial state
    setErrorMessage('');
    setEmailInput(''); // Clear email input when closing the popup
  };

  const renderConfirmation = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>Delete Account</h2>
            <p>Do you really want to delete your account? This action cannot be reversed.</p>
            <button className="confirm-button" onClick={openConfirmation}>Delete Account</button>
            <button className="cancel-button" onClick={closePopup}>Cancel</button>
          </div>
        );
      case 1:
        return (
          <div>
            <h2>Confirmation</h2>
            <p>Please confirm that you want to delete your account by clicking "Continue".</p>
            <button className="confirm-button" onClick={confirmStepOne}>Continue</button>
            <button className="cancel-button" onClick={closePopup}>Cancel</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Final Confirmation</h2>
            <p>Type your email to confirm this action: <strong>"{userEmail}"</strong></p>
            <input
              type="email"
              value={emailInput}
              placeholder="Type your email"
              onChange={(e) => setEmailInput(e.target.value)}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button className="confirm-button" onClick={confirmStepTwo}>Confirm</button>
            <button className="cancel-button" onClick={closePopup}>Cancel</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <button className="confirm-button" onClick={confirmDeletion}>Yes, Delete My Account</button>
            <button className="cancel-button" onClick={closePopup}>Cancel</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Delete Button */}
      <button className="delete-button" onClick={openConfirmation}>
        Delete Account
      </button>

      {/* Confirmation Popup */}
      {step > 0 && (
        <div className="popup-overlay">
          <div className="popup-container">
            {renderConfirmation()}
          </div>
        </div>
      )}

      {/* Spinner displayed after deletion */}
      {showSpinner && (
        <div className="spinner-overlay">
          <div className="spinner-delete"></div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-message">
            <p>User account deleted and all associated data removed successfully.</p>
            <p>Thank you again for using our services. Cheers!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
