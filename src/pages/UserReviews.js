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

  useEffect(() => {
    const slider = sliderRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast factor
      slider.scrollLeft = scrollLeft - walk;
    });

    // Touch Events
    let touchStartX = 0;
    let touchScrollLeft = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
      const touchMoveX = e.touches[0].pageX;
      const walk = (touchMoveX - touchStartX) * 2;
      slider.scrollLeft = touchScrollLeft - walk;
    });

    return () => {
      slider.removeEventListener('mousedown', () => {});
      slider.removeEventListener('mousemove', () => {});
      slider.removeEventListener('mouseup', () => {});
      slider.removeEventListener('mouseleave', () => {});
      slider.removeEventListener('touchstart', () => {});
      slider.removeEventListener('touchmove', () => {});
    };
  }, []);

  return (
    <section className="user-reviews-slider mt-5">
      <div className="container-review">
        <h2 className="user-reviews-heading mb-4 text-center"><strong>{t('user_reviews_heading')}</strong></h2>
        <p className="user" style={{color:"black"}}>{t('user_reviews_p')}</p> <br/>
        <div className="slider-wrapper" ref={sliderRef}>
          <div className="slider-content">
            {reviews.concat(reviews).map((review, index) => (
              <div key={index} className="user-review-slide">
                <div className="card user-review-card h-100" style={{border: '2px solid #ddd',}}>
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
