import React from 'react';
import './Benefits.css';

const Benefits = () => (
  <section className="py-5 section-aff-benefit text-center">
    <div className="container">
      <h2 className="fw-bold mb-4 section-aff-benefit-h2">Why Join Optimisticash?</h2>
      <div className="row g-4">
        {[
          "Earn 20% from each referral's completed offers",
          "Live dashboard to monitor your referrals and earnings",
          "Weekly cashouts via PayPal, Skrill, or crypto",
          "Get paid for life — earn whenever your referrals earn",
        ].map((benefit, i) => (
          <div key={i} className="col-md-3">
            <div className="p-3 bg-success text-white rounded-4 shadow-sm h-100">
              <p className="mb-0 fw-semibold">{benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
