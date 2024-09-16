'use client';
import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import JobDetails from './jobDetails'; // Import the new JobDetails component
import './jobopenings.scss';
import { Job } from '../../types';

const JobOpenings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>(''); 
  const [filterJobOpening, setFilterJobOpening] = useState<string>(''); 
  const [filterClientName, setFilterClientName] = useState<string>(''); 
  const [filterLocation, setFilterLocation] = useState<string>(''); 
  const [showFilter, setShowFilter] = useState<{ [key: string]: boolean }>({
    jobOpening: false,
    clientName: false,
    location: false,
    status: false,
  }); 

  const fetchJobs = async () => {
    try {
      const response = await axios.get<Job[]>('https://demo4-backendurl.vercel.app/jobs/getall');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job openings:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const queryStatus = urlParams.get('jobOpeningStatus');
      if (queryStatus) {
        setFilterStatus(queryStatus);
      }
    }
  }, []);

  const handleJobClick = async (jobId: string) => {
    try {
      const response = await axios.get<Job[]>(`https://demo4-backendurl.vercel.app/zoho/getjob_id?jobId=${jobId}`);
      const job = response.data[0]; 
      setSelectedJob(job);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const response = await axios.put(
        `https://demo4-backendurl.vercel.app/job/update_job_opening_status/${jobId}`,
        { jobOpeningStatus: newStatus }
      );
      if (response.status === 200) {
        alert('Job status updated successfully');
        await fetchJobs();
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status');
    }
  };

  const toggleFilter = (key: string) => {
    setShowFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filterStatus === '' || job.jobOpeningStatus === filterStatus) &&
      (filterJobOpening === '' || (job.jobOpening && job.jobOpening.toLowerCase().includes(filterJobOpening.toLowerCase()))) &&
      (filterClientName === '' || (job.clientName && job.clientName.toLowerCase().includes(filterClientName.toLowerCase()))) &&
      (filterLocation === '' || (job.location && job.location.toLowerCase().includes(filterLocation.toLowerCase())))
    );
  });

  return (
    <div>
      <ZohoHeader />
      <h1>Job Openings</h1>
      <div className="jobTable">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Job Opening
                <span className="filter-icon" onClick={() => toggleFilter('jobOpening')}>🔍</span>
                {showFilter.jobOpening && (
                  <input
                    type="text"
                    placeholder="Filter by Job Opening"
                    value={filterJobOpening}
                    onChange={(e) => setFilterJobOpening(e.target.value)}
                    className="filter-input"
                  />
                )}
              </th>
              <th>
                Client Name
                <span className="filter-icon" onClick={() => toggleFilter('clientName')}>🔍</span>
                {showFilter.clientName && (
                  <input
                    type="text"
                    placeholder="Filter by Client Name"
                    value={filterClientName}
                    onChange={(e) => setFilterClientName(e.target.value)}
                    className="filter-input"
                  />
                )}
              </th>
              <th>
                Location
                <span className="filter-icon" onClick={() => toggleFilter('location')}>🔍</span>
                {showFilter.location && (
                  <input
                    type="text"
                    placeholder="Filter by Location"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="filter-input"
                  />
                )}
              </th>
              <th>Client Manager</th>
              <th>Account Manager</th>
              <th>Target Date</th>
              <th>
                Status
                <span className="filter-icon" onClick={() => toggleFilter('status')}>🔍</span>
                {showFilter.status && (
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All</option>
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>
                  </select>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index}>
                <td className="clickable-jobId" onClick={() => handleJobClick(job.jobId)}>
                  {job.jobId}
                </td>
                <td>{job.jobOpening}</td>
                <td>{job.clientName}</td>
                <td>{job.location}</td>
                <td>{job.clientManager}</td>
                <td>{job.accountManager || 'N/A'}</td>
                <td>{job.targetDate}</td>
                <td>
                  <select
                    value={job.jobOpeningStatus ?? ''}
                    onChange={(e) => handleStatusChange(job.jobId, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSave={(updatedJob) => handleStatusChange(selectedJob.jobId, updatedJob.jobOpeningStatus ?? 'Open')}
        />
      )}
    </div>
  );
};

export default JobOpenings;
