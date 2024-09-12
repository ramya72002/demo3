'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './postjobopenings.scss';
import ZohoHeader from '@/app/zohoheader/page';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection


interface JobFormData {
  jobOpening: string;
  clientName: string;
  contactName?: string;
  Recruiter?: string;
  clientManager?: string;
  dateOpened?: string;
  targetDate: string;
  jobType?: string;
  jobOpeningStatus?: string;
  workExperience?: string;
  industry: string;
  requiredSkills?: string;
  salary?: string;
  location?: string;
  country?: string;
  province?: string;
  postalCode?: string;
  numberOfPositions?: number;
  jobDescription?: string;
}


const JobOpenings: React.FC = () => {
  const router = useRouter(); // Use useRouter for navigation
  const [formData, setFormData] = useState<JobFormData>({
    jobOpening: '',
    clientName: '',
    targetDate: '',
    industry: '',
    numberOfPositions: 1,
    jobDescription: '',
    dateOpened: new Date().toISOString().split('T')[0],
    jobOpeningStatus: 'Open',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [clients, setClients] = useState<{ clientName: string }[]>([]);

  const requiredFields: Array<keyof JobFormData> = ['jobOpening', 'clientName', 'targetDate', 'industry', 'jobDescription'];
  const [showModal, setShowModal] = useState<boolean>(false); // State to control modal visibility


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://demo4-backendurl.vercel.app/clients/getall');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const initialData: Partial<JobFormData> = {};

    requiredFields.forEach((field) => {
      const value = queryParams.get(field);
      if (value !== null) {
        // Cast value according to field type
        if (field === 'numberOfPositions') {
          initialData[field] = Number(value) as JobFormData[typeof field];
        } else {
          initialData[field] = value as JobFormData[typeof field];
        }
      }
    });

    // Handling clientManager field separately if needed
    const clientManager = queryParams.get('clientManager');
    if (clientManager !== null) {
      initialData.clientManager = clientManager;
    }

    if (Object.keys(initialData).length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      const response = await axios.post('https://demo4-backendurl.vercel.app/zoho/postjob', formData);
      if(response.status==201||response.status==200){
        setShowModal(true);
    }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };
  const handleYes = () => {
    setShowModal(false); // Close modal
    router.push(`/zoho/postcandidate?clientName=${encodeURIComponent(formData.clientName)}&jobOpening=${encodeURIComponent(formData.jobOpening)}`); // Redirect to the "Yes" page with query parameters
  };
  

  // Function to handle "No" button click
  const handleNo = () => {
    setShowModal(false); // Close modal
    router.push('/zoho/candidates'); // Redirect to the "No" page
  };

  return (
    <div>
      <ZohoHeader />
      <div className="job-openings">
        <button className="save-button" onClick={handleSave}>Save</button>
        <h2>Job Opening Information</h2>
        <div className="form-section">
          <div className="form-group">
            <label className={errors.includes('jobOpening') ? 'required' : ''}>
              Job Opening *
            </label>
            <input
              type="text"
              name="jobOpening"
              value={formData.jobOpening}
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
            <label>Recruiter</label>
            <select
              name="Recruiter"
              value={formData.Recruiter || ''}
              onChange={handleInputChange}
            >
              <option value="">Select Recruiter</option>
              <option value="ayesha">Ayesha</option>
              <option value="ramya">Ritika</option>
              <option value="rashika">Rashika</option>
              <option value="varsha">Varsha</option>
            </select>
          </div>
          <div className="form-group">
            <label>Client Manager</label>
            <select
              name="clientManager"
              value={formData.clientManager || ''}
              onChange={handleInputChange}
            >
              <option value="">Select Client Manager</option>
              <option value="ayesha">Ayesha</option>
              <option value="ramya">Ritika</option>
              <option value="rashika">Rashika</option>
              <option value="varsha">Varsha</option>
            </select>
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
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
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
              <option>Open</option>
              <option>Close</option>
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
              <option>Less than 1 year</option>
              <option>1-2 years</option>
              <option>3-5 years</option>
              <option>6-10 years</option>
              <option>More than 10 years</option>
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
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>E-commerce</option>
              <option>Education</option>
              <option>Entertainment</option>
              <option>Manufacturing</option>
                  <option>Energy</option>
                  <option>Transportation</option>
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
            <label>Salary Per Position</label>
            <select
  name="salary"
  value={formData.salary || ''}
  onChange={handleInputChange}
>
  <option value="">Select</option>
  <option>₹0 - ₹2,00,000</option>
  <option>₹2,00,001 - ₹5,00,000</option>
  <option>₹5,00,001 - ₹7,50,000</option>
  <option>₹7,50,001 - ₹10,00,000</option>
  <option>₹10,00,001 - ₹15,00,000</option>
  <option>₹15,00,001 - ₹20,00,000</option>
  <option>₹20,00,001 - ₹25,00,000</option>
  <option>₹25,00,001 - ₹30,00,000</option>
  <option>₹30,00,001 - ₹40,00,000</option>
  <option>₹40,00,001 - ₹50,00,000</option>
  <option>₹50,00,001 and above</option>
</select>

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

        <h2>Address Information</h2>
        <div className="form-section">
          <div className="form-group">
            <label>location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
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
          <option>Afghanistan</option>
          <option>Albania</option>
          <option>Algeria</option>
          <option>Andorra</option>
          <option>Angola</option>
          <option>Antigua and Barbuda</option>
          <option>Argentina</option>
          <option>Armenia</option>
          <option>Australia</option>
          <option>Austria</option>
          <option>Azerbaijan</option>
          <option>Bahamas</option>
          <option>Bahrain</option>
          <option>Bangladesh</option>
          <option>Barbados</option>
          <option>Belarus</option>
          <option>Belgium</option>
          <option>Belize</option>
          <option>Benin</option>
          <option>Bhutan</option>
          <option>Bolivia</option>
          <option>Bosnia and Herzegovina</option>
          <option>Botswana</option>
          <option>Brazil</option>
          <option>Brunei</option>
          <option>Bulgaria</option>
          <option>Burkina Faso</option>
          <option>Burundi</option>
          <option>Cabo Verde</option>
          <option>Cambodia</option>
    

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

        <h2>Job Information</h2>
        <div className="form-section">
          
          
          <div className="form-group">
            <label className={errors.includes('jobDescription') ? 'required' : ''}>
            jobDescription *
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription || ''}
              placeholder="Enter job description here..."
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Job saved successfully! Would you like to create Candidates?</p>
            <div className="modal-buttons">
              <button onClick={handleYes}>Yes</button>
              <button onClick={handleNo}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default JobOpenings;
