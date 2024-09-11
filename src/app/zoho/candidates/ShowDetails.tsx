'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './showDetails.scss';

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
}

interface ShowDetailsProps {
  candidate: Candidate;
  onClose: () => void;
  fetchCandidates: () => void;
}

const UPDATE_CANDIDATE_API_URL = 'https://demo4-backendurl.vercel.app/candidate/update';

const ShowDetails: React.FC<ShowDetailsProps> = ({ candidate, onClose, fetchCandidates }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(candidate);

  const handleSave = () => {
    const updateData = {
      name: selectedCandidate.name,
      email: selectedCandidate.email,
      phone: selectedCandidate.phone,
      gender: selectedCandidate.gender,
      city: selectedCandidate.city,
      state: selectedCandidate.state,
      experience: selectedCandidate.experience,
      currentCTC: selectedCandidate.currentCTC,
      expectedCTC: selectedCandidate.expectedCTC,
      noticePeriod: selectedCandidate.noticePeriod,
      domain: selectedCandidate.domain,
      skills: selectedCandidate.skills,
      linkedIn: selectedCandidate.linkedIn,
    };

    axios.put(`${UPDATE_CANDIDATE_API_URL}/${selectedCandidate.candidateId}`, updateData)
      .then(() => {
        fetchCandidates();
        onClose(); // Close the details view
      })
      .catch(error => console.error('Error updating candidate:', error));
  };

  return (
    <div className="candidate-details-layer">
      <div className="candidate-details-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h3>Edit Candidate Details</h3>
        <p><strong>Name:</strong> <input type="text" value={selectedCandidate.name} onChange={e => setSelectedCandidate({ ...selectedCandidate, name: e.target.value })} /></p>
        <p><strong>Email:</strong> <input type="email" value={selectedCandidate.email} onChange={e => setSelectedCandidate({ ...selectedCandidate, email: e.target.value })} /></p>
        <p><strong>Phone:</strong> <input type="tel" value={selectedCandidate.phone} onChange={e => setSelectedCandidate({ ...selectedCandidate, phone: e.target.value })} /></p>
        <p><strong>Gender:</strong> <input type="text" value={selectedCandidate.gender} onChange={e => setSelectedCandidate({ ...selectedCandidate, gender: e.target.value })} /></p>
        <p><strong>City:</strong> <input type="text" value={selectedCandidate.city} onChange={e => setSelectedCandidate({ ...selectedCandidate, city: e.target.value })} /></p>
        <p><strong>State:</strong> <input type="text" value={selectedCandidate.state} onChange={e => setSelectedCandidate({ ...selectedCandidate, state: e.target.value })} /></p>
        <p><strong>Experience:</strong> <input type="text" value={selectedCandidate.experience} onChange={e => setSelectedCandidate({ ...selectedCandidate, experience: e.target.value })} /></p>
        <p><strong>Current CTC:</strong> <input type="text" value={selectedCandidate.currentCTC} onChange={e => setSelectedCandidate({ ...selectedCandidate, currentCTC: e.target.value })} /></p>
        <p><strong>Expected CTC:</strong> <input type="text" value={selectedCandidate.expectedCTC} onChange={e => setSelectedCandidate({ ...selectedCandidate, expectedCTC: e.target.value })} /></p>
        <p><strong>Notice Period:</strong> <input type="text" value={selectedCandidate.noticePeriod} onChange={e => setSelectedCandidate({ ...selectedCandidate, noticePeriod: e.target.value })} /></p>
        <p><strong>Domain:</strong> <input type="text" value={selectedCandidate.domain} onChange={e => setSelectedCandidate({ ...selectedCandidate, domain: e.target.value })} /></p>
        <p><strong>Skills:</strong> <input type="text" value={selectedCandidate.skills.join(', ')} onChange={e => setSelectedCandidate({ ...selectedCandidate, skills: e.target.value.split(',').map(s => s.trim()) })} /></p>
        <p><strong>LinkedIn:</strong> <input type="text" value={selectedCandidate.linkedIn} onChange={e => setSelectedCandidate({ ...selectedCandidate, linkedIn: e.target.value })} /></p>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ShowDetails;
