'use client';
import React, { useEffect, useState } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import './candidates.scss'; // Import your SCSS file

// Define the API URL
const API_URL = 'https://demo4-backend.vercel.app/candidate/getall';

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

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then((data: Candidate[]) => {
        setCandidates(data);
        calculateStages(data); // Calculate stage counts
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
      // Normalize the stage value to lowercase
      const stage = candidate.Candidate_Stage.toLowerCase();
      // Update the count based on normalized stage value
      if (stage in counts) {
        (counts as any)[stage]++;
      }
    });

    setStageCounts(counts);
  };

  return (
    <div className="table-container">
      <ZohoHeader />

      {/* Candidate Stages Section */}
      <h2>Candidate Stage</h2> {/* Added heading */}
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
            <tr key={index}>
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
    </div>
  );
};

export default Candidates;
