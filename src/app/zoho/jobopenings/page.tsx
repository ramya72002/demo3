'use client';
import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import './jobopenings.scss';

// Updated Job interface
interface Job {
  _id:string;
  jobId: string;
  postingTitle: string;
  clientName: string;
  targetDate: string;
  industry: string;
  numberOfPositions: number;
  description: string;
  clientManger: string;
  contactName: string;
  city: string;
  province: string;
  postalCode: string;
  accountManager?: string;  // Optional, as it's not in the provided data
  clientManager: string;
  dateOpened: string;
  jobType: string;
  jobOpeningStatus: string;
  workExperience: string;
  requiredSkills: string;
  salary: string;
  revenuePerPosition: string;
}

const JobOpenings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Partial<Job>>({});

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

  // Function to handle job ID click
  const handleJobClick = async (jobId: string) => {
    try {
      const response = await axios.get<Job[]>(`http://127.0.0.1:80/zoho/getjob_id?jobId=${jobId}`);
      const job = response.data[0];  // Access the first element of the array
      setSelectedJob(job);
      setFormData(job); // Initialize form data with selected job details
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle job details update
  const handleSave = async () => {
    if (selectedJob) {
      try {
        // Create a new object excluding the '_id' field
        const { _id, ...updateData } = formData;
  
        // Call PUT API to update job details
        const response = await axios.put(`http://127.0.0.1:80/job/update/${selectedJob.jobId}`, updateData);
        
        if (response.status === 200) {
          alert('Job updated successfully');
          await fetchJobs();  // Refresh the table with updated data
          setSelectedJob(null);  // Close the details view
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
              <tr key={index} onClick={() => handleJobClick(job.jobId)}>
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
        <div className="job-details-layer">
          <div className="job-details-content">
            <span className="close-btn" onClick={() => setSelectedJob(null)}>&times;</span>
            <h3>Job Details</h3>
            <form>
              <div>
                <label htmlFor="postingTitle">Posting Title:</label>
                <input id="postingTitle" name="postingTitle" value={formData.postingTitle || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="clientName">Client Name:</label>
                <input id="clientName" name="clientName" value={formData.clientName || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="targetDate">Target Date:</label>
                <input id="targetDate" name="targetDate" type="date" value={formData.targetDate || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="industry">Industry:</label>
                <input id="industry" name="industry" value={formData.industry || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="numberOfPositions">Number of Positions:</label>
                <input id="numberOfPositions" name="numberOfPositions" type="number" value={formData.numberOfPositions || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="clientManger">Client Manager:</label>
                <input id="clientManger" name="clientManger" value={formData.clientManger || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="contactName">Contact Name:</label>
                <input id="contactName" name="contactName" value={formData.contactName || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="city">City:</label>
                <input id="city" name="city" value={formData.city || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="province">Province:</label>
                <input id="province" name="province" value={formData.province || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="postalCode">Postal Code:</label>
                <input id="postalCode" name="postalCode" value={formData.postalCode || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="accountManager">Account Manager:</label>
                <input id="accountManager" name="accountManager" value={formData.accountManager || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="clientManager">Client Manager:</label>
                <input id="clientManager" name="clientManager" value={formData.clientManager || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="dateOpened">Date Opened:</label>
                <input id="dateOpened" name="dateOpened" type="date" value={formData.dateOpened || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="jobType">Job Type:</label>
                <input id="jobType" name="jobType" value={formData.jobType || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="jobOpeningStatus">Job Opening Status:</label>
                <input id="jobOpeningStatus" name="jobOpeningStatus" value={formData.jobOpeningStatus || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="workExperience">Work Experience:</label>
                <input id="workExperience" name="workExperience" value={formData.workExperience || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="requiredSkills">Required Skills:</label>
                <input id="requiredSkills" name="requiredSkills" value={formData.requiredSkills || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="salary">Salary:</label>
                <input id="salary" name="salary" value={formData.salary || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="revenuePerPosition">Revenue Per Position:</label>
                <input id="revenuePerPosition" name="revenuePerPosition" value={formData.revenuePerPosition || ''} onChange={handleInputChange} />
              </div>
              <button type="button" onClick={handleSave}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobOpenings;
