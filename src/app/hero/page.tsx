'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './Hero.scss';

const texts = ['AML', 'KYC', 'Sanctions', 'Anti-Fraud', 'Anti-Bribery'];

const Hero = () => {
  const [visibleTextIndex, setVisibleTextIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-container">
      <div className="background-image">  
        <Image src="/images/C1.png" alt="Background" layout="fill" objectFit="cover" />
      </div>
      
      <div className="overlay">
        <div className="hero-content">
          <div className="logo-image">
            <Image src="/images/logo.png" alt="Logo" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="logo-text-container">
          <div className="logo-text">
            Discover the Excellence
          </div>
          <div className="dynamic-text">
            {texts[visibleTextIndex]}
          </div>
        </div>
        
        {showImages && (
          <div className="image-container">
            <div className="image-item">
              <Image src="/images/image1.png" alt="Image 1" layout="fill" objectFit="cover" />
            </div>
            <div className="image-item">
              <Image src="/images/image2.png" alt="Image 2" layout="fill" objectFit="cover" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
