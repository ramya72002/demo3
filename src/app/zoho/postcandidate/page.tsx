/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react';
import './postcandidate.scss';
import ZohoHeader from '@/app/zohoheader/page';

const PostCandidate = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
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
    resume: null,
    formattedResume: null,
    coverLetter: null,
    others: null,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement; // Use type assertion here
    setFormData({
      ...formData,
      [name]: type === 'file' ? files![0] : value,
    });
  };
  

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <div>
        <ZohoHeader />

    
    <form onSubmit={handleSubmit}>
      <h2>Basic Info</h2>
      <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
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
      <input name="skills" placeholder="Skill Set" value={formData.skills} onChange={handleChange} />
      <input name="skypeId" placeholder="Skype ID" value={formData.skypeId} onChange={handleChange} />
      <select name="qualification" value={formData.qualification} onChange={handleChange}>
        <option value="None">None</option>
        <option value="Bachelor's">Bachelor's</option>
        <option value="Master's">Master's</option>
        {/* Add more options as needed */}
      </select>
      <input name="employer" placeholder="Current Employer" value={formData.employer} onChange={handleChange} />
      <input name="currentSalary" placeholder="Current Salary" value={formData.currentSalary} onChange={handleChange} />
      <textarea name="additionalInfo" placeholder="Additional Info" value={formData.additionalInfo} onChange={handleChange}></textarea>

      <h2>Social Links</h2>
      <input name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
      <input name="facebook" placeholder="Facebook" value={formData.facebook} onChange={handleChange} />
      <input name="twitter" placeholder="Twitter" value={formData.twitter} onChange={handleChange} />

      <h2>Other Info</h2>
      <select name="candidateStatus" value={formData.candidateStatus} onChange={handleChange}>
        <option value="New">New</option>
        <option value="Reviewed">Reviewed</option>
        {/* Add more options as needed */}
      </select>
      <input name="candidateOwner" placeholder="Candidate Owner" value={formData.candidateOwner} onChange={handleChange} />

      <h2>Attachment Information</h2>
      <input type="file" name="resume" onChange={handleChange} />
      <input type="file" name="formattedResume" onChange={handleChange} />
      <input type="file" name="coverLetter" onChange={handleChange} />
      <input type="file" name="others" onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default PostCandidate;
