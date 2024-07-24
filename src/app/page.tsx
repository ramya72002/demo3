"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Hero: React.FC = () => {
    const [visibleTextIndex, setVisibleTextIndex] = useState(-1);
    const [imagesVisible, setImagesVisible] = useState(false);
    const texts = ['About Us', 'Student Login', 'Tournaments', 'Clubs'];
    const router = useRouter();

    useEffect(() => {
        const initialDelay = setTimeout(() => {
            setVisibleTextIndex(0);
            const interval = setInterval(() => {
                setVisibleTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            }, 1000);
            return () => clearInterval(interval);
        }, 1000);

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
                    <Image 
                        src="/images/logo.png" 
                        alt="Logo" 
                        className="center-top-image"
                        width={200}
                        height={100}
                    />
                    <div className="text">
                        <h1 className="left-text">Discover the Excellence</h1>
                        <ul className="right-text">
                            <li>AML</li>
                            <li>KYC</li>
                            <li>Sanctions</li>
                            <li>Anti-Fraud</li>
                            <li>Anti-Bribery</li>
                        </ul>
                    </div>
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
