import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import './ReferralStats.css'; // Import your custom CSS for styling
import Cookies from 'js-cookie';

const ReferralStats = () => {
  const [referralData, setReferralData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalLifetimeCommission: 0, // Update for lifetime total commission
    totalCommissionLast30Days: 0, // Update for total commission last 30 days
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const userId = Cookies.get('uuid');

  // Calculate total number of pages
  const totalPages = Math.ceil(referralData.length / rowsPerPage);

  // Function to handle going to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Function to handle going to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // Get the referral data to display for the current page
  const paginatedData = referralData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }

        // Fetch referral data from the API
        const response = await axios.get(`${API_URL}/api/referral-data`, {
          headers: { 'x-hub-id': `Bearer ${userId}` },
        });
        const data = response.data;

        // Reverse the data to show latest users first
        const reversedData = data.referralData.reverse();

        // Set referral data to state
        setReferralData(reversedData);

        // Calculate summary
        const totalUsers = reversedData.length;
        const totalLifetimeCommission = reversedData.reduce((acc, referral) => acc + referral.totalLifetimeCommission, 0);
        const totalCommissionLast30Days = reversedData.reduce((acc, referral) => acc + referral.totalCommissionLast30Days, 0);

        // Update summary state
        setSummary({
          totalUsers,
          totalLifetimeCommission,
          totalCommissionLast30Days,
        });
      } catch (error) {
        console.error("There was an error fetching the referral data!", error);
        setReferralData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-google" role="status">
          <span className="visually-hidden">Loading referral data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container referral-stats-container">
      {/* Summary Dashboard */}
      <h1>Referral Stats</h1>
      <div className="summary-dashboard">
        <div className="summary-item">
          <h4>Total Users</h4>
          <p>{summary.totalUsers}</p>
        </div>
        <div className="summary-item">
          <h4>Total Lifetime Commission</h4>
          <p>{summary.totalLifetimeCommission.toLocaleString()}</p>
        </div>
        <div className="summary-item">
          <h4>Total Commission (Last 30 Days)</h4>
          <p>{summary.totalCommissionLast30Days.toLocaleString()}</p>
        </div>
      </div>

      {/* Referral Table */}
      <table className="referral-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Total Lifetime Commission</th>
            <th>Total Commission (Last 30 Days)</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((referral, index) => (
              <tr key={index}>
                <td>{referral.nameUser}</td>
                <td>{referral.status}</td>
                <td style={{ color: '#28a745' }}><strong> {referral.totalLifetimeCommission.toLocaleString()}</strong></td>
                <td>{referral.totalCommissionLast30Days.toLocaleString()}</td>
                <td>{referral.dateReferralDateJoin}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-referrals-message">
                No referrals yet. Please invite your friends <Link to="/referral-link">here</Link>!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      {referralData.length > rowsPerPage && (
        <div className="pagination-controls">
          <button
            className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReferralStats;
