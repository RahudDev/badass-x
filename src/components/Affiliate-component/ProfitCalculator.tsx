import React, { useState } from 'react';
import './ProfitCalculator.css';

const ProfitCalculator = () => {
  const [value, setValue] = useState('10'); // default number of offers completed

  const offers = parseFloat(value);
  const profit20 = isNaN(offers) ? 0 : offers * 0.20;

  return (
    <section className="py-5 text-center">
      <div className="container">
        <h2 className="fw-bold mb-4 section-aff-calculate ">Calculate Your Potential Earnings</h2>
        <p className="lead mb-4">
          See how much you can earn when users complete offers like surveys, games, and more on Optimisticash.
        </p>

        <div className="mx-auto" style={{ maxWidth: 400 }}>
          <label htmlFor="offers" className="form-label fw-semibold">
            Number of Offers Completed by Your Referrals
          </label>
          <div className="input-group mb-3 shadow-sm">
            <span className="input-group-text bg-primary text-white fw-semibold">#</span>
            <input
              id="offers"
              type="text"
              className="form-control"
              value={value}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(val) || val === '') {
                  setValue(val);
                }
              }}
              placeholder="e.g. 25"
            />
          </div>

          <div className="mt-4">
            <p className="fs-5">
              <span className="fw-semibold text-dark">At 20% commission:</span>{' '}
              <span className="fw-bold text-success">${profit20.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfitCalculator;
