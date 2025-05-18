import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button  } from 'react-bootstrap';
import { HandlePageClick } from '../App';
import './Dashboard.css';
import { API_URL } from '../App';
import { TOKENBITLABS, bitlatbs_url_surveys, notik_api } from '../config';
import PlaceholderCard from './PlaceholderCard';
import { API_URL_BIT } from '../config';
import { OfferRow } from './OfferCard';
import { SurveyRow } from './SurveyCard';
import Pointshintnotik from './Pointshintnotik';
import Cookies from 'js-cookie';
import { getDeviceInfo } from "./Notikoffer";
import { key, decryptData } from '../App';
import { APIKEY_NOTIK, PUBID_NOTIK, APPID_NOTIK } from '../config';
export  const fetchCountryFromIP = async (ip) => {
  try {
    const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
    return geoResponse.data.country;
  } catch (error) {
    console.error('Error fetching country from IP:', error);
    return null;
  }
};



const Dashboard = ({ userPoints }) => {
    const navigate = useNavigate();
    const contactSectionRef = useRef(null);
    const [cpxSurveys, setCpxSurveys] = useState([]);
    const [bitlabsSurveys, setBitlabsSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const clientIp_encrypted = Cookies.get('userip');
    const clientIp = decryptData(clientIp_encrypted, key);

    const [restrictionMessage, setRestrictionMessage] = useState(null);

    const [showModal, setShowModal] = useState(false);
  
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
  
    const handleProceed = () => {
      setShowModal(false);  // Close the modal
    };

    const [offersnotik, setOffersNotik] = useState([]);
    const [countryCode, setCountryCode] = useState(null);

    useEffect(() => {
        let hiddenStartTime = null;
    
        const handleVisibilityChange = async () => {
            if (document.hidden) {
                // Start tracking when tab becomes hidden
                hiddenStartTime = Date.now();
            } else {
                // Check duration of tab being hidden
                if (hiddenStartTime) {
                    const hiddenDuration = (Date.now() - hiddenStartTime) / 1000; // minutes
                    
                    if (hiddenDuration >= 300) {
                        // Fetch surveys again
                        setLoading(true);
                        await fetchSurveys();
                    }
                    
                    // Reset hidden start time
                    hiddenStartTime = null;
                }
            }
        };
    
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
    
            /*try {
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
                */
    
            /*try {
                // Build the params object dynamically
                const isMobile = /android|iphone|ipad|iPod/i.test(navigator.userAgent);
                const params = {
                  in_app: isMobile ? 'true' : 'false',
                  client_user_agent: navigator.userAgent,
                  client_ip: clientIp,
                  devices: isMobile ? ['android', 'iphone', 'ipad'] : [],
                };
            
                // Make the API request
                const responseoffer = await axios.get(API_URL_BIT, {
                  headers: {
                    'User-Agent': navigator.userAgent,
                    'X-Api-Token': TOKENBITLABS,
                    'X-User-Id': userid,
                    'accept': 'application/json',
                  },
                  params: params,
                });
            
                // Set the fetched offers in the state
                setOffersbitlabs(responseoffer.data.data.offers);
            } catch (err) {
                setError('Error fetching offers');
            }*/

                try {
                  // Check if we have cached offers and they are still valid (less than 1 minute old)
                  const cachedData = localStorage.getItem('notikOffersCache');
                  if (cachedData) {
                    const { offers, timestamp } = JSON.parse(cachedData);
                    const currentTime = new Date().getTime();
                    // If cache is less than 1 minute old, use it
                    if (currentTime - timestamp < 60000) {
                      console.log("Using cached Notik offers", offers);
                      setOffersNotik(offers);
                      setLoading(false);
                      return offers;
                    }
                    // Otherwise cache is expired, continue to fetch new data
                  }
              
                  // Get authentication information
                  const user_id = localStorage.getItem("uuid");
                  const userEmail = localStorage.getItem("email");
                  const encryptedIp = Cookies.get("userip");
                  
                  if (!user_id || !encryptedIp) {
                    throw new Error("Missing required authentication information (user_id or IP).");
                  }
                  
                  // Decrypt IP address
                  const ip = decryptData(encryptedIp, key);
                  if (!ip) {
                    throw new Error("Failed to decrypt IP address.");
                  }
                  
                  // Get device information
                  const { device_name, device_type, device_os } = getDeviceInfo();
                  
                  // Get country code from IP
                  const country_code = await fetchCountryFromIP(ip);
                  setCountryCode(country_code);
                  if (!country_code) {
                    throw new Error(`Unable to determine country code ${countryCode} from IP address ${ip}`);
                  }
                  
                  // Build the Notik API request URL
                  const apiUrl = `${notik_api}`;
                  const response = await axios.get(apiUrl, {
                    params: {
                      api_key: APIKEY_NOTIK,
                      pub_id: PUBID_NOTIK,
                      app_id: APPID_NOTIK,
                      user_id,
                      s1: userEmail || "unknown",
                      device_name,
                      device_type,
                      device_os,
                      country_code,
                      user_agent: navigator.userAgent,
                      ip,
                    },
                  });
                  
                  console.log("Raw Notik API response:", response.data);
                  
                  // Extract offers from response
                  let fetchedOffers = [];
                  if (response.data?.data && Array.isArray(response.data.data)) {
                    fetchedOffers = response.data.data;
                  } else if (response.data && Array.isArray(response.data)) {
                    fetchedOffers = response.data;
                  } else {
                    console.warn("API response doesn't contain an array at expected paths", response.data);
                  }
                  
                  console.log("Processed offers:", fetchedOffers);
                  
                  // Save to localStorage with timestamp
                  const cacheData = {
                    offers: fetchedOffers,
                    timestamp: new Date().getTime()
                  };
                  localStorage.setItem('notikOffersCache', JSON.stringify(cacheData));
                  
                  setOffersNotik(fetchedOffers);
                  return fetchedOffers;
                  
                } catch (err) {
                  console.error("Error fetching offers from Notik:", err);
                  setError(err.message || "An error occurred while fetching offers.");
                  
                  // Try to use cached data even if expired in case of error
                  const cachedData = localStorage.getItem('notikOffersCache');
                  if (cachedData) {
                    const { offers } = JSON.parse(cachedData);
                    console.log("Using expired cached offers due to fetch error", offers);
                    setOffersNotik(offers);
                    return offers;
                  } else {
                    setOffersNotik([]);
                    return [];
                  }
                } finally {
                  setLoading(false);
                }
        };
    
        // Initial fetch
        fetchSurveys();
    
        // Add event listener for page visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        // Cleanup event listener
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [clientIp]);



   /* const handleRestrictionReason = (reason) => {
        if (reason.not_verified) return 'The publisher account that owns this app has not been verified and therefore cannot receive surveys.';
        if (reason.using_vpn) return 'You are using a VPN and cannot access surveys.';
        if (reason.banned_until) return `You have been temporarily banned until ${new Date(reason.banned_until).toLocaleString()}. Reason: ${reason.reason}`;
        if (reason.unsupported_country) return 'Surveys are not available for your country.';
        return 'No surveys available at the moment.';
    };
    */

   

    // Combining surveys from both providers while avoiding duplicates
    const combinedSurveys = [
        ...cpxSurveys.map(survey => ({
            id: survey.id,
            image: 'https://od.lk/s/NjFfODg3MDAxNjhf/stars-4-removebg-preview.png',
            title: ``,
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
        /*...offersbitlabs.map(offer => ({
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

        }))*/

        ...offersnotik.map(offer => ({
            id: offer.offer_id,
            image: offer.image_url,
            title: offer.name,
            points: offer.payout,
            clickUrl: offer.click_url,
            events: offer.events, // Assuming events exist
            categories: offer.categories,
            description1: offer.description1,
            description2: offer.description2,
            description3: offer.description3,
            }))
    ];

    // Filter to remove duplicates
    const uniqueSurveys = Array.from(new Map(combinedSurveys.map(survey => [survey.id, survey])).values());
    // const uniqueoffers = Array.from(new Map(combinedSurveys.map(offer => [offer.id, offer])).values());
    const notikOffers = Array.isArray(offersnotik) 
  ? Array.from(new Map(offersnotik.map(offer => [offer.offer_id, offer])).values())
  : [];

    return (
        <div className="page-content-4 container-dashboard">
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-body-dashboard">
                        <h1 className="card-title"><strong>Dashboard</strong></h1>
                        <p className="card-text">Here are some surveys and offers you can complete to earn <strong style={{ color: '#28a745' }}>$CUAN</strong>.</p>

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
                                {/* <OfferRow title="Offer Games" offers={uniqueoffers.filter(offer => offersbitlabs.some(ofr => ofr.id === offer.id))} /> */}
                                {Array.isArray(notikOffers) && notikOffers.length > 0 ? (
                                   <OfferRow title="Featured Offers" offers={notikOffers}  />
                                    ) : (
                               <div className="text-center">No Notik offers available</div>
                                 )}
                                <SurveyRow title="Survey providers" surveys={uniqueSurveys.filter(s => s.title === '')} />
                                {/*<SurveyRow title="Research Partners" surveys={uniqueSurveys.filter(survey => bitlabsSurveys.some(bls => bls.id === survey.id))}  /> */}
                                
                            </>
                        )}
                        <div className="d-flex gap-3 mt-3 button-learn-more">
                            <Button onClick={(e) => HandlePageClick(e, '/tasks', contactSectionRef, navigate)}>View All Tasks</Button>
                            <Button onClick={(e) => HandlePageClick(e, '/survey-cpx', contactSectionRef, navigate)}>View all Surveys</Button>
                            <Button onClick={handleOpenModal}>Featured Offers</Button>
                               <Pointshintnotik showModal={showModal} handleClose={handleCloseModal} handleProceed={handleProceed} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
