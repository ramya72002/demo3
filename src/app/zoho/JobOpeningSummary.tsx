import React from 'react';

interface JobData {
  jobId: string;
  location: string;
  accountManager: string;
  clientName: string;
  contactName: string;
  industry: string;
  jobType: string;
  numberOfPositions: number;
  jobOpening: string;
  targetDate: string;
  jobOpeningStatus: string;
}

type Section = 'pipeline' | 'ageOfJob' | 'sectionOne' | 'sectionTwo' | 'sectionThree' | 'newSection' | 'upcoming';

interface JobOpeningSummaryProps {
  jobData: JobData[];
  activeJobCount: number;
  inactiveJobCount: number;
  totalJobCount: number;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const JobOpeningSummary: React.FC<JobOpeningSummaryProps> = ({
  jobData,
  activeJobCount,
  inactiveJobCount,
  totalJobCount,
  isExpanded,
  toggleExpand,
}) => {
  return (
    <div className={`box ${isExpanded ? 'expanded' : ''}`}>
      <div className="sectionHeader">
        <h2>Job Opening Summary</h2>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? '↘' : '↗'}
        </button>
      </div>
      <div className="client-summary">
        <div className="client-card">
          <div className="client-info-box">
            <span
              className="client-number3"
              onClick={() => window.location.href = '/zoho/jobopenings?jobOpeningStatus=Open'}
            >
              {activeJobCount}
            </span>
            <span className="client-label">Active Job Openings</span>
          </div>
        </div>
        <div className="client-card">
          <div className="client-info-box">
            <span
              className="client-number1"
              onClick={() => window.location.href = '/zoho/jobopenings?jobOpeningStatus=Close'}
            >
              {inactiveJobCount}
            </span>
            <span className="client-label">Inactive Job Openings</span>
          </div>
        </div>
        <div className="client-card">
          <div className="client-info-box">
            <span
              className="client-number2"
              onClick={() => window.location.href = '/zoho/jobopenings'}
            >
              {totalJobCount}
            </span>
            <span className="client-label">Total Job Openings</span>
          </div>
        </div>
      </div>
      {isExpanded && (
        <table className="client-data">
          <thead>
            <tr>
              {/* <th>Job ID</th> */}
              <th>Job Opening</th>
              <th>Client Name</th>
              {/* <th>Target Date</th>
              <th>Job Opening Status</th>
              <th>Location</th>
              <th>Client Manager</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((job) => (
              <tr key={job.jobId}>
                {/* <td>{job.jobId}</td> */}
                <td>{job.jobOpening}</td>
                <td>{job.clientName}</td>
                {/* <td>{job.targetDate}</td>
                <td>{job.jobOpeningStatus}</td>
                <td>{job.location || 'N/A'}</td>
                <td>{job.accountManager || 'N/A'}</td> */}
                <td>{job.jobOpeningStatus === 'Open' ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobOpeningSummary;
