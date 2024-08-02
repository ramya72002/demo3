'use client'
import './hiretalent.scss';
import React from 'react';
import Image from 'next/image';
import Header from '../header/page'
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Hiretalent = () => {
    const handleImageClick = (path:any) => {
        router.push(path); // Navigate to the specified path
      };
      const router = useRouter();
  return (
    <div><Header />
    <h1 className="quote">For Employees</h1>
    <div className="image-gallery">
            <div className="im1" onClick={() => handleImageClick('/opportunities')}>
              <Image
                src="/images/image.png"
                alt="Image 1"
                width={250}
                height={250}
              />
              <div className="text-overlay1">OPPORTUNITIES</div> 
            </div>
            <div className="im2" onClick={() => handleImageClick('/hiretalent')}>
              <Image
                src="/images/image.png"
                alt="Image 2"
                width={250}
                height={250}
              />
              <div className="text-overlay1">HIRE TALENT</div> 
            </div>
          </div>
          </div>
  )
}

export default Hiretalent