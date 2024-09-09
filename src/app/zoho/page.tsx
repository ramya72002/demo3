'use client'; // Add this if you're using Next.js with the app directory

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import './zoho.scss';
import ZohoHeader from '../zohoheader/page';

// Define interface for Candidate Data
interface CandidateData {
  Add_Job: string;
  job_stage: number;
  [key: string]: any; // You can expand this with more fields if needed
}
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
  type Section = 'pipeline' | 'ageOfJob' | 'upcoming';

  const [isExpanded, setIsExpanded] = useState({
    pipeline: false,
    ageOfJob: false,
    upcoming: false,
  });
  const [jobData, setJobData] = useState<JobData[]>([]);

  const [candidateData, setCandidateData] = useState<{ [key: string]: CandidateData[] }>({});
  const router = useRouter(); // Use Next.js router for navigation

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/hiringpipeline/details');
        const data = await response.json();
        setCandidateData(data); // Store the fetched data
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      }
    };
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/jobs/getall');
        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchCandidates();
    fetchJobs();
  }, []);

  const getCandidateStageCounts = (candidates: CandidateData[]) => {
    const stageCounts = {
      screening: 0,
      submissions: 0,
      interview: 0,
      offered: 0,
      hired: 0,
      rejected: 0,
      archived: 0,
    };

    candidates.forEach((candidate) => {
      switch (candidate.job_stage) {
        case 1:
          stageCounts.screening += 1;
          break;
        case 2:
          stageCounts.submissions += 1;
          break;
        case 3:
          stageCounts.interview += 1;
          break;
        case 4:
          stageCounts.offered += 1;
          break;
        case 5:
          stageCounts.hired += 1;
          break;
        case 6:
          stageCounts.rejected += 1;
          break;
        case 7:
          stageCounts.archived += 1;
          break;
        default:
          break;
      }
    });

    return stageCounts;
  };

  // Navigate to the details page with the client key and job stage
  const handleStageClick = (clientKey: string, stage: string) => {
    const encodedClientKey = encodeURIComponent(clientKey);
    const encodedStage = encodeURIComponent(stage);
    router.push(`/details/${encodedClientKey}/${encodedStage}`);
  };

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

                {/* Render pipeline data for each client */}
                {Object.keys(candidateData).map((clientKey, index) => {
                  const stageCounts = getCandidateStageCounts(candidateData[clientKey]);

                  return (
                    <div className="pipelineRow" key={index}>
  <div className="clientInfo">
    <span className="recruiter">{clientKey}</span>
  </div>
  <div className="stages">
    <span
      className={`stageCount screening`}
      onClick={() => handleStageClick(clientKey, 'screening')}
    >
      {stageCounts.screening}
    </span>
    <span
      className={`stageCount submissions`}
      onClick={() => handleStageClick(clientKey, 'submissions')}
    >
      {stageCounts.submissions}
    </span>
    <span
      className={`stageCount interview`}
      onClick={() => handleStageClick(clientKey, 'interview')}
    >
      {stageCounts.interview}
    </span>
    <span
      className={`stageCount offered`}
      onClick={() => handleStageClick(clientKey, 'offered')}
    >
      {stageCounts.offered}
    </span>
    <span
      className={`stageCount hired`}
      onClick={() => handleStageClick(clientKey, 'hired')}
    >
      {stageCounts.hired}
    </span>
    <span
      className={`stageCount rejected`}
      onClick={() => handleStageClick(clientKey, 'rejected')}
    >
      {stageCounts.rejected}
    </span>
    <span
      className={`stageCount archived`}
      onClick={() => handleStageClick(clientKey, 'archived')}
    >
      {stageCounts.archived}
    </span>
  </div>
</div>

                  );
                })}

              </div>
            </div>

            {/* Other sections remain unchanged */}
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
