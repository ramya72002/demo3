'use client'
import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import './jobopenings.scss' // Import SCSS directly without assigning it to a variable

// Define the structure of the Job object
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
              <th>select</th>
              <th>postingTitle</th>
              <th>Assigned Recruiter(s)</th>
              <th>targetDate</th>
              <th>Job Opening Status</th>
              <th>City</th>
              <th>clientName</th>
              <th>Contact Name</th>
              <th>Account Manager</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>[]</td>
                <td>{job['postingTitle']}</td>
                <td>{job['Assigned Recruiter(s)']}</td>
                {/* Safely access the date */}
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
    </div>
  );
};

export default JobOpenings;
