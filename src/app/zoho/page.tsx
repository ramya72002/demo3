'use client'; // Add this if you're using Next.js with the app directory

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import './zoho.scss';
import ZohoHeader from '../zohoheader/page';
import PerformanceBarChart from '../barchart/page';
import LineChart from '../linechart/page';

// Define interface for Candidate Data
interface CandidateData {
  Add_Job: string;
  job_stage: number;
  [key: string]: any; // You can expand this with more fields if needed
}
interface JobData {
  jobId:string;
  city:string;
  accountManager: string;
  clientName: string;
  contactName: string;
  industry: string;
  jobType: string;
  numberOfPositions: number;
  postingTitle: string;
  targetDate: string;
  jobOpeningStatus:string;
}

const Page = () => {
  type Section = 'pipeline' | 'ageOfJob' | 'sectionOne' | 'sectionTwo' | 'sectionThree' | 'newSection' | 'upcoming';

  const [isExpanded, setIsExpanded] = useState({
    pipeline: false,
    ageOfJob: false,
    sectionOne: false,
    sectionTwo: false,
    sectionThree: false,
    newSection: false,
    upcoming: false,
  });
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [candidateData, setCandidateData] = useState<{ [key: string]: CandidateData[] }>({});
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter(); // Use Next.js router for navigation
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://demo4-backendurl.vercel.app/hiringpipeline/details');
        const data = await response.json();
        setCandidateData(data); // Store the fetched data
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      }
    };
    
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://demo4-backendurl.vercel.app/jobs/getall');
        const data = await response.json();
        setJobData(data);

        // Calculate counts
        const activeJobs = data.filter((job: JobData) => job.jobOpeningStatus === 'Open').length;
        const inactiveJobs = data.filter((job: JobData) => job.jobOpeningStatus === 'Close').length;
        const totalJobs = data.length;

        setActiveCount(activeJobs);
        setInactiveCount(inactiveJobs);
        setTotalCount(totalJobs);
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
      total: candidates.length, // Total count of candidates
    };
  
    candidates.forEach((candidate: CandidateData) => {
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
  interface CandidateData {
    job_stage: number;
    name: string;
    // Add other properties if necessary
  }
  // Sample candidates array
  const candidates: CandidateData[] = [
    { name: 'Alice Smith', job_stage: 1 }, // Screening
    { name: 'Bob Johnson', job_stage: 2 }, // Submissions
    { name: 'Carol Williams', job_stage: 3 }, // Interview
    { name: 'David Brown', job_stage: 4 }, // Offered
    { name: 'Eva Davis', job_stage: 5 }, // Hired
    { name: 'Frank Miller', job_stage: 6 }, // Rejected
    { name: 'Grace Wilson', job_stage: 7 }, // Archived
    { name: 'Henry Moore', job_stage: 1 }, // Screening
    { name: 'Ivy Taylor', job_stage: 2 }, // Submissions
    { name: 'Jack Anderson', job_stage: 3 }, // Interview
  ];
// Get the stage counts
const stageCounts = getCandidateStageCounts(candidates);

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
                    <span>New</span>
                    <span>Interview</span>
                    <span>Available</span>
                    <span>Engaged</span>
                    <span>Offered</span>
                    <span>Hired</span>
                    <span>Rejected</span>
                  </div>
                </div>

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
                      </div>
                    </div>
                  );
                })}

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

            {/* New Section One */}
            <div className={`box ${isExpanded.sectionOne ? 'expanded' : ''}`}>
              <div className="sectionHeader">
                <h2>Client Summary</h2>
                <button className="expandButton" onClick={() => toggleExpand('sectionOne')}>
                  {isExpanded.sectionOne ? '↘' : '↗'}
                </button>
              </div>
              <div className="client-summary">
                  <div className="client-card">
                      <div className="client-info-box">
                          <span className="client-number3">50</span>
                          <span className="client-label">Active Clients</span>
                      </div>
                  </div>
                  <div className="client-card">
                      <div className="client-info-box">
                          <span className="client-number1">20</span>
                          <span className="client-label">Inactive Clients</span>
                      </div>
                  </div>
                  <div className="client-card">
                      <div className="client-info-box">
                          <span className="client-number2">70</span>
                          <span className="client-label">Total Clients</span>
                      </div>
                  </div>
              </div>

              {/* <!-- Table for Data --> */}
                <table className="client-data">
                    <thead>
                        <tr>
                            <th>Client ID</th>
                            <th>Agency</th>
                            <th>Client Manager</th>
                            <th>Client Name</th>
                            <th>Contact Person 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>Agency A</td>
                            <td>John Doe</td>
                            <td>Client A</td>
                            <td>Jane Smith</td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>Agency B</td>
                            <td>Emily Davis</td>
                            <td>Client B</td>
                            <td>Robert Johnson</td>
                        </tr>
                        <tr>
                            <td>003</td>
                            <td>Agency C</td>
                            <td>Michael Lee</td>
                            <td>Client C</td>
                            <td>Alice White</td>
                        </tr>
                        <tr>
                            <td>004</td>
                            <td>Agency D</td>
                            <td>Sarah Green</td>
                            <td>Client D</td>
                            <td>David Brown</td>
                        </tr>
                        <tr>
                            <td>005</td>
                            <td>Agency E</td>
                            <td>Chris Black</td>
                            <td>Client E</td>
                            <td>Linda Blue</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            {/* New Section Two */}
            <div className={`box ${isExpanded.sectionTwo ? 'expanded' : ''}`}>
      <div className="sectionHeader">
        <h2>Job Opening Summary</h2>
        <button className="expandButton" onClick={() => setIsExpanded(prev => ({ ...prev, sectionTwo: !prev.sectionTwo }))}>
          {isExpanded.sectionTwo ? '↘' : '↗'}
        </button>
      </div>
      <div className="client-summary">
        <div className="client-card">
          <div className="client-info-box">
          <span
  className="client-number3"
  onClick={() => window.location.href = '/zoho/jobopenings?jobOpeningStatus=Open'}
