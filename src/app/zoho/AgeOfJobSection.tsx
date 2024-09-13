// AgeOfJobSection.tsx
import React from 'react';

interface JobData {
  jobOpening: string;
  numberOfPositions: number;
  targetDate: string;
}

interface AgeOfJobSectionProps {
  jobData: JobData[];
  isExpanded: boolean;
  toggleExpand: () => void;
  calculateJobAge: (targetDate: string) => number;
}

const AgeOfJobSection: React.FC<AgeOfJobSectionProps> = ({
  jobData,
  isExpanded,
  toggleExpand,
  calculateJobAge,
}) => {
  return (
    <div className={`box ${isExpanded ? 'expanded' : ''}`}>
      <div className="timeToFillHeader">
        <h2>Age of Job</h2>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? '↘' : '↗'}
        </button>
      </div>
      <div className="timeToFill">
        <div className="filter-buttons">
          <button className="filterButton">Job Opening</button>
          <button className="filterButton">Department</button>
        </div>
        {jobData.length > 0 ? (
          <table className="jobTable">
            <thead>
              <tr>
                <th>Job Opening</th>
                <th>No of positions</th>
                <th>Age of opened jobs</th>
                <th>Delay [IN DAYS]</th>
              </tr>
            </thead>
            <tbody>
              {jobData.map((job, index) => (
                <tr key={index}>
                  <td>{job.jobOpening || 'N/A'}</td>
                  <td>{job.numberOfPositions}</td>
                  <td>{calculateJobAge(job.targetDate)}</td>
                  <td>0</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found</p>
        )}
      </div>
    </div>
  );
};

export default AgeOfJobSection;
