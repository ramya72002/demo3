'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ZohoHeader from '@/app/zohoheader/page';
import './candidates.scss'; // Import your SCSS file

// Define the API URLs
const API_URL = 'https://demo4-backendurl.vercel.app/candidate/getall';
const DETAILS_API_URL = 'https://demo4-backendurl.vercel.app/zoho/getcandidate_name'; 
const UPDATE_STAGE_API_URL = 'https://demo4-backendurl.vercel.app/candidate/update_stage';
const API_JOB_POSTINGS_URL = 'https://demo4-backendurl.vercel.app/jobs/getall'; // Job postings API

// TypeScript interface for candidate data
interface Candidate {
  "Additional Info": {
    "Candidate Owner": string;
    "Candidate Status": string;
    "Email Opt Out": boolean;
    Facebook: string;
    LinkedIn: string;
    Source: string;
    Twitter: string;
  };
  "Address Information": {
    City: string;
    Country: string;
    "Postal Code": string;
    Province: string;
    Street: string;
  };
  "Attachment Information": { 
    Contracts: string;
    "Cover Letter": string;
    "Formatted Resume": string;
    Offer: string;
    Others: string;
    Resume: string;
  };
  Email: string;
  Fax: string;
  "First Name": string;
  "Last Name": string;
  Mobile: string;
  Phone: string;
  "Professional Details": {
    "Current Employer": string;
    "Current Job Title": string;
    "Current Salary": number;
    "Expected Salary": number;
    "Experience in Years": number;
    "Highest Qualification Held": string;
    "Skill Set": string[];
    "Skype ID": string;
  };
  "Secondary Email": string;
  Website: string;
  Candidate_Stage: string;
  Add_Job: string;
}

interface JobPosting {
  id: string;
  postingTitle: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]); // Store job postings
  const [stageCounts, setStageCounts] = useState({
    new: 0,
    inreview: 0,
    available: 0,
    engaged: 0,
    offered: 0,
    hired: 0,
    rejected: 0
  });
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<string>('');

  const fetchCandidates = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then((data: Candidate[]) => {
        setCandidates(data);
        calculateStages(data);
      })
      .catch(error => console.error('Error fetching candidates:', error));
  };

  const fetchJobPostings = () => {
    axios.get<JobPosting[]>(API_JOB_POSTINGS_URL)
      .then((response) => {
        console.log('API Response:', response.data); // Log the API response directly
        setJobPostings(response.data);
      })
      .catch(error => console.error('Error fetching job postings:', error));
  };

  useEffect(() => {
    fetchJobPostings(); 
    fetchCandidates();
  }, []); // Remove the console log from here
  
  useEffect(() => {
    // Log the job postings after they are updated
    console.log("Job Postings after update:", jobPostings);
  }, [jobPostings]); // This will run whenever jobPostings is updated

  const calculateStages = (candidates: Candidate[]) => {
    const counts = {
      new: 0,
      inreview: 0,
      available: 0,
      engaged: 0,
      offered: 0,
      hired: 0,
      rejected: 0
    };

    candidates.forEach(candidate => {
      const stage = candidate["Candidate_Stage"].toLowerCase();
      if (stage in counts) {
        (counts as any)[stage]++;
      }
    });

    setStageCounts(counts);
  };

  const handleRowClick = (candidate: Candidate) => {
    fetch(`${DETAILS_API_URL}?First_Name=${candidate["First Name"]}&Last_Name=${candidate["Last Name"]}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setSelectedCandidate(data[0]); 
          setSelectedStage(data[0]["Candidate_Stage"]);
          setSelectedJob(data[0]["Add_Job"]);
        } else {
          console.error('No details found for the selected candidate.');
        }
      })
      .catch(error => console.error('Error fetching candidate details:', error));
  };

  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStage(event.target.value);
  };

  const handleJobChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJob(event.target.value);
  };

  const updateCandidateStage = () => {
    if (!selectedCandidate) return;

    const updateData = {
      First_Name: selectedCandidate["First Name"],
      Last_Name: selectedCandidate["Last Name"],
      Candidate_Stage: selectedStage,
      Add_Job: selectedJob
    };

    if (!updateData.First_Name || !updateData.Last_Name || !updateData.Candidate_Stage) {
      console.error('Required fields are missing');
      return;
    }

    fetch(UPDATE_STAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Stage and job updated successfully:', data);
        fetchCandidates();
      })
      .catch(error => console.error('Error updating candidate stage:', error));
  };

  return (
    <div className="table-container">
      <ZohoHeader />

      <h2>Candidate Stage</h2>
      <div className="candidate-stages">
        {Object.keys(stageCounts).map(stage => (
          <div key={stage} className="stage">
            <span>{stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
            <span>{stageCounts[stage as keyof typeof stageCounts]}</span>
          </div>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>City</th>
            <th>Candidate Stage</th>
            <th>Modified Time</th>
            <th>Source</th>
            <th>Candidate Owner</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index} onClick={() => handleRowClick(candidate)} className="candidate-row">
              <td>{candidate["First Name"]} {candidate["Last Name"]}</td>
              <td>{candidate["Address Information"].City}</td>
              <td className="stage">{candidate.Candidate_Stage}</td>
              <td>{new Date().toLocaleString()}</td>
              <td>{candidate["Additional Info"].Source}</td>
              <td>{candidate["Additional Info"]["Candidate Owner"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCandidate && (
        <div className="candidate-details">
          <h3>Candidate Details</h3>
          <p><strong>First Name:</strong> {selectedCandidate["First Name"]}</p>
          <p><strong>Last Name:</strong> {selectedCandidate["Last Name"]}</p>
          <p><strong>Candidate Stage:</strong>
            <select value={selectedStage} onChange={handleStageChange}>
              <option value="New">New</option>
              <option value="InReview">In Review</option>
              <option value="Available">Available</option>
              <option value="Engaged">Engaged</option>
              <option value="Offered">Offered</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </p>
          <p><strong>Add Job:</strong>
            <select value={selectedJob} onChange={handleJobChange}>
              {jobPostings.map(job => (
                <option key={job.id} value={job.postingTitle}>{job.postingTitle}</option>
              ))}
            </select>
          </p>

          <p><strong>Email:</strong> {selectedCandidate.Email}</p>
          <p><strong>Mobile:</strong> {selectedCandidate.Mobile}</p>
          <p><strong>Phone:</strong> {selectedCandidate.Phone}</p>
          <button onClick={updateCandidateStage}>Update Stage and Job</button>
        </div>
      )}
    </div>
  );
};

export default Candidates;
