// CandidateStage.tsx
import React from 'react';

interface StageCounts {
  new: number;
  inreview: number;
  available: number;
  engaged: number;
  offered: number;
  hired: number;
  rejected: number;
}

interface CandidateStageProps {
  stageCounts: StageCounts;
  onFilterChange: (filter: any) => void; // Adjust this type as needed
  filter: any; // Adjust this type as needed
  onCandidateStageChange: (candidateId: string, candidateStage: string) => void;
}

const CandidateStage: React.FC<CandidateStageProps> = ({ stageCounts, onFilterChange, filter, onCandidateStageChange }) => {
  return (
    <div>
      <h2>Candidate Stage</h2>
      <div className="candidate-stages">
        {Object.keys(stageCounts).map(stage => (
          <div key={stage} className="stage">
            <span>{stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
            <span>{stageCounts[stage as keyof typeof stageCounts]}</span>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      {/* <div className="filters">
        <input
          type="text"
          placeholder="Filter by ID"
          value={filter.candidateId}
          onChange={(e) => onFilterChange({ ...filter, candidateId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Name"
          value={filter.name}
          onChange={(e) => onFilterChange({ ...filter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Client Name"
          value={filter.clientName}
          onChange={(e) => onFilterChange({ ...filter, clientName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Job Opening"
          value={filter.jobOpening}
          onChange={(e) => onFilterChange({ ...filter, jobOpening: e.target.value })}
        />
        <select
          value={filter.candidateStage}
          onChange={(e) => onFilterChange({ ...filter, candidateStage: e.target.value })}
        >
          <option value="">All Stages</option>
          <option value="new">New</option>
          <option value="inreview">In Review</option>
          <option value="available">Available</option>
          <option value="engaged">Engaged</option>
          <option value="offered">Offered</option>
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
        </select>
      </div> */}
    </div>
  );
};

export default CandidateStage;
