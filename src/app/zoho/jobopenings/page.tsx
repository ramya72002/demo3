'use client';
import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import './jobopenings.scss';

// Updated Job interface
interface Job {
  jobId: string;
  postingTitle: string;
  clientManager: string;
  targetDate: string;
  jobOpeningStatus: string;
  city: string;
  clientName: string;
  accountManager?: string;  // Optional, as it's not in the provided data
}

const JobOpenings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); 
  const [newStatus, setNewStatus] = useState<string>(''); 

  // Fetch all jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get<Job[]>('http://127.0.0.1:80/jobs/getall');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job openings:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobClick = async (postingTitle: string, clientName: string) => {
    try {
      const response = await axios.get('http://127.0.0.1:80/zoho/getjob', {
        params: { postingTitle, clientName }
      });
      setSelectedJob(response.data[0]);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  // Function to handle status change
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setNewStatus(newStatus);

    if (selectedJob && newStatus) {
      try {
        // Call API to update job status
        const response = await axios.post('http://127.0.0.1:80/zoho/updatejobstatus', {
          jobId: selectedJob.jobId,
          newStatus,
        });
        
        if (response.status === 200) {
          alert('Job status updated successfully');
          setSelectedJob((prev) => prev ? { ...prev, jobOpeningStatus: newStatus } : null);
          await fetchJobs();  // Refresh the table with updated data
        }
      } catch (error) {
        console.error('Error updating job status:', error);
        alert('Failed to update job status');
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
              <tr key={index} onClick={() => handleJobClick(job.postingTitle, job.clientName)}>
          
                <td>{job.jobId}</td>
                <td>{job.postingTitle}</td>
                <td>{job.clientManager}</td>
                <td>{job.targetDate}</td>
                <td>{job.jobOpeningStatus}</td>
                <td>{job.city}</td>
                <td>{job.clientName}</td>
                <td>{job.accountManager || 'N/A'}</td> {/* Show 'N/A' if accountManager is not provided */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <div className="jobDetails">
          <h2>Job Details</h2>
          <p><strong>Job ID:</strong> {selectedJob.jobId}</p>
          <p><strong>Posting Title:</strong> {selectedJob.postingTitle}</p>
          <p><strong>Client Manager:</strong> {selectedJob.clientManager}</p>
          <p><strong>Target Date:</strong> {selectedJob.targetDate}</p>
          <p><strong>Job Opening Status:</strong> 
            <select value={newStatus || selectedJob.jobOpeningStatus} onChange={handleStatusChange}>
              <option value="">Select</option>
              <option>Open</option>
              <option>Closed</option>
              <option>Pending</option>
              <option>Filled</option>
              <option>On Hold</option>
              <option>Expired</option>
              <option>Interviewing</option>
              <option>Offer Extended</option>
              <option>Rejected</option>
            </select>
          </p>
          <p><strong>City:</strong> {selectedJob.city}</p>
          <p><strong>Client Name:</strong> {selectedJob.clientName}</p>
          <p><strong>Account Manager:</strong> {selectedJob.accountManager || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default JobOpenings;
