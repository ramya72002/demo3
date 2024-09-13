import React from 'react';
import './zoho.scss'; // Ensure the styles are imported

interface CandidateData {
  [key: string]: any;
}
type Section = 'pipeline' | 'ageOfJob' | 'sectionOne' | 'sectionTwo' | 'sectionThree' | 'newSection' | 'upcoming';

interface HiringPipelineProps {
  isExpanded: boolean;
  toggleExpand: (section: Section) => void; // Use Section type
  candidateData: CandidateData;
}

const getCandidateStageCounts = (candidates: { candidateStage: string }[]) => {
  const stageCounts = {
    new: 0,
    inreview: 0,
    available: 0,
    engaged: 0,
    offered: 0,
    hired: 0,
    rejected: 0,
  };

  candidates.forEach((candidate) => {
    switch (candidate.candidateStage) {
      case 'new':
        stageCounts.new += 1;
        break;
      case 'inreview':
        stageCounts.inreview += 1;
        break;
      case 'available':
        stageCounts.available += 1;
        break;
      case 'engaged':
        stageCounts.engaged += 1;
        break;
      case 'offered':
        stageCounts.offered += 1;
        break;
      case 'hired':
        stageCounts.hired += 1;
        break;
      case 'rejected':
        stageCounts.rejected += 1;
        break;
      default:
        break;
    }
  });

  return stageCounts;
};

const stageColors: Record<string, string> = {
  new: '#4CAF50',      // Green
  inreview: '#2196F3', // Blue
  available: '#FFC107', // Yellow
  engaged: '#FF5722',  // Orange
  offered: '#009688',  // Teal
  hired: '#4CAF50',    // Green
  rejected: '#F44336', // Red
};

const HiringPipeline: React.FC<HiringPipelineProps> = ({ isExpanded, toggleExpand, candidateData }) => {
  return (
    <div className={`box1 ${isExpanded ? 'expanded' : ''}`}>
      <div className="pipelineHeader">
        <h2>Hiring Pipeline</h2>
        <button className="expandButton" onClick={() => toggleExpand('pipeline')}>
          {isExpanded ? '↘' : '↗'}
        </button>
      </div>
      <div className="pipeline">
        <table>
          <thead>
            <tr>
              <th>Job Opening / Client Name</th>
              <th>New</th>
              <th>In Review</th>
              <th>Available</th>
              <th>Engaged</th>
              <th>Offered</th>
              <th>Hired</th>
              <th>Rejected</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(candidateData).map((clientKey) =>
              Object.keys(candidateData[clientKey]).map((jobKey) => {
                const candidates = candidateData[clientKey][jobKey];
                const stageCounts = getCandidateStageCounts(candidates);

                return (
                  <tr key={jobKey}>
                    <td>{`${clientKey} / ${jobKey}`}</td>
                    <td><span className={`stageCount new`}>{stageCounts.new}</span></td>
                    <td><span className={`stageCount inreview`}>{stageCounts.inreview}</span></td>
                    <td><span className={`stageCount available`}>{stageCounts.available}</span></td>
                    <td><span className={`stageCount engaged`}>{stageCounts.engaged}</span></td>
                    <td><span className={`stageCount offered`}>{stageCounts.offered}</span></td>
                    <td><span className={`stageCount hired`}>{stageCounts.hired}</span></td>
                    <td><span className={`stageCount rejected`}>{stageCounts.rejected}</span></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HiringPipeline;
