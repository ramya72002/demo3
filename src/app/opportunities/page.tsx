'use client'
import React, { useState } from 'react';
import Joblist from '../joblist/page';
import './opportunities.scss';

type Filters = {
  WorkMode: string;
  SubDomain: string;
  Location: string;
  Experience: string;
  Sector: string;
  Skills: string;
};

const Opportunities = () => {
  const [filters, setFilters] = useState<Filters>({
    WorkMode: '',
    SubDomain: '',
    Location: '',
    Experience: '',
    Sector: '',
    Skills: '',
  });

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filterOptions: Record<keyof Filters, string[]> = {
    WorkMode: ['Remote', 'On-site', 'Hybrid'],
    SubDomain: ['Frontend', 'Backend', 'Fullstack'],
    Location: ['Mumbai', 'Pune', 'Bangalore'],
    Eexperience: ['Fresher', '1-3 years', '3-5 years', '5+ years'],
    Sector: ['IT', 'Healthcare', 'Finance'],
    Skills: ['React', 'Node.js', 'Python'],
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
        {Object.keys(filterOptions).map(filterName => (
          <select
            key={filterName}
            value={filters[filterName as keyof Filters]}
            onChange={e => handleFilterChange(filterName as keyof Filters, e.target.value)}
            className={filters[filterName as keyof Filters] ? 'active' : ''}
          >
            <option value="">{filterName}</option>
            {filterOptions[filterName as keyof Filters].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
      <Joblist />
    </div>
  );
};

export default Opportunities;
