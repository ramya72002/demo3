'use client'
import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import './jobopenings.scss' // Import SCSS directly without assigning it to a variable

// Define the structure of the Job object
interface Job {
  'Job Opening ID': string;
  'Posting Title': string;
  'Assigned Recruiter(s)': string;
  'Target Date': {
    $date: string;
  };
  'Job Opening Status': string;
  City: string;
  'Client Name': string;
  'Contact Name': string;
  'Account Manager': string;
}

const JobOpenings = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Use the defined Job interface

  useEffect(() => {
    // Fetch job openings data from the backend
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('https://demo4-backend.vercel.app/jobs/getall'); // Specify the type for the response
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job openings:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <ZohoHeader />
      <h1>Job Openings</h1>
      <div className="jobTable">
        <table>
          <thead>
            <tr>
              <th>Job Opening ID</th>
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
              <tr key={index}>
                <td>{job['Job Opening ID']}</td>
                <td>{job['Posting Title']}</td>
                <td>{job['Assigned Recruiter(s)']}</td>
                {/* Safely access the date */}
                <td>
                  {job['Target Date'] && job['Target Date'].$date
                    ? new Date(job['Target Date'].$date).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td>{job['Job Opening Status']}</td>
                <td>{job.City}</td>
                <td>{job['Client Name']}</td>
                <td>{job['Contact Name']}</td>
                <td>{job['Account Manager']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobOpenings;
