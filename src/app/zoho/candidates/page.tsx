'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ZohoHeader from '@/app/zohoheader/page';
import './candidates.scss';

// Define the API URLs
const API_URL = 'http://127.0.0.1:80/candidate/getall';
const DETAILS_API_URL = 'http://127.0.0.1:80/zoho/getcandidate_id';
const UPDATE_STAGE_API_URL = 'http://127.0.0.1:80/candidate/update_stage';
const API_JOB_POSTINGS_URL = 'http://127.0.0.1:80/jobs/getall';

// TypeScript interface for candidate data
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
  candidateStage: string;
  addJob: string | null;
  jobStage: number;
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
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const fetchCandidates = () => {
    axios.get(API_URL)
      .then(response => setCandidates(response.data))
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
      const stage = candidate.candidateStage.toLowerCase();
      if (stage in counts) {
        (counts as any)[stage]++;
      }
    });

    setStageCounts(counts);
  };

  const handleRowClick = (candidateId: string) => {
    if (showDetails === candidateId) {
      setShowDetails(null);
      return;
    }
    axios.get(`${DETAILS_API_URL}?candidateId=${candidateId}`)
      .then(response => {
        const data = response.data[0];
        setSelectedCandidate(data);
        setSelectedStage(data.candidateStage);
        setSelectedJob(data.addJob);
        setShowDetails(candidateId); // Show details of the clicked candidate
      })
      .catch(error => console.error('Error fetching candidate details:', error));
  };

  const updateCandidateStage = () => {
    if (!selectedCandidate) return;

    const updateData = {
      candidateId: selectedCandidate.candidateId,
      candidateStage: selectedStage,
      addJob: selectedJob || '',
    };

    axios.post(UPDATE_STAGE_API_URL, updateData)
      .then(() => fetchCandidates())
      .catch(error => console.error('Error updating candidate stage:', error));
  };

  const closeDetails = () => {
    setShowDetails(null); // Close the details view
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
            <th>Candidate ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Candidate Stage</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleRowClick(candidate.candidateId)} className="candidate-row">
                <td>{candidate.candidateId}</td>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.city}</td>
                <td className="stage">{candidate.candidateStage}</td>
              </tr>
              {showDetails === candidate.candidateId && selectedCandidate && (
                <div className="candidate-details-layer">
                  <div className="candidate-details-content">
                    <span className="close-btn" onClick={closeDetails}>&times;</span>
                    <h3>Candidate Details</h3>
                    <p><strong>Name:</strong> {selectedCandidate.name}</p>
                    <p><strong>Email:</strong> {selectedCandidate.email}</p>
                    <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
                    <p><strong>Gender:</strong> {selectedCandidate.gender}</p>
                    <p><strong>City:</strong> {selectedCandidate.city}</p>
                    <p><strong>State:</strong> {selectedCandidate.state}</p>
                    <p><strong>Experience:</strong> {selectedCandidate.experience} years</p>
                    <p><strong>Current CTC:</strong> {selectedCandidate.currentCTC}</p>
                    <p><strong>Expected CTC:</strong> {selectedCandidate.expectedCTC}</p>
                    <p><strong>Notice Period:</strong> {selectedCandidate.noticePeriod} months</p>
                    <p><strong>Domain:</strong> {selectedCandidate.domain}</p>
                    <p><strong>Skills:</strong> {selectedCandidate.skills.join(', ')}</p>
                    <p><strong>LinkedIn:</strong> <a href={selectedCandidate.linkedIn} target="_blank" rel="noopener noreferrer">{selectedCandidate.linkedIn}</a></p>
                    <p><strong>Candidate Stage:</strong>
                      <select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)}>
                        <option value="new">New</option>
                        <option value="inreview">In Review</option>
                        <option value="available">Available</option>
                        <option value="engaged">Engaged</option>
                        <option value="offered">Offered</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </p>
                    <p><strong>Job Posting:</strong>
                      <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
                        <option value="">None</option>
                        {jobPostings.map(job => (
                          <option key={job.id} value={job.id}>{job.postingTitle}</option>
                        ))}
                      </select>
                    </p>
                    <button onClick={updateCandidateStage}>Update Stage</button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;                                  
