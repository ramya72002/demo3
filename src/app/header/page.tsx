'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Header.scss';

const Header = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('');

  const handleNavigation = (path:any) => {
    setActiveMenu(path);
    router.push(path);
  };

  return (
    <div className="header">
      <nav className="navbar">
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
