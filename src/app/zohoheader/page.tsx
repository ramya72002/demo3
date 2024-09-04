import React from 'react';
import './zohoheader.scss'; // Import the SCSS file

const ZohoHeader = () => {
  return (
    <div className="header">
      <a href="/zoho/dashboard" className="menu-item">Dashboard</a>
      <a href="#" className="menu-item">Job Openings</a>
      <a href="#" className="menu-item">Candidates</a>
      <a href="#" className="menu-item">Interviews</a>
      <a href="#" className="menu-item">Clients</a>
    </div>
  );
};

export default ZohoHeader;
