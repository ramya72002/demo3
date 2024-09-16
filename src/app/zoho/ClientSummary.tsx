// ClientSummary.tsx
'use client';

import React from 'react';
type Section = 'pipeline' | 'ageOfJob' | 'sectionOne' | 'sectionTwo' | 'sectionThree' | 'newSection' | 'upcoming';

interface ClientSummaryProps {
  isExpanded: boolean;
  toggleExpand: (section: Section) => void; // Use Section type
  activeCount: number;
  inactiveCount: number;
  totalCount: number;
  filteredClientNames: string[];
  clientJobs: { [key: string]: any };
  handleClientFilter: (filter: 'active' | 'inactive' | 'all') => void;
}

const ClientSummary: React.FC<ClientSummaryProps> = ({
  isExpanded,
  toggleExpand,
  activeCount,
  inactiveCount,
  totalCount,
  filteredClientNames,
  clientJobs,
  handleClientFilter
}) => {
  return (
    <div className={`box2 ${isExpanded ? 'expanded' : ''}`}>
      <div className="sectionHeader">
        <h2>Client Summary</h2>
        <button className="expandButton" onClick={() => toggleExpand('sectionOne')}>
          {isExpanded ? '↘' : '↗'}
        </button>
      </div>
      <div className="client-summary">
        <div className="client-card" onClick={() => handleClientFilter('active')}>
          <div className="client-info-box">
            <span className="client-number3">{activeCount}</span>
            <span className="client-label">Active Clients</span>
          </div>
        </div>
        <div className="client-card" onClick={() => handleClientFilter('inactive')}>
          <div className="client-info-box">
            <span className="client-number1">{inactiveCount}</span>
            <span className="client-label">Inactive Clients</span>
          </div>
        </div>
        <div className="client-card" onClick={() => handleClientFilter('all')}>
          <div className="client-info-box">
            <span className="client-number2">{totalCount}</span>
            <span className="client-label">All Clients</span>
          </div>
        </div>
      </div>
      <table className="client-data">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Job Opening</th>
            <th>Job Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientNames.length === 0 ? (
            <tr>
              <td colSpan={3}>No data available</td>
            </tr>
          ) : (
            filteredClientNames.map((clientName) =>
              clientJobs[clientName].map((job: any, index: number) => (
                <tr key={`${clientName}-${index}`}>
                  <td>{clientName}</td>
                  <td>{job.jobOpening}</td>
                  <td>{job.jobOpeningStatus}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientSummary;
