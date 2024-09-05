/* eslint-disable react/no-unescaped-entities */
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
                  <option>Closed</option>
                  <option>Pending</option>
                  <option>Filled</option>
                  <option>On Hold</option>
                  <option>Expired</option>
                  <option>Interviewing</option>
                  <option>Offer Extended</option>
                  <option>Rejected</option>
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
            <label>Salary</label>
            <select
              name="salary"
              value={formData.salary || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>$0 - $25,000</option>
<option>$25,001 - $50,000</option>
<option>$50,001 - $75,000</option>
<option>$75,001 - $100,000</option>
<option>$100,001 - $125,000</option>
<option>$125,001 - $150,000</option>
<option>$150,001 - $175,000</option>
<option>$175,001 - $200,000</option>
<option>$200,001 - $250,000</option>
<option>$250,001 - $300,000</option>
<option>$300,001 - $400,000</option>
<option>$400,001 - $500,000</option>
<option>$500,001 and above</option>

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
          <option>Cameroon</option>
          <option>Canada</option>
          <option>Central African Republic</option>
          <option>Chad</option>
          <option>Chile</option>
          <option>China</option>
          <option>Colombia</option>
          <option>Comoros</option>
          <option>Congo, Democratic Republic of the</option>
          <option>Congo, Republic of the</option>
          <option>Costa Rica</option>
          <option>Cote d'Ivoire</option>
          <option>Croatia</option>
          <option>Cuba</option>
          <option>Cyprus</option>
          <option>Czech Republic</option>
          <option>Denmark</option>
          <option>Djibouti</option>
          <option>Dominica</option>
          <option>Dominican Republic</option>
          <option>East Timor</option>
          <option>Ecuador</option>
          <option>Egypt</option>
          <option>El Salvador</option>
          <option>Equatorial Guinea</option>
          <option>Eritrea</option>
          <option>Estonia</option>
          <option>Eswatini</option>
          <option>Ethiopia</option>
          <option>Fiji</option>
          <option>Finland</option>
          <option>France</option>
          <option>Gabon</option>
          <option>The Gambia</option>
          <option>Georgia</option>
          <option>Germany</option>
          <option>Ghana</option>
          <option>Greece</option>
          <option>Grenada</option>
          <option>Guatemala</option>
          <option>Guinea</option>
          <option>Guinea-Bissau</option>
          <option>Guyana</option>
          <option>Haiti</option>
          <option>Honduras</option>
          <option>Hungary</option>
          <option>Iceland</option>
          <option>India</option>
          <option>Indonesia</option>
          <option>Iran</option>
          <option>Iraq</option>
          <option>Ireland</option>
          <option>Israel</option>
          <option>Italy</option>
          <option>Jamaica</option>
          <option>Japan</option>
          <option>Jordan</option>
          <option>Kazakhstan</option>
          <option>Kenya</option>
          <option>Kiribati</option>
          <option>Korea, North</option>
          <option>Korea, South</option>
          <option>Kosovo</option>
          <option>Kuwait</option>
          <option>Kyrgyzstan</option>
          <option>Laos</option>
          <option>Latvia</option>
          <option>Lebanon</option>
          <option>Lesotho</option>
          <option>Liberia</option>
          <option>Libya</option>
          <option>Liechtenstein</option>
          <option>Lithuania</option>
          <option>Luxembourg</option>
          <option>Madagascar</option>
          <option>Malawi</option>
          <option>Malaysia</option>
          <option>Maldives</option>
          <option>Mali</option>
          <option>Malta</option>
          <option>Marshall Islands</option>
          <option>Mauritania</option>
          <option>Mauritius</option>
          <option>Mexico</option>
          <option>Micronesia</option>
          <option>Moldova</option>
          <option>Monaco</option>
          <option>Mongolia</option>
          <option>Montenegro</option>
          <option>Morocco</option>
          <option>Mozambique</option>
          <option>Myanmar</option>
          <option>Namibia</option>
          <option>Nauru</option>
          <option>Nepal</option>
          <option>Netherlands</option>
          <option>New Zealand</option>
          <option>Nicaragua</option>
          <option>Niger</option>
          <option>Nigeria</option>
          <option>North Macedonia</option>
          <option>Norway</option>
          <option>Oman</option>
          <option>Pakistan</option>
          <option>Palau</option>
          <option>Panama</option>
          <option>Papua New Guinea</option>
          <option>Paraguay</option>
          <option>Peru</option>
          <option>Philippines</option>
          <option>Poland</option>
          <option>Portugal</option>
          <option>Qatar</option>
          <option>Romania</option>
          <option>Russia</option>
          <option>Rwanda</option>
          <option>Saint Kitts and Nevis</option>
          <option>Saint Lucia</option>
          <option>Saint Vincent and the Grenadines</option>
          <option>Samoa</option>
          <option>San Marino</option>
          <option>Sao Tome and Principe</option>
          <option>Saudi Arabia</option>
          <option>Senegal</option>
          <option>Serbia</option>
          <option>Seychelles</option>
          <option>Sierra Leone</option>
          <option>Singapore</option>
          <option>Slovakia</option>
          <option>Slovenia</option>
          <option>Solomon Islands</option>
          <option>Somalia</option>
          <option>South Africa</option>
          <option>South Sudan</option>
          <option>Spain</option>
          <option>Sri Lanka</option>
          <option>Sudan</option>
          <option>Suriname</option>
          <option>Sweden</option>
          <option>Switzerland</option>
          <option>Syria</option>
          <option>Taiwan</option>
          <option>Tajikistan</option>
          <option>Tanzania</option>
          <option>Thailand</option>
          <option>Togo</option>
          <option>Tonga</option>
          <option>Trinidad and Tobago</option>
          <option>Tunisia</option>
          <option>Turkey</option>
          <option>Turkmenistan</option>
          <option>Tuvalu</option>
          <option>Uganda</option>
          <option>Ukraine</option>
          <option>United Arab Emirates</option>
          <option>United Kingdom</option>
          <option>United States</option>
          <option>Uruguay</option>
          <option>Uzbekistan</option>
          <option>Vanuatu</option>
          <option>Vatican City</option>
          <option>Venezuela</option>
          <option>Vietnam</option>
          <option>Yemen</option>
          <option>Zambia</option>
          <option>Zimbabwe</option>

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
