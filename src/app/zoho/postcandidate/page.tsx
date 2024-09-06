/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react';
import './postcandidate.scss';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';

const PostCandidate = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    mobile_number: '',
    fax: '',
    website: '',
    secondaryEmail: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
    experience: '',
    jobTitle: '',
    expectedSalary: '',
    skills: '',
    skypeId: '',
    qualification: '',
    employer: '',
    currentSalary: '',
    additionalInfo: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    candidateStatus: 'New',
    candidateOwner: '',
    resume: null as File | null,
    formattedResume: null as File | null,
    coverLetter: null as File | null,
    others: null as File | null,
  });

  const [resumeUploaded, setResumeUploaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files![0] : value,
    });
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Create a FormData object to send the file
        const uploadData = new FormData();
        uploadData.append('file', file);

        // Send the file to the API
        const response = await axios.post('https://demo4-backendurl.vercel.app/res', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Update the skills field with the extracted data
        if (response.data.data) {
          setFormData(prevState => ({
            ...prevState,
            name: response.data.data.name || "",               // Set name if available
            email: response.data.data.email || "",             // Set email if available
            mobile_number: response.data.data.mobile_number || "", // Set mobile number if available
            college_name: response.data.data.college_name || "",   // Set college name if available
            company_names: response.data.data.company_names || "", // Set company names if available
            degree: response.data.data.degree || "",           // Set degree if available
            designation: response.data.data.designation || "", // Set designation if available
            experience: response.data.data.experience || "",   // Set experience if available
            no_of_pages: response.data.data.no_of_pages || "", // Set no of pages if available
            skills: response.data.data.skills ? response.data.data.skills.join(', ') : "", // Convert skills array to comma-separated string
            total_experience: response.data.data.total_experience || 0 // Set total experience if available
          }));
        }
        
        setResumeUploaded(true); // Mark resume as uploaded
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    }
  };



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Prepare the data to send
    const payload = {
      "First Name": formData.name,
      "Last Name": formData.lastName,
      "Email": formData.email,
      "Phone": formData.phone,
      "Website": formData.website,
      "Secondary Email": formData.secondaryEmail,
      "Mobile": formData.mobile_number,
      "Fax": formData.fax,
      "Address Information": {
        "Street": formData.street,
        "Province": formData.province,
        "Country": formData.country,
        "City": formData.city,
        "Postal Code": formData.postalCode,
      },
      "Professional Details": {
        "Experience in Years": formData.experience,
        "Current Job Title": formData.jobTitle,
        "Expected Salary": formData.expectedSalary,
        "Skill Set": formData.skills.split(',').map(skill => skill.trim()),
        "Skype ID": formData.skypeId,
        "Highest Qualification Held": formData.qualification,
        "Current Employer": formData.employer,
        "Current Salary": formData.currentSalary,
      },
      "Additional Info": {
        "LinkedIn": formData.linkedin,
        "Twitter": formData.twitter,
        "Facebook": formData.facebook,
        "Candidate Status": formData.candidateStatus,
        "Candidate Owner": formData.candidateOwner,
        "Email Opt Out": false,
        "Source": "Added by User",
      },
      "Attachment Information": {
        "Resume": formData.resume ? URL.createObjectURL(formData.resume) : null,
        "Formatted Resume": formData.formattedResume ? URL.createObjectURL(formData.formattedResume) : null,
        "Cover Letter": formData.coverLetter ? URL.createObjectURL(formData.coverLetter) : null,
        "Others": formData.others ? URL.createObjectURL(formData.others) : null,
        "Offer": null,
        "Contracts": null,
      },
    };

    try {
      const response = await axios.post('https://demo4-backendurl.vercel.app/candidate/post', payload);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <ZohoHeader />
        <div className="form-container">
          {/* Resume Upload Section */}
          <div className="upload-resume-container">
            <label htmlFor="resume-upload" className="upload-label">
              <span className="upload-text">Upload Resume</span>
              <input
                type="file"
                id="resume-upload"
                className="upload-input"
                accept=".pdf, .doc, .docx"
                onChange={handleResumeChange}
              />
            </label>
            {formData.resume?.name && (
              <p className="resume-name">{formData.resume.name}</p>
            )}
            {resumeUploaded }
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            <h2>Basic Info</h2>
            <input name="firstName" placeholder="First Name" value={formData.name} onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input name="mobile" placeholder="Mobile" value={formData.mobile_number} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input name="fax" placeholder="Fax" value={formData.fax} onChange={handleChange} />
            <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
            <input name="secondaryEmail" placeholder="Secondary Email" value={formData.secondaryEmail} onChange={handleChange} />
            <h2>Address Information</h2>
            <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input name="province" placeholder="Province" value={formData.province} onChange={handleChange} />
            <input name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} />
            <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />

            <h2>Professional Details</h2>
            <input name="experience" placeholder="Experience in Years" value={formData.experience} onChange={handleChange} />
            <select name="jobTitle" value={formData.jobTitle} onChange={handleChange}>
              <option value="None">None</option>
              <option value="Software Engineer">Software Engineer</option>
              {/* Add more options as needed */}
            </select>
            <input name="expectedSalary" placeholder="Expected Salary" value={formData.expectedSalary} onChange={handleChange} />
            <input name="skills" placeholder="Skill Set (comma separated)" value={formData.skills} onChange={handleChange} />
            <input name="skypeId" placeholder="Skype ID" value={formData.skypeId} onChange={handleChange} />
            <select name="qualification" value={formData.qualification} onChange={handleChange}>
              <option value="None">None</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              {/* Add more options as needed */}
            </select>
            <input name="employer" placeholder="Current Employer" value={formData.employer} onChange={handleChange} />
            <input name="currentSalary" placeholder="Current Salary" value={formData.currentSalary} onChange={handleChange} />
            <textarea name="additionalInfo" placeholder="Additional Info" value={formData.additionalInfo} onChange={handleChange}></textarea>

            <h2>Additional Info</h2>
            <input name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
            <input name="facebook" placeholder="Facebook" value={formData.facebook} onChange={handleChange} />
            <input name="twitter" placeholder="Twitter" value={formData.twitter} onChange={handleChange} />
            <input name="candidateStatus" placeholder="Candidate Status" value={formData.candidateStatus} onChange={handleChange} />
            <input name="candidateOwner" placeholder="Candidate Owner" value={formData.candidateOwner} onChange={handleChange} />
            <textarea name="additionalInfo" placeholder="Additional Info" value={formData.additionalInfo} onChange={handleChange} />

            <button type="submit">Submit</button>
          </form>
        </div>
    </div>
  );
};

export default PostCandidate;
