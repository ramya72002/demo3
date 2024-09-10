'use client';
import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import './jobopenings.scss';

// Updated Job interface
interface Job {
  companyName: string;
  status: string;
  postingTitle: string;
  experience: string;
  budget: string;
  noticePeriod: string;
  city: string;
  jd: string;  // job description
  address: string;
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

  const handleJobClick = async (postingTitle: string, companyName: string) => {
    try {
      const response = await axios.get('http://127.0.0.1:80/zoho/getjob', {
        params: { postingTitle, companyName }
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
          companyName: selectedJob.companyName,
          postingTitle: selectedJob.postingTitle,
          newStatus,
        });
        
        if (response.status === 200) {
          alert('Job status updated successfully');
          setSelectedJob((prev) => prev ? { ...prev, status: newStatus } : null);
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
              <th>Select</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Posting Title</th>
              <th>Experience</th>
              <th>Budget</th>
              <th>Notice Period</th>
              <th>City</th>
              <th>Job Description</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} onClick={() => handleJobClick(job.postingTitle, job.companyName)}>
                <td>[]</td>
                <td>{job.companyName}</td>
                <td>{job.status}</td>
                <td>{job.postingTitle}</td>
                <td>{job.experience}</td>
                <td>{job.budget}</td>
                <td>{job.noticePeriod}</td>
                <td>{job.city}</td>
                <td>{job.jd}</td>
                <td>{job.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <div className="jobDetails">
          <h2>Job Details</h2>
          <p><strong>Company Name:</strong> {selectedJob.companyName}</p>
          <p><strong>Posting Title:</strong> {selectedJob.postingTitle}</p>
          <p><strong>Status:</strong> 
            <select value={newStatus || selectedJob.status} onChange={handleStatusChange}>
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
          <p><strong>Experience:</strong> {selectedJob.experience}</p>
          <p><strong>Budget:</strong> {selectedJob.budget}</p>
          <p><strong>Notice Period:</strong> {selectedJob.noticePeriod}</p>
          <p><strong>City:</strong> {selectedJob.city}</p>
          <p><strong>Job Description:</strong> {selectedJob.jd}</p>
          <p><strong>Address:</strong> {selectedJob.address}</p>
        </div>
      )}
    </div>
  );
};

export default JobOpenings;
