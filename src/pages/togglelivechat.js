import React, { useState, useEffect } from 'react';
import './togglelivechat.css'; // Add custom CSS for the switch button

const CrispWidgetToggle = () => {
  // Retrieve the initial state from localStorage or default to true
  const [isWidgetVisible, setIsWidgetVisible] = useState(() => {
    const storedState = localStorage.getItem('crispWidgetVisibility');
    return storedState ? JSON.parse(storedState) : false;
  });

  // Function to toggle the visibility and save to localStorage
  const toggleWidgetVisibility = () => {
    const newVisibility = !isWidgetVisible;
    setIsWidgetVisible(newVisibility);
    localStorage.setItem('crispWidgetVisibility', JSON.stringify(newVisibility));
  };

  // UseEffect to update the widget's display style
  useEffect(() => {
    // Check for the Crisp widget element
    const interval = setInterval(() => {
      const crispElement = document.querySelector('.crisp-client');
      if (crispElement) {
        // Set the display based on the visibility state
        crispElement.style.display = isWidgetVisible ? 'block' : 'none';
        clearInterval(interval); // Stop checking once the element is found
      }
    }, 100); // Check every 100ms until the element is found

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [isWidgetVisible]);

  return (
    <div style={{ position: 'relative' }}>
      <div className="toggle-switch" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="checkbox"
          id="toggle-widget"
          className="toggle-switch-checkbox"
          checked={isWidgetVisible}
          onChange={toggleWidgetVisibility}
        />
        <label className="toggle-switch-label" htmlFor="toggle-widget">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    </div>
  );
};

export default CrispWidgetToggle;
