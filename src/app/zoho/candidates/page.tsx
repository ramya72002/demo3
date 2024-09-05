'use client'
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
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then((data: Candidate[]) => setCandidates(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="table-container">
      <ZohoHeader />
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
              <td className="stage">{candidate["Additional Info"]["Candidate Status"]}</td>
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
