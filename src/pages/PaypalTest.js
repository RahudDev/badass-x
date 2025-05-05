import React, { useState } from "react";
import { API_URL } from '../App';
import './PaypalTest.css'; // Optional: create this file for custom styles

const PRODUCTS = [
  {
    id: "NFT_001",
    name: "NFT Art 1",
    imageUrl: "/asset3D/nft_selling_1.jpg",
    price: 1.0,
  },
  {
    id: "NFT_002",
    name: "NFT Art 2",
    imageUrl: "/asset3D/nft_selling_2.jpg",
    price: 2.5,
  },
  {
    id: "NFT_003",
    name: "NFT Art 3",
    imageUrl: "/asset3D/nft_selling_03.jpg",
    price: 3.0,
  },
];

const PaypalTest = () => {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(1);

  const handleCheckout = async () => {
    const cart = [
      {
        id: selectedProductId,
        quantity: parseInt(quantity, 10),
      },
    ];

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (data?.id) {
        const approvalLink = `https://www.paypal.com/checkoutnow?token=${data.id}`; //https://www.paypal.com/checkoutnow?token=${data.id} or https://www.sandbox.paypal.com/checkoutnow?token=${data.id}
        window.location.href = approvalLink;
      } else {
        throw new Error("Order ID not found in response.");
      }
    } catch (error) {
      console.error("PayPal Redirect Error:", error);
      const container = document.querySelector("#result-message");
      if (container) {
        container.innerHTML = `Checkout failed: ${error.message}`;
        container.style.color = "red";
      }
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Buy an NFT at low price</h2>
      <div className="row mt-4">
        {PRODUCTS.map((product) => (
          <div
            className={`col-12 col-md-4 mb-4 ${selectedProductId === product.id ? 'selected-card' : ''}`}
            key={product.id}
            onClick={() => setSelectedProductId(product.id)}
            style={{
              cursor: "pointer",
              border: selectedProductId === product.id ? "3px solid gold" : "1px solid #ddd",
              borderRadius: "12px",
              transition: "border 0.3s",
              boxShadow: selectedProductId === product.id ? "0 0 10px gold" : "none",
            }}
          >
            <div className="card h-100">
              <img src={product.imageUrl} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <label htmlFor="quantity" className="form-label">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control text-center"
          style={{ width: "100px", margin: "0 auto" }}
        />
      </div>

      <button className="btn btn-warning mt-3" onClick={handleCheckout}>
        I want it
      </button>

      <div id="result-message" style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default PaypalTest;
