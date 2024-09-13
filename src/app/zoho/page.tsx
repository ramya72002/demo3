'use client'; // Add this if you're using Next.js with the app directory

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import './zoho.scss';
import ZohoHeader from '../zohoheader/page';
import HiringPipeline from './HiringPipeline';
import ClientSummary from './ClientSummary';
import JobOpeningSummary from './JobOpeningSummary';
import AgeOfJobSection from './AgeOfJobSection';
// import PerformanceBarChart from '../barchart/page';
// import LineChart from '../linechart/page';

interface CandidateData {
  Add_Job: string;
  job_stage: number;
  [key: string]: any;
}
interface JobData {
  jobId: string;
  location: string;
  accountManager: string;
  clientName: string;
  contactName: string;
  industry: string;
  jobType: string;
  numberOfPositions: number;
  jobOpening: string;
  targetDate: string;
  jobOpeningStatus: string;
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
  const [filterType, setFilterType] = useState<'active' | 'inactive' | 'all'>('all');
  const router = useRouter();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://demo4-backendurl.vercel.app/zoho/getclient_jobs');
        const data = await response.json();
        console.log(data);
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
        const totalJobs = activeJobs + inactiveJobs;

        const activeJobCount = data.filter((job: JobData) => job.jobOpeningStatus === 'Open').length;
        const inactiveJobCount = data.filter((job: JobData) => job.jobOpeningStatus === 'Close').length;
        const totalJobscount = activeJobCount + inactiveJobCount;

        setActiveCount(activeJobs);
        setInactiveCount(inactiveJobs);
        setTotalCount(totalJobs);
        setActiveJobCount(activeJobCount);
        setInactiveJobCount(inactiveJobCount);
        setTotalJobCount(totalJobscount);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchCandidates();
    fetchJobs();
  }, []);

  const toggleExpand = (section: Section) => {
    setIsExpanded(prevState => ({
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
    const clientStatus: { [key: string]: boolean } = {};

    jobs.forEach(job => {
      if (!clientJobs[job.clientName]) {
        clientJobs[job.clientName] = [];
      }
      clientJobs[job.clientName].push({
        jobOpening: job.jobOpening,
        jobOpeningStatus: job.jobOpeningStatus,
      });

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

            <AgeOfJobSection
              jobData={jobData}
              isExpanded={isExpanded.ageOfJob}
              toggleExpand={() => toggleExpand('ageOfJob')}
              calculateJobAge={calculateJobAge}
            />

            <div className="client-job-summary">
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

              <JobOpeningSummary
                jobData={jobData}
                activeJobCount={activeJobCount}
                inactiveJobCount={inactiveJobCount}
                totalJobCount={totalJobCount}
                isExpanded={isExpanded.pipeline}
                toggleExpand={() => toggleExpand('pipeline')}
              />
            </div>

            <div className={`box ${isExpanded.sectionThree ? 'expanded' : ''}`}>
              <div className="sectionHeader">
                <h2>Candidate Summary</h2>
                <button className="expandButton" onClick={() => toggleExpand('sectionThree')}>
                  {isExpanded.sectionThree ? '↘' : '↗'}
                </button>
              </div>
            </div>

            <div className={`box ${isExpanded.newSection ? 'expanded' : ''}`}>
              <div className="sectionHeader">
                <h2>Weekly Performance</h2>
                <button className="expandButton" onClick={() => toggleExpand('newSection')}>
                  {isExpanded.newSection ? '↘' : '↗'}
                </button>
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
