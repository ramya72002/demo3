'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './postjobopenings.scss';
import ZohoHeader from '@/app/zohoheader/page';

interface JobFormData {
  postingTitle: string;
  clientName: string;
  contactName?: string;
  accountManager?: string;
  assignedRecruiter?: string;
  dateOpened?: string;
  targetDate: string;
  jobType?: string;
  jobOpeningStatus?: string;
  workExperience?: string;
  industry: string;
  requiredSkills?: string;
  salary?: string;
  city?: string;
  country?: string;
  province?: string;
  postalCode?: string;
  revenuePerPosition?: number;
  actualRevenue?: number;
  expectedRevenue?: number;
  missedRevenue?: number;
  numberOfPositions?: number;
}

const JobOpenings: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    postingTitle: '',
    clientName: '',
    targetDate: '',
    industry: '',
    numberOfPositions: 1,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [clients, setClients] = useState<{ clientName: string }[]>([]);

  const requiredFields: Array<keyof JobFormData> = ['postingTitle', 'clientName', 'targetDate', 'industry'];

  useEffect(() => {
    // Function to fetch clients
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://demo4-backend.vercel.app/clients/getall');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []); // Empty dependency array ensures this runs only once

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = (): boolean => {
    const missingFields = requiredFields.filter((field) => !formData[field]);
    setErrors(missingFields as string[]);
    return missingFields.length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const response = await axios.post('https://demo4-backend.vercel.app/zoho/postjob', formData);
      alert('Job added successfully!');
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <div>
      <ZohoHeader />
      <div className="job-openings">
        <button className="save-button" onClick={handleSave}>Save</button>
        <h2>Job Opening Information</h2>
        <div className="form-section">
          <div className="form-group">
            <label className={errors.includes('postingTitle') ? 'required' : ''}>
              Posting Title *
            </label>
            <input
              type="text"
              name="postingTitle"
              value={formData.postingTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={errors.includes('clientName') ? 'required' : ''}>
              Client Name *
            </label>
            <select
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {clients.map((client) => (
                <option key={client.clientName} value={client.clientName}>
                  {client.clientName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Account Manager</label>
            <select
              name="accountManager"
              value={formData.accountManager || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>NALLAMSETTY SRI RAMYA</option>
            </select>
          </div>
          <div className="form-group">
            <label>Assigned Recruiter(s)</label>
            <input
              type="text"
              name="assignedRecruiter"
              value={formData.assignedRecruiter || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Date Opened</label>
            <input
              type="date"
              name="dateOpened"
              value={formData.dateOpened || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={errors.includes('targetDate') ? 'required' : ''}>
              Target Date *
            </label>
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <select
              name="jobType"
              value={formData.jobType || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>Full time</option>
            </select>
          </div>
          <div className="form-group">
            <label>Job Opening Status</label>
            <select
              name="jobOpeningStatus"
              value={formData.jobOpeningStatus || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>In-progress</option>
            </select>
          </div>
          <div className="form-group">
            <label>Work Experience</label>
            <select
              name="workExperience"
              value={formData.workExperience || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>None</option>
            </select>
          </div>
          <div className="form-group">
            <label className={errors.includes('industry') ? 'required' : ''}>
              Industry *
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>None</option>
            </select>
          </div>
          <div className="form-group">
            <label>Required Skills</label>
            <input
              type="text"
              name="requiredSkills"
              value={formData.requiredSkills || ''}
              placeholder="Search and add skills"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <select
              name="salary"
              value={formData.salary || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>None</option>
            </select>
          </div>
        </div>

        <h2>Address Information</h2>
        <div className="form-section">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <select
              name="country"
              value={formData.country || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>None</option>
            </select>
          </div>
          <div className="form-group">
            <label>Province</label>
            <input
              type="text"
              name="province"
              value={formData.province || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <h2>Revenue Information</h2>
        <div className="form-section">
          <div className="form-group">
            <label>Revenue per Position</label>
            <input
              type="number"
              name="revenuePerPosition"
              value={formData.revenuePerPosition || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Actual Revenue</label>
            <input
              type="number"
              name="actualRevenue"
              value={formData.actualRevenue || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Expected Revenue</label>
            <input
              type="number"
              name="expectedRevenue"
              value={formData.expectedRevenue || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Missed Revenue</label>
            <input
              type="number"
              name="missedRevenue"
              value={formData.missedRevenue || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className={errors.includes('numberOfPositions') ? 'required' : ''}>
            Number of Positions *
          </label>
          <input
            type="number"
            name="numberOfPositions"
            value={formData.numberOfPositions || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default JobOpenings;
