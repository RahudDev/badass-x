// PlaceholderCard.js
import React from 'react';
import './PlaceholderCard.css'; // Import CSS for the placeholder card

const PlaceholderCard = () => (
    <div className="col-md-2 col-4 mb-3">
        <div className="placeholder-card">
            <div className="placeholder-image"></div>
            <div className="placeholder-body">
                <div className="placeholder-title"></div>
                <div className="placeholder-rating"></div>
                <div className="placeholder-points"></div>
            </div>
        </div>
    </div>
);

export default PlaceholderCard;
