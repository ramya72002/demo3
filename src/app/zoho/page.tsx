'use client'; // Add this if you're using Next.js with the app directory

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import './zoho.scss';
import ZohoHeader from '../zohoheader/page';
import HiringPipeline from './HiringPipeline';
import ClientSummary from './ClientSummary';
import JobOpeningSummary from './JobOpeningSummary';
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

          <HiringPipeline
              isExpanded={isExpanded.pipeline}
              toggleExpand={toggleExpand}
              candidateData={candidateData}
            />

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

            <ClientSummary
          isExpanded={isExpanded.sectionOne}
          toggleExpand={toggleExpand}
          activeCount={activeCount}
          inactiveCount={inactiveCount}
          totalCount={totalCount}
          filteredClientNames={filteredClientNames}
          clientJobs={clientJobs}
          handleClientFilter={handleClientFilter}
        />
      </div>

      <JobOpeningSummary
  jobData={jobData}
  activeJobCount={activeJobCount}
  inactiveJobCount={inactiveJobCount}
  totalJobCount={totalJobCount}
  isExpanded={isExpanded.pipeline}
  toggleExpand={() => toggleExpand('pipeline')}
/>


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
  );
};

export default Page;
