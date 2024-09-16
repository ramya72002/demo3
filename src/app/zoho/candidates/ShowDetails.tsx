'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './showDetails.scss';

interface Job {
  clientName: string;
  jobOpening: string;
}

interface Candidate {
  candidateId: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  location: string;
  state: string;
  experience: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  domain: string;
  skills: string[];
  linkedIn: string;
  clientName: string;
  jobOpening: string;
}

interface ShowDetailsProps {
  candidate: Candidate;
  onClose: () => void;
  fetchCandidates: () => void;
}

const UPDATE_CANDIDATE_API_URL = 'https://demo4-backendurl.vercel.app/candidate/update';

const ShowDetails: React.FC<ShowDetailsProps> = ({ candidate, onClose, fetchCandidates }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(candidate);
  const [clientNames, setClientNames] = useState<string[]>([]);
  const [jobOpenings, setJobOpenings] = useState<string[]>([]);
  const [clientName, setClientName] = useState<string>(candidate.clientName || '');
  const [jobOpening, setJobOpening] = useState<string>(candidate.jobOpening || '');

  useEffect(() => {
    // Fetch jobs and populate client names
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('https://demo4-backendurl.vercel.app/jobs/getall');
        const jobs = response.data;

        const uniqueClientNames = Array.from(new Set(jobs.map((job) => job.clientName)));
        setClientNames(uniqueClientNames);

        if (clientName) {
          const filteredJobs = jobs.filter((job) => job.clientName === clientName);
          const uniqueJobOpenings = Array.from(new Set(filteredJobs.map((job) => job.jobOpening)));
          setJobOpenings(uniqueJobOpenings);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [clientName]);

  const handleSave = () => {
    const updateData = {
      ...selectedCandidate,
      clientName,
      jobOpening,
    };

    axios.put(`${UPDATE_CANDIDATE_API_URL}/${selectedCandidate.candidateId}`, updateData)
      .then(() => {
        fetchCandidates();
        onClose();
      })
      .catch(error => console.error('Error updating candidate:', error));
  };

  return (
    <div className="candidate-details-layer">
      <div className="candidate-details-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h3>Edit Candidate Details</h3>

        {/* Existing Fields */}
        <p>
          <strong>Name:</strong>
          <input
            type="text"
            value={selectedCandidate.name}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, name: e.target.value })}
          />
        </p>
        <p>
          <strong>Email:</strong>
          <input
            type="email"
            value={selectedCandidate.email}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, email: e.target.value })}
          />
        </p>
        <p>
          <strong>Phone:</strong>
          <input
            type="tel"
            value={selectedCandidate.phone}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, phone: e.target.value })}
          />
        </p>
        <p>
          <strong>Gender:</strong>
          <input
            type="text"
            value={selectedCandidate.gender}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, gender: e.target.value })}
          />
        </p>
        <p>
          <strong>Location:</strong>
          <input
            type="text"
            value={selectedCandidate.location}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, location: e.target.value })}
          />
        </p>
        <p>
          <strong>Experience:</strong>
          <input
            type="text"
            value={selectedCandidate.experience}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, experience: e.target.value })}
          />
        </p>
        <p>
          <strong>Current CTC:</strong>
          <input
            type="text"
            value={selectedCandidate.currentCTC}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, currentCTC: e.target.value })}
          />
        </p>
        <p>
          <strong>Expected CTC:</strong>
          <input
            type="text"
            value={selectedCandidate.expectedCTC}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, expectedCTC: e.target.value })}
          />
        </p>
        <p>
          <strong>Notice Period:</strong>
          <input
            type="text"
            value={selectedCandidate.noticePeriod}
            onChange={(e) => setSelectedCandidate({ ...selectedCandidate, noticePeriod: e.target.value })}
          />
        </p>

        {/* Client Name Dropdown */}
        <p>
          <strong>Client Name:</strong>
          <select
            value={clientName}
            onChange={e => {
              setClientName(e.target.value);
              setJobOpening(''); // Reset job opening when client changes
            }}
          >
            <option value="">Select Client</option>
            {clientNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </p>

        {/* Job Opening Dropdown */}
        <p>
          <strong>Job Opening:</strong>
          <select
            value={jobOpening}
            onChange={e => setJobOpening(e.target.value)}
            disabled={!clientName} // Disable if no client selected
          >
            <option value="">Select Job Opening</option>
            {jobOpenings.map((opening) => (
              <option key={opening} value={opening}>
                {opening}
              </option>
            ))}
          </select>
        </p>

        {/* Save Button */}
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ShowDetails;
