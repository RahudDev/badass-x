import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import { FaStar, FaQuestion } from 'react-icons/fa'; // Import the question icon
import smile_emoji from "./assets/smile_emoji.jpg";

import { API_URL } from '../App';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(''); // State to store the time left for the countdown

  // Function to determine the badge class based on rank
  const getRewardBadge = (rank) => {
    switch (rank) {
      case 1:
        return 'gold';
      case 2:
        return 'silver';
      case 3:
        return 'bronze';
      default:
        return 'gift';
    }
  };

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
      <div className='loading-container-google align-items-center justify-content-center min-vh-100'>
      <div className="spinner-google"></div>
      <div className="loading-text-google">The winner is...</div>
    </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle the case when no users are found
  if (users.length === 0) {
    return (
      <div className="leaderboard-container container mt-5">
        <h2 className="text-center mb-4">Leaderboard</h2>
        {/* Ladder style for empty leaderboard */}
        <div className="champion-ladder d-flex justify-content-center align-items-end mb-5">
          <div className="card ladder-2 text-center">
            <FaQuestion className="star-icon question-icon" />
            <div className="profile-oval mx-auto mb-2">
              <img src={smile_emoji} alt="Placeholder" />
            </div>
            <div className="card-body">
              <h5 className="card-title">?</h5>
              <p className="card-text">Unknown</p>
            </div>
          </div>
          <div className="card ladder-1 text-center mx-3">
            <FaQuestion className="star-icon question-icon" />
            <div className="profile-oval mx-auto mb-2">
              <img src={smile_emoji} alt="Placeholder" />
            </div>
            <div className="card-body">
              <h5 className="card-title">?</h5>
              <p className="card-text">Unknown</p>
            </div>
          </div>
          <div className="card ladder-3 text-center">
            <FaQuestion className="star-icon question-icon" />
            <div className="profile-oval mx-auto mb-2">
              <img src={smile_emoji} alt="Placeholder" />
            </div>
            <div className="card-body">
              <h5 className="card-title">?</h5>
              <p className="card-text">Unknown</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get top 3 users for the champion ladder section, handle insufficient users gracefully
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
        {topThree[1] && (
          <div key={topThree[1]._id} className="card ladder-2 text-center">
            <FaStar className="star-icon star-silver" />
            <div className="profile-oval mx-auto mb-2">
              <img src='https://od.lk/s/NjFfODYyNTQzNzRf/smile%20emoji.jpg' alt="Profile" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{topThree[1].name}</h5>
              <p className="card-text">$3.5 Prize</p>
              <span className="badge badge-silver">{assignRewards(2)}</span>
            </div>
          </div>
        )}

        {topThree[0] && (
          <div key={topThree[0]._id} className="card ladder-1 text-center mx-3">
            <FaStar className="star-icon star-gold" />
            <div className="profile-oval mx-auto mb-2">
              <img src='https://od.lk/s/NjFfODYyNTQzNzRf/smile%20emoji.jpg' alt="Profile" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{topThree[0].name}</h5>
              <p className="card-text">$5 Prize</p>
              <span className="badge badge-gold">{assignRewards(1)}</span>
            </div>
          </div>
        )}

        {topThree[2] && (
          <div key={topThree[2]._id} className="card ladder-3 text-center">
            <FaStar className="star-icon star-bronze" />
            <div className="profile-oval mx-auto mb-2">
              <img src='https://od.lk/s/NjFfODYyNTQzNzRf/smile%20emoji.jpg' alt="Profile" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{topThree[2].name}</h5>
              <p className="card-text">$1.5 Prize</p>
              <span className="badge badge-bronze">{assignRewards(3)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Earnings excluded (Leaderboard)</th>
            <th scope="col">Reward</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.points}</td>
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
  );
};

export default Leaderboard;
