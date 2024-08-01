'use client'
import React, { useState } from 'react';
import Joblist from '../joblist/page';
import './opportunities.scss';

const Opportunities = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (filter:any) => {
    setActiveFilter(filter);
  };

  return (
    <div className="opportunities">
      <h1 className="quote">Find the job that fits your life.</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          className="search-input"
        />
        <input
          type="text"
          placeholder="Mumbai, Maharashtra"
          className="location-input"
        />
        <button className="search-button">Find jobs</button>
      </div>
      <div className="filters">
        {['Work Mode', 'Sub-Domain', 'Location', 'Experience', 'Sector', 'Skills'].map(filter => (
          <button
            key={filter}
            className={activeFilter === filter ? 'active' : ''}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <Joblist />
    </div>
  );
};

export default Opportunities;
