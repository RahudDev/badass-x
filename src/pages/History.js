import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './history.css'; // Custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import { Spinner } from 'react-bootstrap'; // Import Spinner from Bootstrap
import { API_URL } from '../App';
import { FaChevronLeft, FaChevronRight, FaCheckSquare, FaTag, FaInfinity, FaGift } from 'react-icons/fa'; // Import icons
import Cookies from 'js-cookie';


const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 10; // Number of transactions to show per page
  const userId = Cookies.get('uuid');

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(`${API_URL}/api/user-history`, {headers: {'x-hub-id': `Bearer ${userId}`,  },});
        setTransactions(response.data);
        setFilteredTransactions(response.data); // Initially set to all transactions
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
      setLoading(false); // Set loading to false after fetching completes
    };

    fetchHistory();
  }, [userId]);

  // Filter based on the selected button
  useEffect(() => {
    if (filter === 'All') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(transaction => transaction.nameOffer === filter));
    }
  }, [filter, transactions]);

  // Helper function to render the icon based on the nameOffer
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

  const formatPoints = (points, nameOffer) => {
    // Ensure points are treated as a number
    const pointValue = typeof points === 'string' ? parseFloat(points.replace(/[^0-9.-]+/g, '')) : points;
  
    if (pointValue < 0) {
      // Handle negative points and ensure only one negative sign is shown
      return (
        <span className="text-danger">
          {pointValue.toLocaleString()} {/* Red for negative points */}
        </span>
      );
    } else {
      // Positive points with green color
      return (
        <span className="text-success">
          + {pointValue.toLocaleString()} {/* Green for positive points */}
        </span>
      );
    }
  };
  

  const handleNextPage = () => {
    if ((currentPage + 1) * transactionsPerPage < filteredTransactions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reverse the filtered transactions for display
  const displayedTransactions = filteredTransactions
    .slice()
    .reverse()
    .slice(
      currentPage * transactionsPerPage,
      (currentPage + 1) * transactionsPerPage
    );

  return (
    <div className="container history-container mt-5">
      <h2 className="text-center mb-4">Transaction History</h2>

      {/* Filter Buttons */}
      <div className="text-center mb-4">
        <button className={`btn btn-outline-primary mx-2 ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
        <button className={`btn btn-outline-primary mx-2 ${filter === 'Survey' ? 'active' : ''}`} onClick={() => setFilter('Survey')}>Survey</button>
        <button className={`btn btn-outline-primary mx-2 ${filter === 'Offers' ? 'active' : ''}`} onClick={() => setFilter('Offers')}>Offers</button>
        <button className={`btn btn-outline-primary mx-2 ${filter === 'Referral' ? 'active' : ''}`} onClick={() => setFilter('Referral')}>Referral</button>
        <button className={`btn btn-outline-primary mx-2 ${filter === 'Redeemed' ? 'active' : ''}`} onClick={() => setFilter('Redeemed')}>Redeemed</button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        /* Transaction Table */
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark" style={{ textAlign: 'center' }}>
              <tr>
                <th scope="col">Offer</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody className='history-body'>
            {displayedTransactions.length > 0 ? (
            displayedTransactions.map((transaction, index) => (
             <tr key={index}> {/* Add height to create vertical spacing */}
            <td style={{textAlign: "center"}}>{renderOfferIcon(transaction.nameOffer)}</td>
              <td>{transaction.description}</td>
            <td>{formatPoints(transaction.points, transaction.nameOffer)}</td>
            <td>{transaction.transactionID}</td>
             <td >{new Date(transaction.date).toLocaleString()}</td>
            </tr>
            ))
            ) : (
             <tr>
             <td colSpan="5" className="text-center">No transactions found.</td>
               </tr>
           )}
         </tbody>

          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-secondary" onClick={handlePreviousPage} disabled={currentPage === 0}>
              <FaChevronLeft /> Previous
            </button>
            <button className="btn btn-outline-secondary" onClick={handleNextPage} disabled={(currentPage + 1) * transactionsPerPage >= filteredTransactions.length}>
              Next <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
