/*import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../App';

const PointsTracker = () => {
  const [displayPoints, setDisplayPoints] = useState(0); // For displaying in the UI
  const pointsBuffer = useRef([]); // Buffer to hold points within the interval
  const uuid = localStorage.getItem('uuid');

  useEffect(() => {
    if (!uuid) {
      console.error('UUID is missing. Please ensure the UUID is saved in localStorage.');
      return;
    }

    // Function to save points to the server
    const savePointsToServer = async () => {
      const pointsToSave = [...pointsBuffer.current]; // Copy buffer to avoid mutation issues
      if (pointsToSave.length === 0) return; // Skip if no points to save

      try {
        const response = await fetch(`${API_URL}/api/save-history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uuid, points: pointsToSave }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Points saved:', data.message);
          pointsBuffer.current = []; // Clear the buffer after successful save
        } else {
          console.error('Failed to save points:', data.message);
        }
      } catch (error) {
        console.error('Error saving points:', error.message);
      }
    };

    // Set a timer to save points to the server every 20 seconds
    const interval = setInterval(savePointsToServer, 20000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [uuid]);

  // Function to add new points
  const addPoints = (newPoints) => {
    pointsBuffer.current = [...pointsBuffer.current, ...newPoints]; // Add new points to the buffer
    setDisplayPoints((prev) => prev + newPoints.reduce((sum, p) => sum + p, 0)); // Update the UI
  };

  return (
    <div>
      <h1>Points Tracker</h1>
      <p>Current Points: {displayPoints}</p>
      <button onClick={() => addPoints([10, 20])}>Add Points</button>
    </div>
  );
};

export default PointsTracker; */
