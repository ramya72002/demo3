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
                    <h2>
                        <div className="text">
                            <h1>Discover the Excellence</h1>
                            <ul>
                                <li>AML</li>
                                <li>KYC</li>
                                <li>Sanctions</li>
                                <li>Anti-Fraud</li>
                                <li>Anti-Bribery</li>
                            </ul>
                        </div>
                    </h2>
                </div>

                {imagesVisible && (
                    <div className="image-gallery">
                        <div className="slide-from-left">
                            <Image src="/images/image1.png" alt="Image 1" width={300} height={200} />
                        </div>
                        <div className="slide-from-right">
                            <Image src="/images/image2.png" alt="Image 2" width={300} height={200} />
                        </div>
                    </div>
                )}
            </div>

            <div className="footer">
                <h2>An elite online marketplace for leading FinCrime professionals in <span>leadership roles</span></h2>
            </div>
        </div>
    );
};

export default Hero;