>
  {activeCount}
</span>

            <span className="client-label">Active Job Openings</span>
          </div>
        </div>
        <div className="client-card">
          <div className="client-info-box">
            <span className="client-number1"
            onClick={() => window.location.href = '/zoho/jobopenings?jobOpeningStatus=Close'}>{inactiveCount} </span>
            <span className="client-label">Inactive Job Openings</span>
          </div>
        </div>
        <div className="client-card">
          <div className="client-info-box">
            <span className="client-number2"
                        onClick={() => window.location.href = '/zoho/jobopenings'}>
 {totalCount}</span>
            <span className="client-label">Total Job Openings</span>
          </div>
        </div>
      </div>
      <table className="client-data">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Posting Title</th>
            <th>Client Name</th>
            <th>Target Date</th>
            <th>Job Opening Status</th>
            <th>City</th>
            <th>Client Manager</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map(job => (
            <tr key={job.jobId}>
              <td>{job.jobId}</td>
              <td>{job.postingTitle}</td>
              <td>{job.clientName}</td>
              <td>{job.targetDate}</td>
              <td>{job.jobOpeningStatus}</td>
              <td>{job.city || 'N/A'}</td>
              <td>{job.accountManager || 'N/A'}</td>
              <td>{job.jobOpeningStatus === 'Open' ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

            {/* New Section Three */}
    <div className={`box ${isExpanded.sectionThree ? 'expanded' : ''}`}>
        <div className="sectionHeader">
          <h2>Candidate Summary</h2>
          <button className="expandButton" onClick={() => toggleExpand('sectionThree')}>
            {isExpanded.sectionThree ? '↘' : '↗'}
          </button>
        </div>
        <div className="sectionContent">
          <div className="summary-grid">
            {['Screening', 'Submissions', 'Interview', 'Offered', 'Hired', 'Rejected', 'Total'].map((header, index) => (
              <div className="summary-item" key={index}>
                <p className="header-text">{header}</p>
                <div className="summary-box">
                  <span>
                  {
                        header === 'Screening' ? stageCounts.screening ?? 0 :
                        header === 'Submissions' ? stageCounts.submissions ?? 0 :
                        header === 'Interview' ? stageCounts.interview ?? 0 :
                        header === 'Offered' ? stageCounts.offered ?? 0 :
                        header === 'Hired' ? stageCounts.hired ?? 0 :
                        header === 'Rejected' ? stageCounts.rejected ?? 0 :
                        header === 'Total' ? stageCounts.total ?? 0 : ''
                      }

                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
                <div className={`box ${isExpanded.newSection ? 'expanded' : ''}`}>
              <div className="sectionHeader">
                <h2>Weekly Performance</h2> {/* Replace with your section title */}
                <button className="expandButton" onClick={() => toggleExpand('newSection')}>
                  {isExpanded.newSection ? '↘' : '↗'}
                </button>
              </div>
                    <div className='bar'>
                      <PerformanceBarChart /> 
                    </div>
                    
            </div><LineChart />

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
