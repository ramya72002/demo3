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
  onCandidateStageChange: (candidateId: string, candidateStage: string) => void;
}

const CandidateStage: React.FC<CandidateStageProps> = ({ stageCounts, onCandidateStageChange }) => {
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
    </div>
  );
};

export default CandidateStage;
