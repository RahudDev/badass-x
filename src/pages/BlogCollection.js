import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const blogPosts = [
  {
    title: "Top 5 Ways to Earn Points on OptimistiCash",
    excerpt: "Maximize your earnings with these five powerful methods.",
    date: "August 10, 2025",
    image: "https://via.placeholder.com/400x200?text=Earn+Points",
  },
  {
    title: "How OptimistiCash Turns Points into Real Money",
    excerpt: "Learn how to redeem your points for PayPal, Skrill, or Bitcoin.",
    date: "August 9, 2025",
    image: "https://via.placeholder.com/400x200?text=Real+Money",
  },
  {
    title: "Best Survey Sites That Pay in 2025",
    excerpt: "We've reviewed the highest paying and most reliable survey platforms.",
    date: "August 8, 2025",
    image: "https://via.placeholder.com/400x200?text=Survey+Sites",
  },
  {
    title: "Bitcoin vs PayPal: Which Payout Method is Better?",
    excerpt: "Compare transaction speed, fees, and ease of use.",
    date: "August 7, 2025",
    image: "https://via.placeholder.com/400x200?text=Bitcoin+vs+PayPal",
  },
  {
    title: "Play Games, Earn Money: Here's How",
    excerpt: "Explore the top reward games integrated with OptimistiCash.",
    date: "August 6, 2025",
    image: "https://via.placeholder.com/400x200?text=Play+and+Earn",
  },
  {
    title: "How to Complete Offers Faster on OptimistiCash",
    excerpt: "Time-saving tips to help you rack up points efficiently.",
    date: "August 5, 2025",
    image: "https://via.placeholder.com/400x200?text=Faster+Offers",
  },
  {
    title: "What is $cuan and How Do You Use It?",
    excerpt: "$cuan is your gateway to real rewards—here's everything you need to know.",
    date: "August 4, 2025",
    image: "https://via.placeholder.com/400x200?text=About+$cuan",
  },
  {
    title: "Avoid These Mistakes When Earning on OptimistiCash",
    excerpt: "New users often fall into these traps—here’s how to stay efficient.",
    date: "August 3, 2025",
    image: "https://via.placeholder.com/400x200?text=Avoid+Mistakes",
  },
  {
    title: "Why OptimistiCash is the Best GPT Site in 2025",
    excerpt: "See how we compare to other 'Get Paid To' platforms.",
    date: "August 2, 2025",
    image: "https://via.placeholder.com/400x200?text=Best+GPT+Site",
  },
  {
    title: "10 Ways to Stack More Bonuses on OptimistiCash",
    excerpt: "Unlock hidden bonus strategies to boost your daily income.",
    date: "August 1, 2025",
    image: "https://via.placeholder.com/400x200?text=Bonus+Tips",
  },
];

const BlogCollection = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Latest from OptimistiCash Blog</h2>
      <div className="row g-4">
        {blogPosts.map((post, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img src={post.image} className="card-img-top rounded-top-4" alt={post.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{post.title}</h5>
                <p className="card-text text-muted small">{post.date}</p>
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
