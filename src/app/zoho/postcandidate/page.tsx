/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import './postcandidate.scss';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';

const PostCandidate = () => {
  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    state: '',
    experience: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    domain: '',
    skills: '',
    linkedIn: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCandidateInfo({
      ...candidateInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      ...candidateInfo,
      skills: candidateInfo.skills.split(',').map(skill => skill.trim()),
    };

    try {
      const response = await axios.post('http://127.0.0.1:80/candidate/post', payload);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ZohoHeader />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Basic Info</h2>
          {['name', 'email', 'phone', 'city', 'state', 'experience', 'currentCTC', 'expectedCTC', 'noticePeriod', 'domain', 'skills', 'linkedIn'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(candidateInfo as any)[field]}
              onChange={handleChange}
            />
          ))}
          
          <select name="gender" value={candidateInfo.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostCandidate;
