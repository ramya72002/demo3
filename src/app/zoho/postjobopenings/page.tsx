import React from 'react';
import './postjobopenings.scss'; // Import your CSS for styling
import ZohoHeader from '@/app/zohoheader/page';

const JobOpenings = () => {
  return (
    <div>
      <ZohoHeader />
    <div className="job-openings">
      
      <h2>Job Opening Information</h2>
      <div className="form-section">
        <div className="form-group">
          <label>Posting Title *</label>
          <input type="text" name="postingTitle" />
        </div>
        <div className="form-group">
          <label>Client Name *</label>
          <input type="text" name="clientName" />
        </div>
        <div className="form-group">
          <label>Contact Name</label>
          <input type="text" name="contactName" />
        </div>
        <div className="form-group">
          <label>Account Manager</label>
          <select name="accountManager">
            <option>NALLAMSETTY SRI RAMYA</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assigned Recruiter(s)</label>
          <input type="text" name="assignedRecruiter" />
        </div>
        <div className="form-group">
          <label>Date Opened</label>
          <input type="date" name="dateOpened" />
        </div>
        <div className="form-group">
          <label>Target Date *</label>
          <input type="date" name="targetDate" />
        </div>
        <div className="form-group">
          <label>Job Type</label>
          <select name="jobType">
            <option>Full time</option>
          </select>
        </div>
        <div className="form-group">
          <label>Job Opening Status</label>
          <select name="jobOpeningStatus">
            <option>In-progress</option>
          </select>
        </div>
        <div className="form-group">
          <label>Work Experience</label>
          <select name="workExperience">
            <option>None</option>
          </select>
        </div>
        <div className="form-group">
          <label>Industry *</label>
          <select name="industry">
            <option>None</option>
          </select>
        </div>
        <div className="form-group">
          <label>Required Skills</label>
          <input type="text" name="requiredSkills" placeholder="Search and add skills" />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <select name="salary">
            <option>None</option>
          </select>
        </div>
      </div>

      <h2>Address Information</h2>
      <div className="form-section">
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" />
        </div>
        <div className="form-group">
          <label>Country</label>
          <select name="country">
            <option>None</option>
          </select>
        </div>
        <div className="form-group">
          <label>Province</label>
          <input type="text" name="province" />
        </div>
        <div className="form-group">
          <label>Postal Code</label>
          <input type="text" name="postalCode" />
        </div>
      </div>

      <h2>Forecast Details</h2>
      <div className="form-section">
        <div className="form-group">
          <label>Revenue per Position</label>
          <input type="number" name="revenuePerPosition" />
        </div>
        <div className="form-group">
          <label>Actual Revenue</label>
          <input type="number" name="actualRevenue" />
        </div>
        <div className="form-group">
          <label>Expected Revenue</label>
          <input type="number" name="expectedRevenue" />
        </div>
        <div className="form-group">
          <label>Missed Revenue</label>
          <input type="number" name="missedRevenue" />
        </div>
        <div className="form-group">
          <label>Number of Positions</label>
          <input type="number" name="numberOfPositions" defaultValue={1} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default JobOpenings;
