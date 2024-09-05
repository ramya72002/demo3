import ZohoHeader from '@/app/zohoheader/page';
import './zoho.scss';
import React from 'react';

const Page = () => {
  return (
    <div>
      <ZohoHeader />

      <div className="container">
        <div className="scrollable-content">
          
          {/* Boxed Sections */}
          <div className="box-container">

            {/* Hiring Pipeline Section */}
            <div className="box">
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

            {/* Age of Job Section */}
            <div className="box">
              <div className="timeToFillHeader">
                <h2>Age of Job</h2>
                <button className="expandButton">↗</button>
              </div>
              <div className="timeToFill">
                <div className="filter-buttons">
                  <button className="filterButton">Job Opening</button>
                  <button className="filterButton">Department</button>
                </div>
                <p>No records found</p>
              </div>
            </div>

            {/* Upcoming Section */}
            <div className="box">
              <div className="timeToHireHeader"> 
                <h2>Upcoming</h2>
                <button className="expandButton">↗</button>
              </div>
              <div className="timeToHire">
                <div className="filter-buttons">
                  <button className="filterButton">Candidate</button>
                  <button className="filterButton">Department</button>
                </div>
                <p>No records found</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
