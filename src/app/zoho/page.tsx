'use client'; // Add this if you're using Next.js with the app directory

import React, { useState } from 'react';
import './zoho.scss';

const Page = () => {
  // Define the type for the state keys
  type Section = 'pipeline' | 'ageOfJob' | 'upcoming';

  const [isExpanded, setIsExpanded] = useState({
    pipeline: false,
    ageOfJob: false,
    upcoming: false,
  });

  // Ensure the section argument is typed properly
  const toggleExpand = (section: Section) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div>
      <div className="container">
        <div className="scrollable-content">
          <div className="box-container">
            
            {/* Hiring Pipeline Section */}
            <div className={`box ${isExpanded.pipeline ? 'expanded' : ''}`}>
              <div className="pipelineHeader">
                <h1>Hiring Pipeline</h1>
                <button className="expandButton" onClick={() => toggleExpand('pipeline')}>
                {isExpanded.pipeline ? '↘' : '↗'}
                </button>
              </div>
              <div className="pipeline">
              <div className="headerRow">
                  <span className="title">Posting Title / Client Name</span>
                  <div className="stages">
                    <span>Screening</span>
                    <span>Submissions</span>
                    <span>Interview</span>
                    <span>Offered</span>
                    <span>Hired</span>
                    <span>Rejected</span>
                    <span>Archived</span>
                  </div>
                </div>
                <div className="pipelineRow">
                  <div className="clientInfo">
                    <span className="recruiter">recruiter (2)/</span>
                    <span className="clientName">HR frontiers</span>
                  </div>
                  <div className="interviewStage">
                    <span className="interviewCount">2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Age of Job Section */}
            <div className={`box ${isExpanded.ageOfJob ? 'expanded' : ''}`}>
              <div className="timeToFillHeader">
                <h2>Age of Job</h2>
                <button className="expandButton" onClick={() => toggleExpand('ageOfJob')}>
                {isExpanded.ageOfJob ? '↘' : '↗'}
                </button>
              </div>
                <div className="timeToFill">
                  <div className="filter-buttons">
                    <button className="filterButton">Job Opening</button>
                    <button className="filterButton">Department</button>
                  </div>
                  <p>No records found</p>
                </div>
            </div>

            {/* Upcoming Section */}
            <div className={`box ${isExpanded.upcoming ? 'expanded' : ''}`}>
              <div className="timeToHireHeader">
                <h2>Upcoming</h2>
                <button className="expandButton" onClick={() => toggleExpand('upcoming')}>
                {isExpanded.upcoming ? '↘' : '↗'}
                </button>
              </div>
              <div className="timeToHire">
                  <div className="filter-buttons">
                    <button className="filterButton">Candidate</button>
                    <button className="filterButton">Department</button>
                  </div>
                  <p>No records found</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
