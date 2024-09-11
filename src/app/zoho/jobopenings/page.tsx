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
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  // Function to handle job details update
  const handleSave = async (updatedJob: Partial<Job>) => {
    if (selectedJob) {
      try {
        // Create a new object excluding the '_id' field
        const { _id, ...updateData } = updatedJob;

        // Call PUT API to update job details
        const response = await axios.put(`https://demo4-backendurl.vercel.app/job/update/${selectedJob.jobId}`, updateData);

        if (response.status === 200) {
          alert('Job updated successfully');
          await fetchJobs(); // Refresh the table with updated data
          setSelectedJob(null); // Close the details view
        }
      } catch (error) {
        console.error('Error updating job details:', error);
        alert('Failed to update job details');
      }
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
              <th>Job Opening Status</th>
              <th>City</th>
              <th>Client Name</th>
              <th>Account Manager</th>
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
                <td>{job.jobOpeningStatus}</td>
                <td>{job.city}</td>
                <td>{job.clientName}</td>
                <td>{job.accountManager || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default JobOpenings;
