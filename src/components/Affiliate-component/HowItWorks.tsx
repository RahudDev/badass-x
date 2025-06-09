import React from 'react';
import { FaUserPlus, FaLink, FaDollarSign } from 'react-icons/fa';
import './HowItWorks.css';

const UserPlus = FaUserPlus as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkSign = FaLink as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const DollarSign = FaDollarSign as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const steps = [
  {
    title: "Create Your Free Account",
    icon: <UserPlus className="text-primary mb-3 icon-size" />,
    text: "Sign up to Optimisticash in under 60 seconds — no fees, no hassle.",
  },
  {
    title: "Share & Refer",
    icon: <LinkSign className="text-primary mb-3 icon-size" />,
    text: "Get your custom referral link and share it with friends, followers, or anyone online.",
  },
  {
    title: "Earn Every Time",
    icon: <DollarSign className="text-primary mb-3 icon-size" />,
    text: "Earn 20% commission when your referrals complete offers like surveys, games, and more.",
  },
];

const HowItWorks = () => (
  <section className="py-5 text-center">
    <div className="container">
      <h2 className="fw-bold mb-5 section-aff-how">How It Works</h2>
      <div className="row g-4">
        {steps.map((step, i) => (
          <div key={i} className="col-md-4">
            <div className="p-4 border rounded-4 shadow-sm h-100">
              {step.icon}
              <h5 className="fw-semibold mb-2 section-aff-how">{step.title}</h5>
              <p className="text-success">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      .icon-size {
        font-size: 3rem;
      }
    `}</style>
  </section>
);

export default HowItWorks;
