'use client';
import React, { useEffect, useState } from 'react';
import { Candidate, JobPosting } from '@/app/types';
import axios from 'axios';
import ShowDetails from './ShowDetails';
import './candidates.scss';
import ZohoHeader from '@/app/zohoheader/page';
import CandidateStage from './CandidateStage';

const API_URL = 'https://demo4-backendurl.vercel.app/candidate/getall';
const DETAILS_API_URL = 'https://demo4-backendurl.vercel.app/zoho/getcandidate_id';
const API_JOB_POSTINGS_URL = 'https://demo4-backendurl.vercel.app/jobs/getall';
const UPDATE_CANDIDATE_STAGE_API_URL = 'https://demo4-backendurl.vercel.app/candidate/update_stage';

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

  // Filter state
  const [filter, setFilter] = useState({
    candidateId: '',
    name: '',
    clientName: '',
    jobOpening: '',
    candidateStage: '',
  });

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

  // Filter the candidates based on filter inputs
  const filteredCandidates = candidates.filter(candidate => {
    return (
      (filter.candidateId === '' || candidate.candidateId.includes(filter.candidateId)) &&
      (filter.name === '' || candidate.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.clientName === '' || candidate.clientName.toLowerCase().includes(filter.clientName.toLowerCase())) &&
      (filter.jobOpening === '' || candidate.jobOpening.toLowerCase().includes(filter.jobOpening.toLowerCase())) &&
      (filter.candidateStage === '' || candidate.candidateStage === filter.candidateStage)
    );
  });

  return (
    <div>
      <ZohoHeader />

      <div className="table-container">
      <CandidateStage
          stageCounts={stageCounts}
          onFilterChange={setFilter}
          filter={filter}
          onCandidateStageChange={handleCandidateStageChange}
        />

        <h2>Candidate List</h2>
        <table className="candidate-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Client Name</th>
              <th>Job Opening</th>
              <th>Phone</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <tr key={candidate.candidateId}>
                <td onClick={() => handleCandidateIdClick(candidate.candidateId)} style={{ cursor: 'pointer', color: 'blue' }}>
                  {candidate.candidateId}
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.clientName}</td>
                <td>{candidate.jobOpening}</td>
                <td>{candidate.phone}</td>
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
