import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import { FaStar } from 'react-icons/fa'; // Import the star icon
import { API_URL } from '../App';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(''); // State to store the time left for the countdown

  // Fetch leaderboard data from API
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${API_URL}/api/leaderboard`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Assign rewards based on rank
  const assignRewards = (rank) => {
    switch (rank) {
      case 1:
        return 'Gold Trophy';
      case 2:
        return 'Silver Trophy';
      case 3:
        return 'Bronze Trophy';
      default:
        return 'Gift Card';
    }
  };

  // Function to calculate time left until the end of the 24-hour period
  const calculateTimeLeft = () => {
    const now = new Date();
    const nextResetTime = new Date(now);
    nextResetTime.setUTCHours(24, 0, 0, 0); // Reset time to 24:00:00 UTC (end of the day)
    
    const difference = nextResetTime - now;
    
    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setTimeLeft('0h 0m 0s'); // Timer ends
    }
  };

  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, []);

  // Check if data is loading or an error occurred
 if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-google" role="status">
          <span className="visually-hidden">Loading Leaderboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Get top 3 users for the champion ladder section
  const topThree = users.slice(0, 3);

  return (
    <div className="leaderboard-container container mt-5">
      <h2 className="text-center mb-4">Leaderboard</h2>
      <div className="timer-container" style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <span>Time Left: {timeLeft}</span>
      </div>
      <br />

      {/* Champion Ladder Section */}
      <div className="champion-ladder d-flex justify-content-center align-items-end mb-5">
        {/* Silver Card (Left) */}
        <div key={topThree[1]._id} className="card ladder-2 text-center">
          <FaStar className="star-icon star-silver" />
          <div className="profile-oval mx-auto mb-2">
          <img src='https://od.lk/s/NjFfODYyNTQzNzRf/smile%20emoji.jpg' alt="Profile" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{topThree[1].name}</h5>
            <p className="card-text">$25 Prize</p>
            <span className="badge badge-silver">{assignRewards(topThree[1].rank)}</span>
          </div>
        </div>

        {/* Gold Card (Center) */}
        <div key={topThree[0]._id} className="card ladder-1 text-center mx-3">
          <FaStar className="star-icon star-gold" />
          <div className="profile-oval mx-auto mb-2">
            <img src='https://od.lk/s/NjFfODYyNTQzNzRf/smile%20emoji.jpg' alt="Profile" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{topThree[0].name}</h5>
            <p className="card-text">$50 Prize</p>
            <span className="badge badge-gold">{assignRewards(topThree[0].rank)}</span>
          </div>
        </div>

        {/* Bronze Card (Right) */}
        <div key={topThree[2]._id} className="card ladder-3 text-center">
          <FaStar className="star-icon star-bronze" />
          <div className="profile-oval mx-auto mb-2">
          <img src='https://od.lk/s/NjFfODYyNTQzNzRf/smile%20emoji.jpg' alt="Profile" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{topThree[2].name}</h5>
            <p className="card-text">$15 Prize</p>
            <span className="badge badge-bronze">{assignRewards(topThree[2].rank)}</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">User</th>
              <th scope="col">Points</th>
              <th scope="col">Rewards</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className={`rank-${index + 1}`}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.points.toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${getRewardBadge(index + 1)}`}>
                    {assignRewards(index + 1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to assign badge classes based on rank
const getRewardBadge = (rank) => {
  switch (rank) {
    case 1:
      return 'gold';
    case 2:
      return 'silver';
    case 3:
      return 'bronze';
    default:
      return 'info';
  }
};

export default Leaderboard;
