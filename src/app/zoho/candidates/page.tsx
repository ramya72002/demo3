'use client';
import React, { useEffect, useState } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import './candidates.scss'; // Import your SCSS file

// Define the API URLs
const API_URL = 'https://demo4-backend.vercel.app/candidate/getall';
const DETAILS_API_URL = 'https://demo4-backend.vercel.app/zoho/getcandidate_name'; // Adjust this URL based on your API setup

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
  Candidate_Stage: string; // Ensure this matches how you're accessing the data
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stageCounts, setStageCounts] = useState({
    new: 0,
    inReview: 0,
    available: 0,
    engaged: 0,
    offered: 0,
    hired: 0,
    rejected: 0
  });
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then((data: Candidate[]) => {
        setCandidates(data);
        calculateStages(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const calculateStages = (candidates: Candidate[]) => {
    const counts = {
      new: 0,
      inReview: 0,
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
          setSelectedCandidate(data[0]); // Assuming the response is an array with one object
        } else {
          console.error('No details found for the selected candidate.');
        }
      })
      .catch(error => console.error('Error fetching candidate details:', error));
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
            <tr
              key={index}
              onClick={() => handleRowClick(candidate)}
              className="candidate-row"
            >
              <td>{candidate["First Name"]} {candidate["Last Name"]}</td>
              <td>{candidate["Address Information"].City}</td>
              <td className="stage">{candidate.Candidate_Stage}</td>
              <td>{new Date().toLocaleString()}</td> {/* Placeholder for Modified Time */}
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
          <p><strong>Candidate Stage:</strong> {selectedCandidate["Candidate_Stage"]}</p>
          <p><strong>Email:</strong> {selectedCandidate.Email}</p>
          <p><strong>Mobile:</strong> {selectedCandidate.Mobile}</p>
          <p><strong>Phone:</strong> {selectedCandidate.Phone}</p>
          <p><strong>Address:</strong> {selectedCandidate["Address Information"].Street}, {selectedCandidate["Address Information"].City}, {selectedCandidate["Address Information"].Province}, {selectedCandidate["Address Information"].Country}, {selectedCandidate["Address Information"]["Postal Code"]}</p>
          <p><strong>Current Employer:</strong> {selectedCandidate["Professional Details"]["Current Employer"]}</p>
          <p><strong>Job Title:</strong> {selectedCandidate["Professional Details"]["Current Job Title"]}</p>
          <p><strong>Current Salary:</strong> ${selectedCandidate["Professional Details"]["Current Salary"]}</p>
          <p><strong>Expected Salary:</strong> ${selectedCandidate["Professional Details"]["Expected Salary"]}</p>
          <p><strong>Experience:</strong> {selectedCandidate["Professional Details"]["Experience in Years"]} years</p>
          <p><strong>Highest Qualification:</strong> {selectedCandidate["Professional Details"]["Highest Qualification Held"]}</p>
          {/* <p><strong>Skills:</strong> {selectedCandidate["Professional Details"].SkillSet.join(', ')}</p> */}
          <p><strong>Skype ID:</strong> {selectedCandidate["Professional Details"]["Skype ID"]}</p>
          <p><strong>Website:</strong> <a href={selectedCandidate.Website} target="_blank" rel="noopener noreferrer">{selectedCandidate.Website}</a></p>
          <p><strong>Facebook:</strong> <a href={selectedCandidate["Additional Info"].Facebook} target="_blank" rel="noopener noreferrer">{selectedCandidate["Additional Info"].Facebook}</a></p>
          <p><strong>LinkedIn:</strong> <a href={selectedCandidate["Additional Info"].LinkedIn} target="_blank" rel="noopener noreferrer">{selectedCandidate["Additional Info"].LinkedIn}</a></p>
          <p><strong>Twitter:</strong> <a href={`https://twitter.com/${selectedCandidate["Additional Info"].Twitter}`} target="_blank" rel="noopener noreferrer">{selectedCandidate["Additional Info"].Twitter}</a></p>
        </div>
      )}
    </div>
  );
};

export default Candidates;
