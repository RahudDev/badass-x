// src/components/UserReviews.js
import React, { useEffect, useRef } from 'react';
import './UserReviews.css';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';





const UserReviews = () => {
  const sliderRef = useRef(null);
  const { t } = useTranslation();
  const usersay = t('reviews', { returnObjects: true });

  const reviews = [
    { id: 1, name: "Alice", review: usersay[0] },
    { id: 2, name: "Bob", review: usersay[1] },
    { id: 3, name: "Charlie", review: usersay[2] },
    { id: 4, name: "Diana", review: usersay[3] },
    { id: 5, name: "Eve", review: usersay[4] },
    { id: 6, name: "Frank", review: usersay[5] },
    { id: 7, name: "Grace", review: usersay[6] },
    { id: 8, name: "Hank", review: usersay[7] },
    { id: 9, name: "Ivy", review: usersay[8] },
    { id: 10, name: "Jack", review: usersay[9] }
  ];


  useEffect(() => {
    const slider = sliderRef.current;
    let isMouseOver = false;
    const slide = () => {
      if (!isMouseOver) {
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(slide, 20);
    
    slider.addEventListener('mouseover', () => {
      isMouseOver = true;
    });

    slider.addEventListener('mouseout', () => {
      isMouseOver = false;
    });

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="user-reviews-slider mt-5">
      <div className="container-review">
        <h2 className="user-reviews-heading mb-4 text-center">{t('user_reviews_heading')}</h2>
        <div className="slider-wrapper" ref={sliderRef}>
          <div className="slider-content">
            {reviews.concat(reviews).map((review, index) => (
              <div key={index} className="user-review-slide">
                <div className="card user-review-card h-100">
                  <div className="card-body">
                    <h5 className="user-review-name">{review.name}</h5>
                    <p className="user-review-content">{review.review}</p>
                    <div className="user-review-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="user-review-star">&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReviews;
