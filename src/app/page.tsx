"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
    const [visibleTextIndex, setVisibleTextIndex] = useState(0);
    const [imagesVisible, setImagesVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const texts = ['AML', 'KYC', 'Sanctions', 'Anti-Fraud', 'Anti-Bribery'];

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [texts.length]);

    useEffect(() => {
        const overlayTimeout = setTimeout(() => {
            setImagesVisible(true);
        }, 4000);

        return () => clearTimeout(overlayTimeout);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="hero-container">
            <div className="image-container">
                <div className="background-image">
                    <Image src="/images/C1.png" alt="C1" layout="fill" objectFit="cover" />
                </div>

                <div className="overlay">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        className="center-top-image"
                        width={200}
                        height={100}
                    />
                    <div className="text">
                        <h1 className="left-text">Discover the Excellence <div className="right-text">{texts[visibleTextIndex]}</div></h1>
                    </div>
                </div>

                {imagesVisible && (
                    <div className="image-gallery">
                        <div className="im1">
                            <Image
                                src="/images/image1.png"
                                alt="Image 1"
                                width={400}
                                height={200}
                                style={isMobile ? { height: '150px',width:'160px' } : {}}
                            />
                        </div>
                        <div className="im2">
                            <Image
                                src="/images/image2.png"
                                alt="Image 2"
                                width={400}
                                height={200}
                                style={isMobile ? { height: '150px',width:'160px' } : {}}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="footer">
                <h2>An elite online marketplace for leading<span className="text-white"> FinCrime</span> professionals in <span className="text-white">leadership</span> roles</h2>
            </div>
        </div>
    );
};

export default Hero;
