// AffiliatePage.jsx
import React from "react";
import HowItWorks from "../components/Affiliate-component/HowItWorks";
import Benefits from "../components/Affiliate-component/Benefits";
import ProfitCalculator from "../components/Affiliate-component/ProfitCalculator";
import Promote from "../components/Affiliate-component/Promote";
import FAQ from "../components/Affiliate-component/FAQ";
import './AffiliatePage.css';

const AffiliatePage = () => (
  <main className="affiliate-program-page">
    <header className="text-center affiliate-header-page py-5">
      <div className="container">
        <h1 className="fw-bold display-5">Become an Optimisticash Affiliate</h1>
        <p className="lead mt-3">
          Turn your traffic into real cash by promoting Optimisticash — the platform where users earn by completing surveys, playing games, watching videos, and more!
        </p>
        <p className="fs-5 mt-2">
          Help others discover legit ways to earn online, and get <strong>20% lifetime commissions</strong> on every user you refer.
        </p>
        <p className="fs-5 mt-2">
          With high conversion rates and engaging offers, promoting Optimisticash is your next smart move.
        </p>
        <p className="mt-3 text-uppercase fw-semibold">It’s Free. It’s Fun. It Pays.</p>

        {/* Sign Up Button */}
        <div className="mt-4">
          <a
            href="/signup"
            className="btn btn-light btn-lg fw-bold px-4 py-2 rounded-pill shadow"
          >
            Start Earning Now
          </a>
        </div>
      </div>
    </header>

    {/* Sections */}
    <HowItWorks />
    <Benefits />
    <ProfitCalculator />
    <Promote />
    <FAQ />
  </main>
);

export default AffiliatePage;
