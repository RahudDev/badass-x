import React, { useState, useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { faClock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Browser } from '@capacitor/browser';
import './Dashboard.css';
import './surveycard.css';


const StarRating = ({ rating, ratingCount }) => (
    <div className="star-rating d-flex align-items-center">
        {[...Array(5)].map((_, index) => (
            <span key={index} className={index + 1 <= rating ? 'text-warning' : 'text-muted'}>★</span>
        ))}
        <span className="ms-2">({ratingCount})</span>
    </div>
);

const SurveyCard = ({ survey }) => {
    const handleCardClick = async () => {
           if (Capacitor.getPlatform() === 'android') {
               // Open using the Capacitor Browser plugin for Android
               await Browser.open({ url: survey.clickUrl });
           } else {
               // Use the default window.open for web/desktop
               window.open(survey.clickUrl, '_blank', 'noopener,noreferrer');
           }
       };

    return (
        <div className="col-md-2 col-4 mb-3">
        <div
            className="card-surveys h-100 shadow-sm"
            style={{
                width: '100%',
                cursor: 'pointer',
                borderRadius: '15px',
                border: '2px solid #ddd',
                position: 'relative', // Necessary for the positioning of the play button
                transition: 'border 0.3s ease-in-out',
                overflow: 'hidden', // Ensures that play button and blurred overlay stay inside card
            }}
            onClick={handleCardClick} // Handle click event
        >
            <img
                src={survey.image || 'https://via.placeholder.com/150'}
                alt={survey.title}
                className="card-img-top"
                style={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease', // Smooth zoom effect
                }}
            />
            
            <div className="card-body text-center p-2">
                <h6 className="card-title small card-text-black">{survey.title}</h6>
                <StarRating rating={survey.rating} ratingCount={survey.ratingCount} className="card-text-black  title-ellipsis" />
                <p className="card-text-black">
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    {survey.loi} min
                </p>
                <p className="card-text-i card-text-black">
                    <strong style={{ color: '#28a745' }}>+{Math.round(survey.points)} $CUAN </strong>
                </p>
            </div>
    
            {/* Play button and overlay */}
            <div className="play-overlay">
                <button className="play-btn">
                    <FontAwesomeIcon icon={faPlay} size="2x" />
                </button>
            </div>
        </div>
    </div>
    
    );
};



export const SurveyRow = ({ title, surveys }) => {
    const scrollContainerRef = useRef(null);
    const [hasOverflow, setHasOverflow] = useState(false);

    // Check if the scroll container has overflow-x
    useEffect(() => {
        const checkOverflow = () => {
            if (scrollContainerRef.current) {
                const { scrollWidth, clientWidth } = scrollContainerRef.current;
                setHasOverflow(scrollWidth > clientWidth); // Set true if content overflows horizontally
            }
        };

        // Check overflow on mount and window resize
        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', checkOverflow);
    }, []);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="mb-4">
            <h6><strong>{title}</strong></h6>
            {surveys.length > 0 ? (
                <div className="position-relative">
                    {/* Conditionally render Left Scroll Button if there's overflow */}
                    {hasOverflow && (
                        <button
                            className="scroll-btn left"
                            onClick={scrollLeft}
                        >
                            &#8249; {/* Left arrow symbol */}
                        </button>
                    )}

                    {/* Scrollable Survey Cards */}
                    <div
                        className="row flex-nowrap overflow-hidden scroll-container"
                        ref={scrollContainerRef}
                    >
                        {surveys.map((survey) => (
                            <SurveyCard key={survey.id} survey={survey} />
                        ))}
                    </div>

                    {/* Conditionally render Right Scroll Button if there's overflow */}
                    {hasOverflow && (
                        <button
                            className="scroll-btn right"
                            onClick={scrollRight}
                        >
                            &#8250; {/* Right arrow symbol */}
                        </button>
                    )}
                </div>
            ) : (
                <div className=" surveys-unactive d-flex justify-content-center align-items-center" style={{ height: '150px', width: '100%' }}>
                    Sorry, you have no survey or research matches right now. Please check again later.
                </div>
            )}
        </div>
    );
};