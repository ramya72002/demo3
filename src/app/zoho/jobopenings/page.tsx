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
  const [jobOpeningStatus, setJobOpeningStatus] = useState<string>(''); // For dropdown status handling

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
  }, []);

  // Function to handle job ID click
  const handleJobClick = async (jobId: string) => {
    try {
      const response = await axios.get<Job[]>(`https://demo4-backendurl.vercel.app/zoho/getjob_id?jobId=${jobId}`);
      const job = response.data[0]; // Access the first element of the array
      setSelectedJob(job);
      setJobOpeningStatus(job.jobOpeningStatus); // Set current status in state
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

  return (
    <div>
      <ZohoHeader />
      <h1>Job Openings</h1>
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
            {jobs.map((job, index) => (
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
         // Ensure jobOpeningStatus has a fallback value if undefined
onSave={(updatedJob) => handleStatusChange(selectedJob.jobId, updatedJob.jobOpeningStatus ?? 'Open')}

        />
      )}
    </div>
  );
};

export default JobOpenings;
