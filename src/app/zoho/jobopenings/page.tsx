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
  const [filterStatus, setFilterStatus] = useState<string>(''); // For filtering jobs by status
  const [filterJobOpening, setFilterJobOpening] = useState<string>(''); // For filtering jobs by job opening
  const [filterClientName, setFilterClientName] = useState<string>(''); // For filtering jobs by client name
  const [filterLocation, setFilterLocation] = useState<string>(''); // For filtering jobs by location

  // Fetch all jobs from the backend
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

    // Ensure window is defined before accessing it
    if (typeof window !== 'undefined') {
      // Extract query parameter for jobOpeningStatus using URLSearchParams
      const urlParams = new URLSearchParams(window.location.search);
      const queryStatus = urlParams.get('jobOpeningStatus');
      if (queryStatus) {
        setFilterStatus(queryStatus);
      }
    }
  }, []);

  // Function to handle job ID click
  const handleJobClick = async (jobId: string) => {
    try {
      const response = await axios.get<Job[]>(`https://demo4-backendurl.vercel.app/zoho/getjob_id?jobId=${jobId}`);
      const job = response.data[0]; // Access the first element of the array
      setSelectedJob(job);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  // Function to handle status change
  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const response = await axios.put(
        `https://demo4-backendurl.vercel.app/job/update_job_opening_status/${jobId}`,
        { jobOpeningStatus: newStatus }
      );

      if (response.status === 200) {
        alert('Job status updated successfully');
        await fetchJobs(); // Refresh the table with updated data
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status');
    }
  };

  // Filter jobs based on selected status, job opening, client name, and location
  const filteredJobs = jobs.filter((job) => {
    return (
      (filterStatus === '' || job.jobOpeningStatus === filterStatus) &&
      (filterJobOpening === '' || job.jobOpening.toLowerCase().includes(filterJobOpening.toLowerCase())) &&
      (filterClientName === '' || job.clientName.toLowerCase().includes(filterClientName.toLowerCase())) &&
      (filterLocation === '' || job.location.toLowerCase().includes(filterLocation.toLowerCase()))
    );
  });

  return (
    <div>
      <ZohoHeader />
      <h1>Job Openings</h1>

      {/* Filter Section */}
      <div className="filter-container">
        

        <div>
          <label htmlFor="jobOpeningFilter">Filter by Job Opening:</label>
          <input
            id="jobOpeningFilter"
            type="text"
            placeholder="Job Opening"
            value={filterJobOpening}
            onChange={(e) => setFilterJobOpening(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="clientNameFilter">Filter by Client Name:</label>
          <input
            id="clientNameFilter"
            type="text"
            placeholder="Client Name"
            value={filterClientName}
            onChange={(e) => setFilterClientName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="locationFilter">Filter by Location:</label>
          <input
            id="locationFilter"
            type="text"
            placeholder="Location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="Close">Close</option>
          </select>
        </div>
      </div>

      <div className="jobTable">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Job Opening</th>
              <th>Client Name</th>
              <th>Location</th>
              <th>Client Manager</th>
              <th>Account Manager</th>
              <th>Target Date</th> 
              <th>Status</th>
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
                    value={job.jobOpeningStatus ?? ''} // Default to an empty string if undefined
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
