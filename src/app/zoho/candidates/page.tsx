'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ZohoHeader from '@/app/zohoheader/page';
import './candidates.scss';

// Define the API URLs
const API_URL = 'http://127.0.0.1:80/candidate/getall';
const DETAILS_API_URL = 'http://127.0.0.1:80/zoho/getcandidate_id';
const UPDATE_CANDIDATE_API_URL = 'http://127.0.0.1:80/candidate/update';
const API_JOB_POSTINGS_URL = 'http://127.0.0.1:80/jobs/getall';
const UPDATE_CANDIDATE_STAGE_API_URL = 'http://127.0.0.1:80/candidate/update_stage';
type CandidateStage = 'new' | 'inreview' | 'available' | 'engaged' | 'offered' | 'hired' | 'rejected';

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
  candidateStage: CandidateStage;
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
      .then(response => {
        setCandidates(response.data);
        calculateStageCounts(response.data); // Calculate counts after fetching
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
    console.log("Clicked candidateId:", candidateId);
    axios.get(`${DETAILS_API_URL}?candidateId=${candidateId}`)
      .then(response => {
        console.log("API Response:", response); // Log the entire response object
        const data = response.data; // Ensure response.data is an array
        console.log("Fetched candidate data:", data);
        if (data) {
          setSelectedCandidate(data);
          setShowDetails(candidateId);
        } else {
          console.error('No data found for candidateId:', candidateId);
        }
      })
      .catch(error => console.error('Error fetching candidate details:', error));
  };
  
  

  const handleSave = () => {
    if (!selectedCandidate) return;

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
        setShowDetails(null);
      })
      .catch(error => console.error('Error updating candidate:', error));
  };

  const closeDetails = () => {
    setShowDetails(null); // Close the details view
  };

  const handleCandidateStageChange = async (candidateId: string, candidateStage: string) => {
    try {
      // Make the PUT request to the API endpoint
      const response = await axios.put(`${UPDATE_CANDIDATE_STAGE_API_URL}/${candidateId}`, {
        candidateStage
      });
  
      // Handle the successful response
      console.log('Candidate stage updated successfully:', response.data);
  
      // Fetch updated candidates and update the stage counts
      fetchCandidates();
    } catch (error) {
      // Handle errors
      console.error('Error updating candidate stage:', error);
    }
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
              <tr className="candidate-row">
                {/* Only clicking on the Candidate ID will trigger the details layer */}
                <td onClick={() => handleCandidateIdClick(candidate.candidateId)} style={{ cursor: 'pointer' }}>
                  {candidate.candidateId}
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.city}</td>
                <td className="stage">
                  {/* Dropdown for candidate stage */}
                  <select
                    value={candidate.candidateStage}
                    onChange={e => handleCandidateStageChange(candidate.candidateId, e.target.value)}
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
              {showDetails === candidate.candidateId && selectedCandidate && (
                <tr>
                  <td colSpan={6}>
                    <div className="candidate-details-layer">
                      <div className="candidate-details-content">
                        <span className="close-btn" onClick={closeDetails}>&times;</span>
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
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;
