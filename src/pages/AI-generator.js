// src/pages/AiTextGenerator.jsx
import React, { useState } from 'react';
import { API_URL } from '../App';

const AiTextGenerator = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callAI = async () => {
    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch(`${API_URL}/huggingface`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: input })
      });

      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setResponse("Error: " + data.error);
      } else {
        // Check multiple possible formats
        setResponse(
          data[0]?.generated_text ||
          data.generated_text ||
          JSON.stringify(data)
        );
      }

    } catch (err) {
      setLoading(false);
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">FreeCuan AI Text Generator</h2>
      <textarea
        className="form-control mb-3"
        rows="4"
        placeholder="Type something for AI to complete..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-primary" onClick={callAI} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <div className="mt-4">
        <h5>Response:</h5>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AiTextGenerator;
