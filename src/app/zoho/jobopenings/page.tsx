'use client'; // This ensures the entire component is client-side
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Client-side hook
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import JobDetails from './jobDetails';
import './jobopenings.scss';
import { Job } from '../../types';

const JobOpeningsContent = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('');

  // Fetch all jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get<Job[]>('https://demo4-backendurl.vercel.app/jobs/getall');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job openings:', error);
    }
  };

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

  const filteredJobs = filterStatus
    ? jobs.filter(job => job.jobOpeningStatus === filterStatus)
    : jobs;

  return (
    <div>
      <ZohoHeader />
      <h1>Job Openings</h1>

      <div className="filter-container">
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

      <div className="jobTable">
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Posting Title</th>
              <th>Client Manager</th>
              <th>Target Date</th>
              <th>City</th>
              <th>Client Name</th>
              <th>Account Manager</th>
              <th>Job Opening Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index}>
                <td className="clickable-jobId" onClick={() => handleJobClick(job.jobId)}>
                  {job.jobId}
                </td>
                <td>{job.postingTitle}</td>
                <td>{job.clientManager}</td>
                <td>{job.targetDate}</td>
                <td>{job.city}</td>
                <td>{job.clientName}</td>
                <td>{job.accountManager || 'N/A'}</td>
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

const JobOpenings = () => {
  const searchParams = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<string>('');

  useEffect(() => {
    const queryStatus = searchParams.get('jobOpeningStatus');
    if (queryStatus) {
      setFilterStatus(queryStatus);
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobOpeningsContent />
    </Suspense>
  );
};

export default JobOpenings;
