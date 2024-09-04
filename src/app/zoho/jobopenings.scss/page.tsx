import './dashboard.scss';
import React from 'react';
import ZohoHeader from '@/app/zohoheader/page';

const Page = () => {
  return (
    
    <div className="container">
        <ZohoHeader />
      <div className="pipelineHeader">
        <h1>Hiring Pipeline</h1>
        <button className="expandButton">↗</button>
      </div>
      <div className="pipeline">
        <div className="headerRow">
          <span className="title">Posting Title / Client Name</span>
          <div className="stages">
            <span>Screening</span>
            <span>Submissions</span>
            <span>Interview</span>
            <span>Offered</span>
            <span>Hired</span>
            <span>Rejected</span>
            <span>Archived</span>
          </div>
        </div>
        <div className="pipelineRow">
          <div className="clientInfo">
            <span className="recruiter">recruiter (2)</span>
            <span className="clientName">hr frontiers</span>
          </div>
          <div className="interviewStage">
            <span className="interviewCount">2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
