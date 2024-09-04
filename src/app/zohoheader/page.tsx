'use client'
import React, { useState } from 'react';
import './zohoheader.scss'; // Import the SCSS file

const ZohoHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="header">
      <div className="menu">
        <a href="/zoho" className="menu-item">Dashboard</a>
        <a href="/zoho/dashboard" className="menu-item">Job Openings</a>
        <a href="/zoho/dashboard" className="menu-item">Candidates</a>
        <a href="/zoho/dashboard" className="menu-item">Interviews</a>
        <a href="/zoho/dashboard" className="menu-item">Clients</a>
      </div>
      <div className="plus-menu" onClick={toggleDropdown}>
        +
        {dropdownVisible && (
          <div className="dropdown-content">
            <a href="/zoho/dashboard">Job Openings</a>
            <a href="/zoho/dashboard">Candidates</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZohoHeader;
