'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowDetails from './ShowDetails';
import './candidates.scss';
import ZohoHeader from '@/app/zohoheader/page';
const API_URL = 'https://demo4-backendurl.vercel.app/candidate/getall';
const DETAILS_API_URL = 'https://demo4-backendurl.vercel.app/zoho/getcandidate_id';
const API_JOB_POSTINGS_URL = 'https://demo4-backendurl.vercel.app/jobs/getall';
const UPDATE_CANDIDATE_STAGE_API_URL = 'https://demo4-backendurl.vercel.app/candidate/update_stage';

type CandidateStage = 'new' | 'inreview' | 'available' | 'engaged' | 'offered' | 'hired' | 'rejected';

interface Candidate {
  candidateId: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  state: string;
  experience: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  domain: string;
  skills: string[];
  linkedIn: string;
  candidateStage: CandidateStage;
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
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const fetchCandidates = () => {
    axios.get(API_URL)
      .then(response => {
        setCandidates(response.data);
        calculateStageCounts(response.data);
      })
      .catch(error => console.error('Error fetching candidates:', error));
  };

  const fetchJobPostings = () => {
    axios.get<JobPosting[]>(API_JOB_POSTINGS_URL)
      .then(response => setJobPostings(response.data))
      .catch(error => console.error('Error fetching job postings:', error));
  };

  const calculateStageCounts = (candidates: Candidate[]) => {
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
      if (counts.hasOwnProperty(candidate.candidateStage)) {
        counts[candidate.candidateStage]++;
      }
    });

    setStageCounts(counts);
  };

  useEffect(() => {
    fetchJobPostings();
    fetchCandidates();
  }, []);

  const handleCandidateIdClick = (candidateId: string) => {
    axios.get(`${DETAILS_API_URL}?candidateId=${candidateId}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setSelectedCandidate(data);
          setShowDetails(candidateId); // Only show details when candidateId is clicked
        } else {
          console.error('No data found for candidateId:', candidateId);
        }
      })
      .catch(error => console.error('Error fetching candidate details:', error));
  };

  const closeDetails = () => {
    setShowDetails(null); // Close the details view
  };

  const handleCandidateStageChange = async (candidateId: string, candidateStage: string) => {
    try {
      await axios.put(`${UPDATE_CANDIDATE_STAGE_API_URL}/${candidateId}`, { candidateStage });
      fetchCandidates();
    } catch (error) {
      console.error('Error updating candidate stage:', error);
    }
  };

  return (
    <div>
      <ZohoHeader />
 
    <div className="table-container">
      <h2>Candidate Stage</h2>
      <div className="candidate-stages">
        {Object.keys(stageCounts).map(stage => (
          <div key={stage} className="stage">
            <span>{stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
            <span>{stageCounts[stage as keyof typeof stageCounts]}</span>
          </div>
        ))}
      </div>

      <h2>Candidate List</h2>
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Candidate ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>City</th>
            <th>Experience</th>
            <th>Current CTC</th>
            <th>Expected CTC</th>
            <th>Notice Period</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.candidateId}>
              <td onClick={() => handleCandidateIdClick(candidate.candidateId)} style={{ cursor: 'pointer', color: 'blue' }}>
                {candidate.candidateId}
              </td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.gender}</td>
              <td>{candidate.city}</td>
              <td>{candidate.experience}</td>
              <td>{candidate.currentCTC}</td>
              <td>{candidate.expectedCTC}</td>
              <td>{candidate.noticePeriod}</td>
              <td>
                <select value={candidate.candidateStage} onChange={(e) => handleCandidateStageChange(candidate.candidateId, e.target.value)}>
                  <option value="new">New</option>
                  <option value="inreview">In Review</option>
                  <option value="available">Available</option>
                  <option value="engaged">Engaged</option>
                  <option value="offered">Offered</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetails && selectedCandidate && (
        <ShowDetails candidate={selectedCandidate} onClose={closeDetails} fetchCandidates={fetchCandidates} />
      )}
    </div>
    </div>
  );
};

export default Candidates;
