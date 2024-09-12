'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import './stage.scss'; // Import SCSS styles directly

// Define interface for Candidate Data
interface CandidateData {
  Add_Job: string;
  job_stage: number;
  [key: string]: any; // You can expand this with more fields if needed
}

const stages = [
  { value: 1, label: 'Screening' },
  { value: 2, label: 'Submissions' },
  { value: 3, label: 'Interview' },
  { value: 4, label: 'Offered' },
  { value: 5, label: 'Hired' },
  { value: 6, label: 'Rejected' },
  { value: 7, label: 'Archived' }
];

const JobStageDetails = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [candidateData, setCandidateData] = useState<CandidateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modifiedCandidates, setModifiedCandidates] = useState<CandidateData[]>([]); // Track modified candidates

  const clientKey = decodeURIComponent(pathname.split('/')[2]); // Extract clientKey from URL
  const stage = decodeURIComponent(pathname.split('/')[3]); // Extract stage from URL

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://demo4-backendurl.vercel.app/hiringpipeline/details');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: { [key: string]: CandidateData[] } = await response.json();

        if (clientKey && stage && data[clientKey]) {
          const filteredCandidates = data[clientKey].filter((candidate: CandidateData) => {
            switch (stage) {
              case 'screening':
                return candidate.job_stage === 1;
              case 'submissions':
                return candidate.job_stage === 2;
              case 'interview':
                return candidate.job_stage === 3;
              case 'offered':
                return candidate.job_stage === 4;
              case 'hired':
                return candidate.job_stage === 5;
              case 'rejected':
                return candidate.job_stage === 6;
              case 'archived':
                return candidate.job_stage === 7;
              default:
                return false;
            }
          });
          setCandidateData(filteredCandidates);
        } else {
          setError('Invalid client key or stage');
        }
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (clientKey && stage) {
      fetchCandidates();
    }
  }, [clientKey, stage]);

  const handleStageChange = (index: number, newStage: number) => {
    const updatedCandidates = [...candidateData];
    updatedCandidates[index].job_stage = newStage;
    setCandidateData(updatedCandidates);
    setModifiedCandidates(updatedCandidates); // Track modified candidates
  };

  const saveChanges = async () => {
    try {
      const response = await fetch('https://demo4-backendurl.vercel.app/update-job-stage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedCandidates.map(candidate => ({
          'First Name': candidate['First Name'],
          'Last Name': candidate['Last Name'],
          'Email': candidate.Email,
          'job_stage': candidate.job_stage
        }))),
      });

      if (!response.ok) {
        throw new Error('Failed to update job stage');
      }

      // Refetch updated data
      const updatedResponse = await fetch('https://demo4-backendurl.vercel.app/hiringpipeline/details');
      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated data');
      }
      const updatedData: { [key: string]: CandidateData[] } = await updatedResponse.json();

      if (clientKey && updatedData[clientKey]) {
        const updatedCandidates = updatedData[clientKey].filter((candidate: CandidateData) => {
          switch (stage) {
            case 'screening':
              return candidate.job_stage === 1;
            case 'submissions':
              return candidate.job_stage === 2;
            case 'interview':
              return candidate.job_stage === 3;
            case 'offered':
              return candidate.job_stage === 4;
            case 'hired':
              return candidate.job_stage === 5;
            case 'rejected':
              return candidate.job_stage === 6;
            case 'archived':
              return candidate.job_stage === 7;
            default:
              return false;
          }
        });
        setCandidateData(updatedCandidates);
      }

      alert('Changes saved and data updated successfully');
    } catch (error: any) {
      alert(error.message || 'An error occurred while saving changes');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Details for {clientKey} - {stage}</h1>
      <table className="candidate-table">
        <thead>
          <tr>
            {/* Table headers */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Mobile</th>
            <th>Current Employer</th>
            <th>Current Job Title</th>
            <th>Current Salary</th>
            <th>Expected Salary</th>
            <th>Experience</th>
            <th>Highest Qualification</th>
            <th>Skills</th>
            <th>Address</th>
            <th>Additional Info</th>
            <th>Actions</th> {/* Added Actions Column */}
          </tr>
        </thead>
        <tbody>
          {candidateData.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate['First Name']}</td>
              <td>{candidate['Last Name']}</td>
              <td>{candidate.Email}</td>
              <td>{candidate.Phone}</td>
              <td>{candidate.Mobile}</td>
              <td>{candidate['Professional Details']['Current Employer']}</td>
              <td>{candidate['Professional Details']['Current Job Title']}</td>
              <td>{candidate['Professional Details']['Current Salary']}</td>
              <td>{candidate['Professional Details']['Expected Salary']}</td>
              <td>{candidate['Professional Details']['Experience in Years']}</td>
              <td>{candidate['Professional Details']['Highest Qualification Held']}</td>
              <td>{candidate['Professional Details']['Skill Set'].join(', ')}</td>
              <td>
                {candidate['Address Information']['Street']}, {candidate['Address Information']['location']}, {candidate['Address Information']['Province']}, {candidate['Address Information']['Country']} - {candidate['Address Information']['Postal Code']}
              </td>
              <td>
                {candidate['Additional Info']['Candidate Owner']}<br />
                Status: {candidate['Additional Info']['Candidate Status']}<br />
                Source: {candidate['Additional Info']['Source']}<br />
                Email Opt Out: {candidate['Additional Info']['Email Opt Out'] ? 'Yes' : 'No'}<br />
                Facebook: {candidate['Additional Info']['Facebook']}<br />
                LinkedIn: {candidate['Additional Info']['LinkedIn']}<br />
                Twitter: {candidate['Additional Info']['Twitter']}
              </td>
              <td>
                <select
                  value={candidate.job_stage}
                  onChange={(e) => handleStageChange(index, parseInt(e.target.value))}
                >
                  {stages.map((stage) => (
                    <option key={stage.value} value={stage.value}>
                      {stage.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveChanges} className="save-button">Save</button> {/* Save Button */}
    </div>
  );
};

export default JobStageDetails;
