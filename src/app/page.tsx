"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Hero: React.FC = () => {
    const [visibleTextIndex, setVisibleTextIndex] = useState(0);
    const [imagesVisible, setImagesVisible] = useState(false);
    const texts = ['AML', 'KYC', 'Sanctions', 'Anti-Fraud', 'Anti-Bribery'];

    useEffect(() => {
        const initialDelay = setTimeout(() => {
            const interval = setInterval(() => {
                setVisibleTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            }, 2000); // Duration each item is visible
            return () => clearInterval(interval);
        }, 1000); // Initial delay before starting the animation

        return () => clearTimeout(initialDelay);
    }, [texts.length]);

    useEffect(() => {
        const overlayTimeout = setTimeout(() => {
            setImagesVisible(true);
        }, 4000); // Matches the duration of the overlay animation

        return () => clearTimeout(overlayTimeout);
    }, []);

    return (
        <div className="hero-container">
            <div className="image-container">
                <div className="background-image">
                    <Image src="/images/C1.png" alt="C1" layout="fill" objectFit="cover" />
                </div>

                <div className="overlay">
                    <h2>
                        <div className="text">
                            <div className="image-center-container">
                                <Image src="/images/logo.png" alt="Image 1" width={400} height={150} />
                            </div>
                            <h1>Discover the Excellence</h1>
                            <ul>
                                {texts.map((text, index) => (
                                    <li key={text} className={visibleTextIndex === index ? 'visible' : 'hidden'}>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </h2>
                </div>

                {imagesVisible && (
                    <div className="image-gallery">
                        <div>
                            <Image src="/images/image1.png" alt="Image 1" width={400} height={200} />
                        </div>
                        <div>
                            <Image src="/images/image2.png" alt="Image 2" width={400} height={200} />
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
