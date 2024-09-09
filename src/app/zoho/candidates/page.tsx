'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ZohoHeader from '@/app/zohoheader/page';
import './candidates.scss';

// Define the API URLs
const API_URL = 'https://demo4-backendurl.vercel.app/candidate/getall';
const DETAILS_API_URL = 'https://demo4-backendurl.vercel.app/zoho/getcandidate_name';
const UPDATE_STAGE_API_URL = 'https://demo4-backendurl.vercel.app/candidate/update_stage';
const API_JOB_POSTINGS_URL = 'https://demo4-backendurl.vercel.app/jobs/getall';

// TypeScript interface for candidate data
interface Candidate {
  name: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  state: string;
  experience: string;
  skills: string[];
  linkedIn: string;
  Candidate_Stage: string;
  add_job: string;
}

interface JobPosting {
  id: string;
  postingTitle: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [stageCounts, setStageCounts] = useState({
    new: 0,
    inreview: 0,
    available: 0,
    engaged: 0,
    offered: 0,
    hired: 0,
    rejected: 0,
  });
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<string>('');

  const fetchCandidates = () => {
    axios.get(API_URL)
      .then(response => setCandidates(response.data))
      // .then(data => calculateStages(data))
      .catch(error => console.error('Error fetching candidates:', error));
  };

  const fetchJobPostings = () => {
    axios.get<JobPosting[]>(API_JOB_POSTINGS_URL)
      .then(response => setJobPostings(response.data))
      .catch(error => console.error('Error fetching job postings:', error));
  };

  useEffect(() => {
    fetchJobPostings();
    fetchCandidates();
  }, []);

  const calculateStages = (candidates: Candidate[]) => {
    const counts = {
      new: 0,
      inreview: 0,
      available: 0,
      engaged: 0,
      offered: 0,
      hired: 0,
      rejected: 0,
    };

    candidates.forEach(candidate => {
      const stage = candidate.Candidate_Stage.toLowerCase();
      if (stage in counts) {
        (counts as any)[stage]++;
      }
    });

    setStageCounts(counts);
  };

  const handleRowClick = (candidate: Candidate) => {
    axios.get(`${DETAILS_API_URL}?name=${candidate.name}`)
      .then(response => {
        const data = response.data[0];
        setSelectedCandidate(data);
        setSelectedStage(data.candidate_stage);
        setSelectedJob(data.add_job);
      })
      .catch(error => console.error('Error fetching candidate details:', error));
  };

  const updateCandidateStage = () => {
    if (!selectedCandidate) return;

    const updateData = {
      name: selectedCandidate.name,
      candidate_stage: selectedStage,
      add_job: selectedJob || '',
    };

    axios.post(UPDATE_STAGE_API_URL, updateData)
      .then(() => fetchCandidates())
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
            <th>LinkedIn</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index} onClick={() => handleRowClick(candidate)} className="candidate-row">
              <td>{candidate.name}</td>
              <td>{candidate.city}</td>
              <td className="stage">{candidate.Candidate_Stage}</td>
              <td>{candidate.linkedIn}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCandidate && (
        <div className="candidate-details">
          <h3>Candidate Details</h3>
          <p><strong>Name:</strong> {selectedCandidate.name}</p>
          <p><strong>Candidate Stage:</strong>
            <select value={selectedStage} onChange={e => setSelectedStage(e.target.value)}>
              <option value="New">New</option>
              <option value="InReview">In Review</option>
              <option value="Available">Available</option>
              <option value="Engaged">Engaged</option>
              <option value="Offered">Offered</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </p>
          <p><strong>Job:</strong>
            <select value={selectedJob} onChange={e => setSelectedJob(e.target.value)}>
              {jobPostings.map(job => (
                <option key={job.id} value={job.postingTitle}>{job.postingTitle}</option>
              ))}
            </select>
          </p>
          <button onClick={updateCandidateStage}>Update Candidate</button>
        </div>
      )}
    </div>
  );
};

export default Candidates;
