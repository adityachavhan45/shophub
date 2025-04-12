import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80',
      title: 'Fashion Sale',
      subtitle: 'Up to 50% off on latest trends'
    },
    {
      url: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&q=80',
      title: 'Electronics Deal',
      subtitle: 'Latest gadgets at best prices'
    },
    {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      title: 'Home Decor',
      subtitle: 'Make your home beautiful'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="slider">
      <button className="slider-nav-button prev" onClick={handlePrevClick}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button className="slider-nav-button next" onClick={handleNextClick}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
      <div 
        className="slides"
        style={{
          transform: `translateX(-${currentSlide * 33.33}%)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image.url} alt={image.title} />
            <div className="slide-content">
              <h2>{image.title}</h2>
              <p>{image.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-nav">
        {images.map((_, index) => (
          <div
            key={index}
            className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
