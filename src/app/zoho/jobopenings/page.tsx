'use client';
import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import './jobopenings.scss';

interface Job {
  'Job Opening ID': string;
  'postingTitle': string;
  'Assigned Recruiter(s)': string;
  'targetDate': {
    $date: string;
  };
  'Job Opening Status': string;
  City: string;
  'clientName': string;
  'Contact Name': string;
  'Account Manager': string;
}

const JobOpenings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); 
  const [newStatus, setNewStatus] = useState<string>(''); 

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

  const handleJobClick = async (postingTitle: string, clientName: string) => {
    try {
      const response = await axios.get('https://demo4-backendurl.vercel.app/zoho/getjob', {
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
        const response = await axios.post('https://demo4-backendurl.vercel.app/zoho/updatejobstatus', {
          clientName: selectedJob.clientName,
          postingTitle: selectedJob.postingTitle,
          newStatus,
        });
        
        if (response.status === 200) {
          alert('Job status updated successfully');
          // Optionally, update the selected job in state
          setSelectedJob((prev) => prev ? { ...prev, 'Job Opening Status': newStatus } : null);
          
          // Fetch the updated job list again
          await fetchJobs();  // This will refresh the table with updated data
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
              <th>Posting Title</th>
              <th>Assigned Recruiter(s)</th>
              <th>Target Date</th>
              <th>Job Opening Status</th>
              <th>City</th>
              <th>Client Name</th>
              <th>Contact Name</th>
              <th>Account Manager</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} onClick={() => handleJobClick(job['postingTitle'], job['clientName'])}>
                <td>[]</td>
                <td>{job['postingTitle']}</td>
                <td>{job['Assigned Recruiter(s)']}</td>
                <td>
                  {job['targetDate'] && job['targetDate'].$date
                    ? new Date(job['targetDate'].$date).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td>{job['Job Opening Status']}</td>
                <td>{job.City}</td>
                <td>{job['clientName']}</td>
                <td>{job['Contact Name']}</td>
                <td>{job['Account Manager']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <div className="jobDetails">
          <h2>Job Details</h2>
          <p><strong>Posting Title:</strong> {selectedJob.postingTitle}</p>
          <p><strong>Client Name:</strong> {selectedJob.clientName}</p>
          <p><strong>Assigned Recruiter:</strong> {selectedJob['Assigned Recruiter(s)']}</p>
          <p><strong>Target Date:</strong> {new Date(selectedJob.targetDate.$date).toLocaleDateString()}</p>
          <p><strong>Job Opening Status:</strong>
            <select value={newStatus || selectedJob['Job Opening Status']} onChange={handleStatusChange}>
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
          <p><strong>City:</strong> {selectedJob.City}</p>
          <p><strong>Account Manager:</strong> {selectedJob['Account Manager']}</p>
          <p><strong>Contact Name:</strong> {selectedJob['Contact Name']}</p>
        </div>
      )}
    </div>
  );
};

export default JobOpenings;
