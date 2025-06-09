import React from 'react';
import './Promote.css';

const GetLogoButton = () => (
  <section className="py-5 section-aff-promote text-center">
    <div className="container">
      <h2 className="fw-bold mb-4 section-aff-promote-h2 ">Promote with Style</h2>
      <p className="mb-4">Download our Banner and graphics to start promoting like a pro.</p>
      <a
        href="./asset3D/affiliate-banner-pack.zip"
        className="btn btn-outline-primary btn-lg rounded-pill"
        download
      >
        Get Stunning Banner Pack
      </a>
    </div>
  </section>
);

export default GetLogoButton;
