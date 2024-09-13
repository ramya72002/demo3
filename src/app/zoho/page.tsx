'use client'; // Add this if you're using Next.js with the app directory

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import './zoho.scss';
import ZohoHeader from '../zohoheader/page';
// import PerformanceBarChart from '../barchart/page';
// import LineChart from '../linechart/page';

// Define interface for Candidate Data
interface CandidateData {
  Add_Job: string;
  job_stage: number;
  [key: string]: any; // You can expand this with more fields if needed
}
interface JobData {
  jobId:string;
  location:string;
  accountManager: string;
  clientName: string;
  contactName: string;
  industry: string;
  jobType: string;
  numberOfPositions: number;
  jobOpening: string;
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
  const [candidateData, setCandidateData] = useState<{ [key: string]: any }>({});
    const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [activeJobCount, setActiveJobCount] = useState(0);
  const [inactiveJobCount, setInactiveJobCount] = useState(0);
  const [totalJobCount, setTotalJobCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filterType, setFilterType] = useState<'active' | 'inactive' | 'all'>('all'); // State to track filter type
  const router = useRouter(); // Use Next.js router for navigation
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://demo4-backendurl.vercel.app/zoho/getclient_jobs');
        const data = await response.json();
        console.log(data); // Check the structure of the fetched data
        setCandidateData(data);
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      }
    };
 
    
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://demo4-backendurl.vercel.app/jobs/getall');
        const data = await response.json();
        setJobData(data);

        const { clientJobs, clientStatus } = processJobData(data);

        const activeJobs = Object.values(clientStatus).filter(isActive => isActive).length;
        const inactiveJobs = Object.keys(clientStatus).filter(clientName => !clientStatus[clientName]).length;
        const totalJobs = activeJobs+inactiveJobs;

        // Calculate job status counts
        const activeJobCount = data.filter((job: JobData) => job.jobOpeningStatus === 'Open').length;
        const inactiveJobCount = data.filter((job: JobData) => job.jobOpeningStatus === 'Close').length;
        const totalJobscount = activeJobCount+inactiveJobCount;


        setActiveCount(activeJobs);
        setInactiveCount(inactiveJobs);
        setTotalCount(totalJobs);
        setActiveJobCount(activeJobCount);
        setInactiveJobCount(inactiveJobCount);
        setTotalJobCount(totalJobscount)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchCandidates();
    fetchJobs();
  }, []);

   

  const getCandidateStageCounts = (candidates: { candidateStage: string }[]) => {
    const stageCounts = {
      new: 0,
      inreview: 0,
      available: 0,
      engaged: 0,
      offered: 0,
      hired: 0,
      rejected: 0,
    };
  
    candidates.forEach((candidate) => {
      switch (candidate.candidateStage) {
        case 'new':
          stageCounts.new += 1;
          break;
        case 'inreview':
          stageCounts.inreview += 1;
          break;
        case 'available':
          stageCounts.available += 1;
          break;
        case 'engaged':
          stageCounts.engaged += 1;
          break;
        case 'offered':
          stageCounts.offered += 1;
          break;
        case 'hired':
          stageCounts.hired += 1;
          break;
        case 'rejected':
          stageCounts.rejected += 1;
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
  ];
// Get the stage counts
 
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
  const processJobData = (jobs: JobData[]) => {
    const clientJobs: { [key: string]: { jobOpening: string; jobOpeningStatus: string }[] } = {};
    const clientStatus: { [key: string]: boolean } = {}; // Track if a client is active
  
    jobs.forEach(job => {
      if (!clientJobs[job.clientName]) {
        clientJobs[job.clientName] = [];
      }
      clientJobs[job.clientName].push({
        jobOpening: job.jobOpening,
        jobOpeningStatus: job.jobOpeningStatus,
      });
  
      // Determine if the client is active
      if (job.jobOpeningStatus === 'Open') {
        clientStatus[job.clientName] = true;
      } else {
        clientStatus[job.clientName] = clientStatus[job.clientName] || false;
      }
    });
  
    return { clientJobs, clientStatus };
  };
  const handleClientFilter = (filter: 'active' | 'inactive' | 'all') => {
    setFilterType(filter);
  };

  const { clientJobs, clientStatus } = processJobData(jobData);
  
  const filteredClientNames = filterType === 'all' 
    ? Object.keys(clientJobs)
    : Object.keys(clientStatus).filter(clientName =>
        filterType === 'active' ? clientStatus[clientName] : !clientStatus[clientName]
    );



  return (
    <div>
      <ZohoHeader />
      <div className="container">
        <div className="scrollable-content">
          <div className="box-container">

            {/* Hiring Pipeline Section */}
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
      <span className="title">Job Opening / Client Name</span>
      <div className="stages">
        <span>New</span>
        <span>In Review</span>
        <span>Available</span>
        <span>Engaged</span>
        <span>Offered</span>
        <span>Hired</span>
        <span>Rejected</span>
      </div>
    </div>

    {Object.keys(candidateData).map((clientKey) => (
      <div key={clientKey} className="clientSection">
        {Object.keys(candidateData[clientKey]).map((jobKey) => {
          const candidates = candidateData[clientKey][jobKey];
          const stageCounts = getCandidateStageCounts(candidates);

          return (
            <div key={jobKey} className="jobSection">
             
              <div className="stages">
                <h3>{clientKey}/{jobKey}</h3>
                <span className="stageCount new">{stageCounts.new}</span>
                <span className="stageCount inreview">{stageCounts.inreview}</span>
                <span className="stageCount available">{stageCounts.available}</span>
                <span className="stageCount engaged">{stageCounts.engaged}</span>
                <span className="stageCount offered">{stageCounts.offered}</span>
                <span className="stageCount hired">{stageCounts.hired}</span>
                <span className="stageCount rejected">{stageCounts.rejected}</span>
              </div>
            </div>
          );
        })}
      </div>
    ))}
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
                          <td>{job.jobOpening || 'N/A'}</td>
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
                
                <div className="client-card" onClick={() => handleClientFilter('active')}>
                  <div className="client-info-box">
                    <span className="client-number3">{activeCount}</span>
                    <span className="client-label">Active Clients</span>
                  </div>
                </div>
                <div className="client-card" onClick={() => handleClientFilter('inactive')}>
                  <div className="client-info-box">
                    <span className="client-number1">{inactiveCount}</span>
                    <span className="client-label">Inactive Clients</span>
                  </div>
                </div>
                <div className="client-card" onClick={() => handleClientFilter('all')}>
                  <div className="client-info-box">
                    <span className="client-number2">{totalCount}</span>
                    <span className="client-label">All Clients</span>
                  </div>
                </div>
              </div>
              <table className="client-data">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Posting Title</th>
                    <th>Job Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClientNames.length === 0 ? (
                    <tr>
                      <td colSpan={3}>No data available</td>
                    </tr>
                  ) : (
                    filteredClientNames.map(clientName => 
                      clientJobs[clientName].map((job, index) => (
                        <tr key={`${clientName}-${index}`}>
                          <td>{clientName}</td>
                          <td>{job.jobOpening}</td>
                          <td>{job.jobOpeningStatus}</td>
                        </tr>
                      ))
                    )
                  )}
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
  {activeJobCount}
</span>

            <span className="client-label">Active Job Openings</span>
          </div>
        </div>
        <div className="client-card">
          <div className="client-info-box">
            <span className="client-number1"
            onClick={() => window.location.href = '/zoho/jobopenings?jobOpeningStatus=Close'}>{inactiveJobCount} </span>
            <span className="client-label">Inactive Job Openings</span>
          </div>
        </div>
        <div className="client-card">
          <div className="client-info-box">
            <span className="client-number2"
                        onClick={() => window.location.href = '/zoho/jobopenings'}>
 {totalJobCount}</span>
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
            <th>location</th>
            <th>Client Manager</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map(job => (
            <tr key={job.jobId}>
              <td>{job.jobId}</td>
              <td>{job.jobOpening}</td>
              <td>{job.clientName}</td>
              <td>{job.targetDate}</td>
              <td>{job.jobOpeningStatus}</td>
              <td>{job.location || 'N/A'}</td>
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
        {/* <div className="sectionContent">
  <div className="summary-grid">
    {['new', 'inreview', 'available', 'engaged', 'Offered', 'Hired', 'Rejected'].map((header, index) => (
      <div className="summary-item" key={index}>
        <p className="header-text">{header}</p>
        <div className="summary-box">
          <span>
            {
              header === 'new' ? stageCounts.new ?? 0 :
              header === 'inreview' ? stageCounts.inreview ?? 0 :
              header === 'available' ? stageCounts.available ?? 0 :
              header === 'engaged' ? stageCounts.engaged ?? 0 :
              header === 'offered' ? stageCounts.offered ?? 0 : // Ensure capitalization matches
              header === 'hired' ? stageCounts.hired ?? 0 :    // Ensure capitalization matches
              header === 'rejected' ? stageCounts.rejected ?? 0 : 0 // Ensure capitalization matches
            }
          </span>
        </div>
      </div>
    ))}
  </div>
</div> */}

    </div>
                <div className={`box ${isExpanded.newSection ? 'expanded' : ''}`}>
              <div className="sectionHeader">
                <h2>Weekly Performance</h2> {/* Replace with your section title */}
                <button className="expandButton" onClick={() => toggleExpand('newSection')}>
                  {isExpanded.newSection ? '↘' : '↗'}
                </button>
              </div>
                    {/* <div className='bar'>
                      <PerformanceBarChart /> 
                    </div>
                    
            <LineChart /> */}

            {/* Upcoming Section */}
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
