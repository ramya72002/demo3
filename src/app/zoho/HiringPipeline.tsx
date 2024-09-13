// components/HiringPipeline.tsx
import React from 'react';
import './zoho.scss'; // Make sure the styles are imported here as well

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

const HiringPipeline: React.FC<HiringPipelineProps> = ({ isExpanded, toggleExpand, candidateData }) => {
  return (
    <div className={`box ${isExpanded ? 'expanded' : ''}`}>
      <div className="pipelineHeader">
        <h1>Hiring Pipeline</h1>
        <button className="expandButton" onClick={() => toggleExpand('pipeline')}>
          {isExpanded ? '↘' : '↗'}
        </button>
      </div>
      <div className="pipeline">
        <div className="headerRow">
          <span className="title">Job Opening / Client Name</span>
          <div className="stages">
            <span>New</span>
            <span>In Review</span>
            <span>Available</span>
            <span>Engaged</span>
            <span>Offered</span>
            <span>Hired</span>
            <span>Rejected</span>
          </div>
        </div>

        {Object.keys(candidateData).map((clientKey) => (
          <div key={clientKey} className="clientSection">
            {Object.keys(candidateData[clientKey]).map((jobKey) => {
              const candidates = candidateData[clientKey][jobKey];
              const stageCounts = getCandidateStageCounts(candidates);

              return (
                <div key={jobKey} className="jobSection">
                  <h3>{clientKey}/{jobKey}</h3>
                  <div className="stages">
                    <span className="stageCount new">{stageCounts.new}</span>
                    <span className="stageCount inreview">{stageCounts.inreview}</span>
                    <span className="stageCount available">{stageCounts.available}</span>
                    <span className="stageCount engaged">{stageCounts.engaged}</span>
                    <span className="stageCount offered">{stageCounts.offered}</span>
                    <span className="stageCount hired">{stageCounts.hired}</span>
                    <span className="stageCount rejected">{stageCounts.rejected}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiringPipeline;
