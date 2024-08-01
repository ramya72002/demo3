'use client';
import Header from '../header/page';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import './hero.scss';

const texts = ['AML', 'KYC', 'Sanctions', 'Anti-Fraud', 'Anti-Bribery'];

const Hero = () => {
  const [visibleTextIndex, setVisibleTextIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    const overlayTimeout = setTimeout(() => {
      setShowImages(true);
    }, 2000);

    return () => clearTimeout(overlayTimeout);
  }, []);

  const handleImageClick = (path:any) => {
    router.push(path); // Navigate to the specified path
  };

  return (
    <div className="hero-container">
      <Header />
      <div className="background-image">  
        <Image src="/images/C1.png" alt="Background" layout="fill" objectFit="cover" />
      </div>
      <div className='image-container'>
        <div className="overlay">
          <div className="hero-content">
            <div className="logo-image">
              <Image src="/images/logo.png" alt="Logo" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="logo-text-container">
            <div className="logo-text">
              Discover the Excellence in
            </div>
            <div className="dynamic-text">
              {texts[visibleTextIndex]}
            </div>
          </div> 
        </div>
        {showImages && (
          <div className="image-gallery">
            <div className="im1" onClick={() => handleImageClick('/opportunities')}>
              <Image
                src="/images/image1.png"
                alt="Image 1"
                width={250}
                height={250}
              />
              <div className="text-overlay1">OPPORTUNITIES</div> 
            </div>
            <div className="im2">
              <Image
                src="/images/image2.png"
                alt="Image 2"
                width={250}
                height={250}
              />
              <div className="text-overlay1">HIRE TALENT</div> 
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <h3>An elite online marketplace for leading<span className="text-white"> FinCrime</span> professionals in <span className="text-white">leadership</span> roles</h3>
      </div>
    </div>
  );
};

export default Hero;
