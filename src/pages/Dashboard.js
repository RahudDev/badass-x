import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button  } from 'react-bootstrap';
import { HandlePageClick } from '../App';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../App';
import { TOKENBITLABS, bitlatbs_url_surveys } from '../config';
import PlaceholderCard from './PlaceholderCard';
import { API_URL_BIT } from '../config';
import { OfferRow } from './OfferCard';
import Cookies from 'js-cookie';
import { key, decryptData } from '../App';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';




const Dashboard = ({ userPoints }) => {
    const navigate = useNavigate();
    const contactSectionRef = useRef(null);
    const [cpxSurveys, setCpxSurveys] = useState([]);
    const [bitlabsSurveys, setBitlabsSurveys] = useState([]);
    const [offersbitlabs, setOffersbitlabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const clientIp_encrypted = Cookies.get('userip');
    const clientIp = decryptData(clientIp_encrypted, key);

    const [restrictionMessage, setRestrictionMessage] = useState(null);

    useEffect(() => {
        const fetchSurveys = async () => {
            const userid = localStorage.getItem('uuid');
            const useremail = localStorage.getItem('email');

            if (!userid) {
                setError('UUID not found in local storage');
                setLoading(false);
                return;
            }

            try {
                // Fetching CPX Surveys
                const cpxResponse = await axios.get(`${API_URL}/api/cpx-surveys`, {
                    params: { ext_user_id: userid, email: useremail }
                });
                setCpxSurveys(cpxResponse.data.surveys || []);
            } catch (error) {
                console.error('Failed to fetch CPX surveys:', error.message);
                setError('Failed to fetch CPX surveys');
            }

            try {
                // Fetching Bitlabs Surveys
                const bitlabsResponse = await fetch(bitlatbs_url_surveys, {
                    method: 'GET',
                    headers: {
                        'X-Api-Token': TOKENBITLABS,
                        'X-User-Id': userid,
                        'accept': 'application/json',
                    },
                });

                if (!bitlabsResponse.ok) {
                    throw new Error(`BitLabs Error: ${bitlabsResponse.statusText}`);
                }

                const bitlabsData = await bitlabsResponse.json();

                if (bitlabsData.data.restriction_reason) {
                    setRestrictionMessage(handleRestrictionReason(bitlabsData.data.restriction_reason));
                } else {
                    setBitlabsSurveys(bitlabsData.data.surveys || []);
                }
            } catch (error) {
                console.error('Failed to fetch BitLabs surveys:', error.message);
                setError('Failed to fetch BitLabs surveys');
            }

            try {
                // Build the params object dynamically
                const params = {
                  in_app: 'false',
                  client_user_agent: navigator.userAgent,
                  client_ip: clientIp, // Client IP fetched above
                  devices : ['android','iphone', 'ipad'],
                };
            
                // Make the API request
                const responseoffer = await axios.get(API_URL_BIT, {
                  headers: {
                    'User-Agent': navigator.userAgent,
                    'X-Api-Token': TOKENBITLABS,
                    'X-User-Id': userid,
                    'accept': 'application/json',
                  },
                  params: params, // Use the dynamically built params object
                });
            
                // Set the fetched offers in the state
                setOffersbitlabs(responseoffer.data.data.offers);
              } catch (err) {
                setError('Error fetching offers');
              }

            setLoading(false);
        };

        fetchSurveys();
    }, [clientIp]);

    const handleRestrictionReason = (reason) => {
        if (reason.not_verified) return 'The publisher account that owns this app has not been verified and therefore cannot receive surveys.';
        if (reason.using_vpn) return 'You are using a VPN and cannot access surveys.';
        if (reason.banned_until) return `You have been temporarily banned until ${new Date(reason.banned_until).toLocaleString()}. Reason: ${reason.reason}`;
        if (reason.unsupported_country) return 'Surveys are not available for your country.';
        return 'No surveys available at the moment.';
    };

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
                    className="card h-100 shadow-sm"
                    style={{ width: '100%', cursor: 'pointer' }}
                    onClick={handleCardClick} // Handle click event
                >
                    <img
                        src={survey.image || 'https://via.placeholder.com/150'}
                        alt={survey.title}
                        className="card-img-top"
                        style={{ height: '120px', objectFit: 'cover', border: "5px" }}
                    />
                    <div className="card-body text-center p-2">
                        <h6 className="card-title small card-text-black">{survey.title}</h6>
                        <StarRating rating={survey.rating} ratingCount={survey.ratingCount} className="card-text-black" />
                        <p className="card-text-black">
                            <FontAwesomeIcon icon={faClock} className="me-2" />
                            {survey.loi} min
                        </p>
                        <p className="card-text-i card-text-black"> <strong>+{Math.round(survey.points)} $CUAN </strong></p>
                    </div>
                </div>
            </div>
        );
    };

    
    
    const SurveyRow = ({ title, surveys }) => {
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
                    <div className="text-muted d-flex justify-content-center align-items-center" style={{ height: '150px', width: '100%' }}>
                        Sorry, you have no survey matches right now. Please check again later.
                    </div>
                )}
            </div>
        );
    };

   

    // Combining surveys from both providers while avoiding duplicates
    const combinedSurveys = [
        ...cpxSurveys.map(survey => ({
            id: survey.id,
            image: 'https://od.lk/s/NjFfODg3MDAxNjhf/stars-4-removebg-preview.png',
            title: `CPX Survey`,
            points: survey.payout,
            loi: survey.loi,
            rating: survey.statistics_rating_avg,
            ratingCount: survey.statistics_rating_count,
            clickUrl: survey.href,
        })),
        ...bitlabsSurveys.map(survey => ({
            id: survey.id,
            image: survey.category.icon_url,
            title: survey.category.name,
            loi: survey.loi,
            points: survey.value,
            rating: survey.rating,
            ratingCount: survey.rating, // Assuming this is the correct usage of survey.rating
            clickUrl: survey.click_url,
        })),
        ...offersbitlabs.map(offer => ({
            id : offer.id,
            image: offer.icon_url,
            title: offer.anchor,
            points : offer.total_points,
            clickUrl: offer.clickUrl,
            events : offer.events,
            anchor : offer.anchor,
            web_to_mobile_devices : offer.web_to_mobile_devices,
            description : offer.description,
            confirmation_time : offer.confirmation_time,
            requirements : offer.requirements,
            disclaimer : offer.disclaimer,
            click_url : offer.click_url,

        }))
    ];

    // Filter to remove duplicates
    const uniqueSurveys = Array.from(new Map(combinedSurveys.map(survey => [survey.id, survey])).values());
    const uniqueoffers = Array.from(new Map(combinedSurveys.map(offer => [offer.id, offer])).values());

    return (
        <div className="page-content">
            <div className="container mt-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h1 className="card-title"><strong>Dashboard</strong></h1>
                        <p className="card-text">Here are some surveys and offers you can complete to earn $CUAN.</p>

                        {loading ? (
                            <>
                          <div className="row flex-nowrap overflow-auto mb-3">
                              {Array.from({ length: 6 }).map((_, index) => (
                                  <PlaceholderCard key={index} />
                                     ))}
                                        </div>
                                          <div className="row flex-nowrap overflow-auto">
                                           {Array.from({ length: 6 }).map((_, index) => (
                                             <PlaceholderCard key={index + 6} />
                                                   ))}
                                                  </div>
                                                  <div className="row flex-nowrap overflow-auto">
                                           {Array.from({ length: 6 }).map((_, index) => (
                                             <PlaceholderCard key={index + 6} />
                                                   ))}
                                                  </div>
                                                          </>
                        ) : error ? (
                            <div className="text-center text-danger">{error}</div>
                        ) : restrictionMessage ? (
                            <div className="text-center text-warning">{restrictionMessage}</div>
                        ) : (
                            <>
                                <OfferRow title="Offer Games" offers={uniqueoffers.filter(offer => offersbitlabs.some(ofr => ofr.id === offer.id))} />
                                <SurveyRow title="CPX Research Surveys" surveys={uniqueSurveys.filter(s => s.title === 'CPX Survey')} />
                                <SurveyRow title="BitLabs Surveys" surveys={uniqueSurveys.filter(survey => bitlabsSurveys.some(bls => bls.id === survey.id))}  />
                                
                            </>
                        )}
                        <div className="d-flex gap-3 mt-3">
                            <Button onClick={(e) => HandlePageClick(e, '/tasks', contactSectionRef, navigate)}>View All Tasks</Button>
                            <Button onClick={(e) => HandlePageClick(e, '/survey-cpx', contactSectionRef, navigate)}>CPX Surveys</Button>
                            <Button onClick={(e) => HandlePageClick(e, '/survey-bitlabs', contactSectionRef, navigate)}>Bitlabs Surveys</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
