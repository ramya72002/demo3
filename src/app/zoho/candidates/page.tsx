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

  // Control visibility of the filter in the table headers
  const [filterVisibility, setFilterVisibility] = useState({
    candidateId: false,
    name: false,
    clientName: false,
    jobOpening: false,
    candidateStage: false,
  });

  const fetchCandidates = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setCandidates(response.data);
        calculateStageCounts(response.data);
      })
      .catch((error) => console.error('Error fetching candidates:', error));
  };

  const fetchJobPostings = () => {
    axios
      .get<JobPosting[]>(API_JOB_POSTINGS_URL)
      .then((response) => setJobPostings(response.data))
      .catch((error) => console.error('Error fetching job postings:', error));
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

    candidates.forEach((candidate) => {
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
    axios
      .get(`${DETAILS_API_URL}?candidateId=${candidateId}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setSelectedCandidate(data);
          setShowDetails(candidateId);
        } else {
          console.error('No data found for candidateId:', candidateId);
        }
      })
      .catch((error) => console.error('Error fetching candidate details:', error));
  };

  const closeDetails = () => {
    setShowDetails(null);
  };

  const handleCandidateStageChange = async (candidateId: string, candidateStage: string) => {
    try {
      await axios.put(`${UPDATE_CANDIDATE_STAGE_API_URL}/${candidateId}`, { candidateStage });
      fetchCandidates();
    } catch (error) {
      console.error('Error updating candidate stage:', error);
    }
  };

  // Filter candidates based on input fields
  const filteredCandidates = candidates.filter((candidate) => {
    return (
      (filter.candidateId === '' || candidate.candidateId.includes(filter.candidateId)) &&
      (filter.name === '' || candidate.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.clientName === '' || candidate.clientName.toLowerCase().includes(filter.clientName.toLowerCase())) &&
      (filter.jobOpening === '' || candidate.jobOpening.toLowerCase().includes(filter.jobOpening.toLowerCase())) &&
      (filter.candidateStage === '' || candidate.candidateStage === filter.candidateStage)
    );
  });

  // Toggle filter visibility when the filter icon is clicked
  const toggleFilterVisibility = (key: string) => {
    setFilterVisibility((prev) => ({ ...prev, [key]: !prev[key as keyof typeof filterVisibility] }));
  };

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
              <th>
                ID
                <span className="filter-icon" onClick={() => toggleFilterVisibility('candidateId')}></span>
                {filterVisibility.candidateId && (
                  <input
                    type="text"
                    value={filter.candidateId}
                    onChange={(e) => setFilter({ ...filter, candidateId: e.target.value })}
                    placeholder="Filter by ID"
                  />
                )}
              </th>
              <th>
                Name
                <span className="filter-icon" onClick={() => toggleFilterVisibility('name')}>🔍</span>
                {filterVisibility.name && (
                  <input
                    type="text"
                    value={filter.name}
                    onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                    placeholder="Filter by Name"
                  />
                )}
              </th>
              <th>
                Client Name
                <span className="filter-icon" onClick={() => toggleFilterVisibility('clientName')}>🔍</span>
                {filterVisibility.clientName && (
                  <input
                    type="text"
                    value={filter.clientName}
                    onChange={(e) => setFilter({ ...filter, clientName: e.target.value })}
                    placeholder="Filter by Client Name"
                  />
                )}
              </th>
              <th>
                Job Opening
                <span className="filter-icon" onClick={() => toggleFilterVisibility('jobOpening')}>🔍</span>
                {filterVisibility.jobOpening && (
                  <input
                    type="text"
                    value={filter.jobOpening}
                    onChange={(e) => setFilter({ ...filter, jobOpening: e.target.value })}
                    placeholder="Filter by Job Opening"
                  />
                )}
              </th>
              <th>Phone</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.candidateId}>
                <td
                  onClick={() => handleCandidateIdClick(candidate.candidateId)}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  {candidate.candidateId}
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.clientName}</td>
                <td>{candidate.jobOpening}</td>
                <td>{candidate.phone}</td>
                <td>
                  <select
                    value={candidate.candidateStage}
                    onChange={(e) => handleCandidateStageChange(candidate.candidateId, e.target.value)}
                  >
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
