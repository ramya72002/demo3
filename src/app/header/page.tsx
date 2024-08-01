'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './header.scss';
import Image from 'next/image';

const Header = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('');

  const handleNavigation = (path: any) => {
    setActiveMenu(path);
    router.push(path);
  };

  return (
    <div className="header">
      <nav className="navbar">
        <div className="logo-image">
          <Image src="/images/logo.png" alt="Logo" width={125} height={50} />
        </div>
        <ul className="nav-list">
          <li
            className={`nav-item ${activeMenu === '/' ? 'active' : ''}`}
            onClick={() => handleNavigation('/')}
          >
            HOME
          </li>
          <li
            className={`nav-item ${activeMenu === '/about' ? 'active' : ''}`}
            onClick={() => handleNavigation('/about')}
          >
            ABOUT
          </li>
          <li
            className={`nav-item ${activeMenu === '/services' ? 'active' : ''}`}
            onClick={() => handleNavigation('/services')}
          >
            SERVICES
          </li>
          <li
            className={`nav-item ${activeMenu === '/contact' ? 'active' : ''}`}
            onClick={() => handleNavigation('/contact')}
          >
            CONTACT
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
