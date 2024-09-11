import React from 'react';
import './jobDetails.scss';
import {Job} from '../../types'

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
  onSave: (updatedJob: Partial<Job>) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Partial<Job>>(job);

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle job details update
  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="job-details-layer">
  <div className="job-details-content">
    <span className="close-btn" onClick={onClose}>&times;</span>
    <h3>Job Details</h3>
    <form>
      <p><strong>Posting Title:</strong> <input id="postingTitle" name="postingTitle" value={formData.postingTitle || ''} onChange={handleInputChange} /></p>
      <p><strong>Client Name:</strong> <input id="clientName" name="clientName" value={formData.clientName || ''} onChange={handleInputChange} /></p>
      <p><strong>Target Date:</strong> <input id="targetDate" name="targetDate" type="date" value={formData.targetDate || ''} onChange={handleInputChange} /></p>
      <p><strong>Industry:</strong> <input id="industry" name="industry" value={formData.industry || ''} onChange={handleInputChange} /></p>
      <p><strong>Number of Positions:</strong> <input id="numberOfPositions" name="numberOfPositions" type="number" value={formData.numberOfPositions || ''} onChange={handleInputChange} /></p>
      <p><strong>Description:</strong> <textarea id="description" name="description" value={formData.description || ''} onChange={handleInputChange} /></p>
      <p><strong>Client Manager:</strong> <input id="clientManager" name="clientManager" value={formData.clientManager || ''} onChange={handleInputChange} /></p>
      <p><strong>Contact Name:</strong> <input id="contactName" name="contactName" value={formData.contactName || ''} onChange={handleInputChange} /></p>
      <p><strong>City:</strong> <input id="city" name="city" value={formData.city || ''} onChange={handleInputChange} /></p>
      <p><strong>Province:</strong> <input id="province" name="province" value={formData.province || ''} onChange={handleInputChange} /></p>
      <p><strong>Postal Code:</strong> <input id="postalCode" name="postalCode" value={formData.postalCode || ''} onChange={handleInputChange} /></p>
      <p><strong>Account Manager:</strong> <input id="accountManager" name="accountManager" value={formData.accountManager || ''} onChange={handleInputChange} /></p>
      <p><strong>Date Opened:</strong> <input id="dateOpened" name="dateOpened" type="date" value={formData.dateOpened || ''} onChange={handleInputChange} /></p>
      <p><strong>Job Type:</strong> <input id="jobType" name="jobType" value={formData.jobType || ''} onChange={handleInputChange} /></p>
      <p><strong>Job Opening Status:</strong> <input id="jobOpeningStatus" name="jobOpeningStatus" value={formData.jobOpeningStatus || ''} onChange={handleInputChange} /></p>
      <p><strong>Work Experience:</strong> <input id="workExperience" name="workExperience" value={formData.workExperience || ''} onChange={handleInputChange} /></p>
      <p><strong>Required Skills:</strong> <input id="requiredSkills" name="requiredSkills" value={formData.requiredSkills || ''} onChange={handleInputChange} /></p>
      <p><strong>Salary:</strong> <input id="salary" name="salary" value={formData.salary || ''} onChange={handleInputChange} /></p>
      <p><strong>Revenue Per Position:</strong> <input id="revenuePerPosition" name="revenuePerPosition" value={formData.revenuePerPosition || ''} onChange={handleInputChange} /></p>
      <button type="button" onClick={handleSave}>Save</button>
    </form>
  </div>
</div>

  );
};

export default JobDetails;
