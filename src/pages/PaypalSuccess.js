import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../App";

const PaypalSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Capturing your payment...");
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const orderID = searchParams.get("token");

    const captureOrder = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/${orderID}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Unknown capture error");
        }

        setStatus("success");
        setMessage("✅ Payment successful! Thank you for your order.");

        if (Array.isArray(data.purchasedItems)) {
          setPurchasedItems(data.purchasedItems);

          const totalAmount = data.purchasedItems.reduce((sum, item) => {
            const price = typeof item.price === "number" ? item.price : 0;
            const quantity = typeof item.quantity === "number" ? item.quantity : 0;
            return sum + price * quantity;
          }, 0);

          setTotal(totalAmount);
        }
      } catch (error) {
        console.error("Capture error:", error);
        setStatus("error");
        setMessage("❌ Failed to capture the payment. Please contact support.");
      }
    };

    if (orderID) {
      captureOrder();
    } else {
      setStatus("error");
      setMessage("⚠️ Missing order ID from PayPal.");
    }
  }, [searchParams]);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2 className="mb-3">🧾 PayPal Payment Result</h2>
        <p className={`fs-5 ${status === "error" ? "text-danger" : "text-success"}`}>
          {message}
        </p>
      </div>

      {purchasedItems.length > 0 && (
        <div className="mt-5">
          <h4 className="text-center mb-4">🖼️ Your NFT Order</h4>
          <div className="row justify-content-center">
            {purchasedItems.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-lg border-0 h-100">
                  <img
                    src={item.image || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={item.name || "NFT Image"}
                    className="card-img-top"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name || "Unnamed NFT"}</h5>
                    <p className="card-text mb-1">
                      <strong>Quantity:</strong>{" "}
                      {typeof item.quantity === "number" ? item.quantity : 0}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Price:</strong>{" "}
                      ${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"} USD
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <h5 className="fw-bold text-success">
              💰 Total Paid: ${total.toFixed(2)} USD
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaypalSuccess;
