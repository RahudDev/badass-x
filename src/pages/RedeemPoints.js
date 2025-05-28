import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './RedeemPoints.css'; 
import Cookies from 'js-cookie';
import { API_URL } from '../App';
import paypal_logo from "./assets/paypal_logo.jpg";
import litecoin_logo from "./assets/litecoin_logo.png";
import * as bitcoin from 'bitcoinjs-lib'; // Library to validate Litecoin
import * as coininfo from 'coininfo'; // For Litecoin network info


const RedeemPage = ({userPoints}) => {
  const [redeemAmount, setRedeemAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [balanceError, setBalanceError] = useState('');
  const [loading, setLoading] = useState(false);
  const [litecoinPrice, setLitecoinPrice] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailPrompt = (method) => {
    const email = prompt(`Enter your ${method} email:`);
    const confirmEmail = prompt(`Confirm your ${method} email:`);
    if (email && confirmEmail && email === confirmEmail && validateEmail(email)) {
      setPaymentInfo(email);
      return email;
    } else {
      setPaymentError('Emails do not match or are invalid.');
      return null;
    }
  };

   // Define Litecoin network parameters using coininfo
   const litecoinNetwork = coininfo.litecoin.main.toBitcoinJS();

  // Validate Litecoin address (P2PKH, P2SH, Bech32)
const validateLitecoinAddress = (address) => {
  try {
    // Check if address is a Bech32 address (starting with 'ltc1')
    if (address.startsWith('ltc1')) {
      // Validate Bech32 (SegWit) address
      const decodedBech32 = bitcoin.address.fromBech32(address);
      // Check for valid witness version (0 for Litecoin SegWit)
      return decodedBech32.version === 0;
    } else {
      // Validate Base58 (P2PKH or P2SH) address
      const decodedBase58 = bitcoin.address.fromBase58Check(address);
      // Check if it's a valid Litecoin P2PKH or P2SH address
      return decodedBase58.version === litecoinNetwork.pubKeyHash || decodedBase58.version === litecoinNetwork.scriptHash;
    }
  } catch (e) {
    // Address is invalid
    return false;
  }
};

 
   const handleLitecoinPrompt = () => {
     const litecoinAddress = prompt('Enter your Litecoin wallet address:');
     const confirmLitecoinAddress = prompt('Confirm your Litecoin wallet address:');
     if (litecoinAddress && confirmLitecoinAddress && litecoinAddress === confirmLitecoinAddress && validateLitecoinAddress(litecoinAddress)) {
       setPaymentInfo(litecoinAddress);
       return litecoinAddress;
     } else {
       setPaymentError('Litecoin addresses do not match or are invalid.');
       return null;
     }
   };

  const handleRedeem = async () => {
    if (redeemAmount < 100) {
      setPaymentError('Minimum redeem amount is 100 $CUAN.');
      return;
    }

    if (redeemAmount > userPoints) {
      setBalanceError('Insufficient balance.');
      return;
    }

    let paymentDetails = '';

    if (paymentMethod === 'PayPal') {
      paymentDetails = handleEmailPrompt(paymentMethod);
    } else if (paymentMethod === 'Litecoin') {
      paymentDetails = handleLitecoinPrompt();
    }

    if (!paymentDetails) {
      return;
    }

    setPaymentError('');
    setBalanceError('');
    setLoading(true);

    const token = localStorage.getItem('token');
    const encodeuuid = Cookies.get('uuid');

     // Calculate the USD value in Litecoin
     const redeemAmountInUSD = redeemAmount / 100; // $CUAN to USD
     const litecoinAmount = redeemAmountInUSD / litecoinPrice; // USD to Litecoin
    try {
      await axios.post(
        `${API_URL}/api/redeem-points`,
        { encodeuuid, redeemAmount, paymentMethod,litecoinAmount,  paymentInfo: paymentDetails },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRedeemAmount('');
      setPaymentInfo('');
      alert('Redemption successful!');
    } catch (error) {
      console.error('Error redeeming points:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLitecoinPrice = async () => {
    try {
      setLoading(true);

      // Check if the price is already stored in the cookies
      const storedPrice = Cookies.get('litecoinPrice');
      const lastFetched = Cookies.get('lastFetched');

      const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds
      const now = new Date().getTime();

      if (storedPrice && lastFetched && now - lastFetched < TEN_MINUTES) {
        setLitecoinPrice(storedPrice);
        setLoading(false);
        return;
      }

      // If the price is not in cookies or expired, fetch from the API
      const response = await axios.get(`${API_URL}/api/litecoin`); // This points to your Express.js API endpoint

      const { price } = response.data;

      // Store the price in cookies with the current timestamp
      Cookies.set('litecoinPrice', price, { expires: 1 }); // Expires in 1 day
      Cookies.set('lastFetched', now, { expires: 1 }); // Store the time of the fetch

      // Update state with the fetched price
      setLitecoinPrice(price);
    } catch (err) {
      setError('Failed to fetch Litecoin price.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLitecoinPrice();
  }, []);

  const handleNavigateBack = () => {
    navigate('/');
  };

  const litecoinAmount = litecoinPrice && redeemAmount ? (redeemAmount / 100) / litecoinPrice : 0;


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className='redeem-page'>
            <Card.Body>
              <Card.Title><strong>Redeem <span style={{ color: '#28a745' }}>$CUAN</span></strong></Card.Title>
              <Card.Text>
                You have <strong style={{ color: '#28a745' }} >{userPoints.toLocaleString()} $CUAN</strong>.
              </Card.Text>
              <Form>
                <Form.Group>
                  <Form.Label>Redeem Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={redeemAmount}
                    onChange={(e) => setRedeemAmount(e.target.value)}
                    placeholder="Enter amount to redeem"
                    min="100"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Payment Method</Form.Label>
                  <Row>
                    <Col md={6}>
                      <Card className="payment-method-card" onClick={() => setPaymentMethod('PayPal')}>
                        <Card.Img variant="top" src={paypal_logo} className="payment-method-image" />
                        <Card.Body>
                          <Card.Title>PayPal</Card.Title>
                          <Form.Check 
                            type="radio" 
                            name="paymentMethod" 
                            value="PayPal" 
                            checked={paymentMethod === 'PayPal'}
                            onChange={() => setPaymentMethod('PayPal')}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="payment-method-card" onClick={() => setPaymentMethod('Litecoin')}>
                        <Card.Img variant="top" src={litecoin_logo} className="payment-method-image" />
                        <Card.Body>
                          <Card.Title>Litecoin ${parseFloat(litecoinPrice).toFixed(2)} USD</Card.Title>
                          <Form.Check 
                            type="radio" 
                            name="paymentMethod" 
                            value="Litecoin" 
                            checked={paymentMethod === 'Litecoin'}
                            onChange={() => setPaymentMethod('Litecoin')}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Form.Group>
                {paymentMethod === 'Litecoin' && redeemAmount && (
                  <p>
                    You will receive approximately {litecoinAmount.toFixed(8)} LTC for {redeemAmount} $CUAN.
                  </p>
                )}
                {paymentError && <p className="text-danger">{paymentError}</p>}
                {balanceError && <p className="text-danger">{balanceError}</p>}
                <Button variant="primary" onClick={handleRedeem} disabled={!redeemAmount || redeemAmount <= 0 || !paymentMethod}>
                  Redeem
                </Button>
                {loading && <div className="d-flex justify-content-center mt-3"><Spinner animation="border" /></div>}
                <Button variant="secondary" onClick={handleNavigateBack} className="ml-2">
                  Back
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RedeemPage;