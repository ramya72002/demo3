'use client'; // Add this if you're using Next.js with the app directory

import React, { useState, useEffect } from 'react';
import './zoho.scss';
import ZohoHeader from '../zohoheader/page';

// Define interface for Job Data
interface JobData {
  accountManager: string;
  clientName: string;
  contactName: string;
  industry: string;
  jobType: string;
  numberOfPositions: number;
  postingTitle: string;
  targetDate: string;
}

const Page = () => {
  // Define the type for the state keys
  type Section = 'pipeline' | 'ageOfJob' | 'upcoming';

  const [isExpanded, setIsExpanded] = useState({
    pipeline: false,
    ageOfJob: false,
    upcoming: false,
  });

  // State to store fetched job data
  const [jobData, setJobData] = useState<JobData[]>([]);

  // Fetch job data from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://demo4-backend.vercel.app/jobs/getall');
        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    
    fetchJobs();
  }, []);

  // Ensure the section argument is typed properly
  const toggleExpand = (section: Section) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Function to calculate the age of the job in days
  const calculateJobAge = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const today = new Date().getTime();
    const difference = Math.floor((today - target) / (1000 * 3600 * 24));
    return difference >= 0 ? difference : 0;
  };

  return (
    <div>
      <ZohoHeader />
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
                {jobData.length > 0 ? (
  <table className="jobTable">
    <thead>
      <tr>
        <th>Job Opening</th>
        <th>No of positions</th>
        <th>Age of opened jobs</th>
        <th>Delay [IN DAYS]</th>
      </tr>
    </thead>
    <tbody>
      {jobData.map((job, index) => (
        <tr key={index}>
          <td>{job.postingTitle || 'N/A'}</td>
          <td>{job.numberOfPositions}</td>
          <td>{calculateJobAge(job.targetDate)}</td>
          <td>0</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No records found</p>
)}

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
