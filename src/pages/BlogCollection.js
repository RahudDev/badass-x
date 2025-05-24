import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo1 from './assets/blog/tops-5-ways.png';
import logo2 from './assets/blog/shine-bitcoin.png';
import logo3 from './assets/blog/reward-stack.png';
import logo4 from './assets/blog/paypal-bitcoin.png';
import logo5 from './assets/blog/wallet-phone.png';
import logo6 from './assets/blog/reward-stack.png';
import logo7 from './assets/blog/cuan-coin.png';
import logo8 from './assets/blog/warning.png';
import logo9 from './assets/blog/reward-stack.png';
import logo10 from './assets/blog/reward-stack.png';
import './BlogCollection.css';



const blogPosts = [
  {
    title: "Top 5 Ways to Earn Points on OptimistiCash",
    excerpt: "Maximize your earnings with these five powerful methods.",
    date: "August 10, 2025",
    image: logo1,
  },
  {
    title: "How OptimistiCash Turns Points into Real Money",
    excerpt: "Learn how to redeem your points for PayPal, Skrill, or Bitcoin.",
    date: "August 9, 2025",
    image: logo2,
  },
  {
    title: "Best Survey Sites That Pay in 2025",
    excerpt: "We've reviewed the highest paying and most reliable survey platforms.",
    date: "August 8, 2025",
    image: logo3,
  },
  {
    title: "Bitcoin vs PayPal: Which Payout Method is Better?",
    excerpt: "Compare transaction speed, fees, and ease of use.",
    date: "August 7, 2025",
    image: logo4,
  },
  {
    title: "Play Games, Earn Money: Here's How",
    excerpt: "Explore the top reward games integrated with OptimistiCash.",
    date: "August 6, 2025",
    image: logo5,
  },
  {
    title: "How to Complete Offers Faster on OptimistiCash",
    excerpt: "Time-saving tips to help you rack up points efficiently.",
    date: "August 5, 2025",
    image: logo6,
  },
  {
    title: "What is $cuan and How Do You Use It?",
    excerpt: "$cuan is your gateway to real rewards—here's everything you need to know.",
    date: "August 4, 2025",
    image: logo7,
  },
  {
    title: "Avoid These Mistakes When Earning on OptimistiCash",
    excerpt: "New users often fall into these traps—here’s how to stay efficient.",
    date: "August 3, 2025",
    image: logo8,
  },
  {
    title: "Why OptimistiCash is the Best GPT Site in 2025",
    excerpt: "See how we compare to other 'Get Paid To' platforms.",
    date: "August 2, 2025",
    image: logo9,
  },
  {
    title: "10 Ways to Stack More Bonuses on OptimistiCash",
    excerpt: "Unlock hidden bonus strategies to boost your daily income.",
    date: "August 1, 2025",
    image: logo10,
  },
];

const BlogCollection = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Latest from OptimistiCash Blog</h2>
      <div className="row g-4">
        {blogPosts.map((post, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="card-body-blog h-100 shadow-sm border-0 rounded-4">
              <img src={post.image} className="card-img-top-blog rounded-top-4" alt={post.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{post.title}</h5>
                <p className="card-text text-date-blog text-muted small">{post.date}</p>
                <p className="card-text">{post.excerpt}</p>
                <a href={`/blog/${idx + 1}`} className="btn btn-outline-primary mt-auto rounded-pill">
                  Read More →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCollection;
