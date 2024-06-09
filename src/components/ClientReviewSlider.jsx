import React, { useEffect, useRef } from 'react';
import '../styles/clientreviewslider.scss';

import slide1 from '../assets/client1.jpg';
import slide2 from '../assets/client2.jpg';
import slide3 from '../assets/client3.jpg';
import slide4 from '../assets/client4.jpg';
import slide5 from '../assets/client1.jpg'

const ClientReviewSlider = () => {
  const sliderRef = useRef(null);

  const slides = [

    {
      image: slide1,
      clientname:"Jane L. from TechCorp Solutions",
      review: "Working with Inner Web development team has been a game changer for us. They understood our vision and brought it to life with a sleek, user-friendly website. The process was smooth, and their attention to detail was impressive. Highly recommend!"
    },
    {
      image: slide2,
      clientname:"Jane L. from TechCorp Solutions",
      review: "Our new website exceeded all expectations. The team was professional, responsive, and delivered on time. They provided valuable insights that improved our site’s functionality and design. We’ve seen a significant increase in traffic and engagement since the launch."
   
    },
    {
      image: slide3,
      clientname:"Jane L. from TechCorp Solutions",
      review: "Excellent service from start to finish. Inner Web was knowledgeable, creative, and easy to work with. They took our outdated website and transformed it into a modern, mobile-friendly platform. Our clients love it, and so do we!"
   
    },
    {
      image: slide4,
      clientname:"Jane L. from TechCorp Solutions",
      review: "The web developers were fantastic! They listened to our needs and created a website that truly represents our brand. The site is not only beautiful but also optimized for search engines, which has helped us attract more customers. We couldn’t be happier!"
    
    },
    {
      image: slide5,
      clientname:"Jane L. from TechCorp Solutions",
      review: "Our experience with Inner Web team was outstanding. They provided excellent communication throughout the project and delivered a top-notch website. Their post-launch support has been invaluable as well. Highly recommended!"
    },


  ];



  useEffect(() => {
    const slider = sliderRef.current;
    let currentIndex = 0;

    const slide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const interval = setInterval(slide, 7000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="review-slider-container">
      <div className="review-slider" ref={sliderRef}>
        {slides.map((slide, index) => (
          <div className="review-slide" key={index}>
            <div className='client-image-container'>
            <img src={slide.image} alt={`Slide ${index}`} />
            <p>{slide.clientname}</p>
            </div>
            <p>{slide.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviewSlider;
