import React, { useEffect, useRef } from 'react';
import '../styles/slider.scss';

import slide1 from '../assets/im-apex-trading.webp';
import slide2 from '../assets/im-logistics.png';
import slide3 from '../assets/im-sodalis.webp';
import slide4 from '../assets/im-trudetail.webp';
import slide5 from '../assets/im-villas.webp';

const Slider = () => {
  const sliderRef = useRef(null);

  const images = [
    slide1,
    slide2,
    slide3,
    slide4,
  ];

  

  useEffect(() => {
    const slider = sliderRef.current;
    let currentIndex = 0;

    const slide = () => {
      currentIndex = (currentIndex + 1) % images.length;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const interval = setInterval(slide, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
