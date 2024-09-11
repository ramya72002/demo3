/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect } from 'react';
import './postcandidate.scss';
import ZohoHeader from '@/app/zohoheader/page';
import axios from 'axios';
import { Job } from '@/app/types';

const PostCandidate = () => {
  // Initialize state, including candidateDate with the current date
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
    clientName: '',
    postingTitle: '',
    candidateDate: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  });

  const [clientNames, setClientNames] = useState<string[]>([]);
  const [postingTitles, setPostingTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('https://demo4-backendurl.vercel.app/jobs/getall');
        const jobs = response.data;

        const uniqueClientNames = Array.from(new Set(jobs.map((job) => job.clientName)));
        setClientNames(uniqueClientNames);

        const initialClientName = uniqueClientNames[0];
        const filteredJobs = jobs.filter((job) => job.clientName === initialClientName);
        const uniquePostingTitles = Array.from(new Set(filteredJobs.map((job) => job.postingTitle)));
        setPostingTitles(uniquePostingTitles);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCandidateInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'clientName') {
      const selectedClientName = value;
      setCandidateInfo(prevState => ({
        ...prevState,
        clientName: selectedClientName,
        postingTitle: ''
      }));

      const fetchPostingTitles = async () => {
        try {
          const response = await axios.get<Job[]>('https://demo4-backendurl.vercel.app/jobs/getall');
          const jobs = response.data;
          const filteredJobs = jobs.filter((job) => job.clientName === selectedClientName);
          const uniquePostingTitles = Array.from(new Set(filteredJobs.map((job) => job.postingTitle)));
          setPostingTitles(uniquePostingTitles);
        } catch (error) {
          console.error('Error fetching posting titles:', error);
        }
      };

      fetchPostingTitles();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...candidateInfo,
      skills: candidateInfo.skills.split(',').map(skill => skill.trim()),
    };

    try {
      const response = await axios.post('https://demo4-backendurl.vercel.app/candidate/post', payload);
      console.log('Success:', response.data);
      if (response.status === 201) {
        alert('Candidate details added');
      }
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
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                id={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(candidateInfo as any)[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender" value={candidateInfo.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <select name="clientName" id="clientName" value={candidateInfo.clientName} onChange={handleChange}>
              <option value="">Select Client Name</option>
              {clientNames.map((clientName) => (
                <option key={clientName} value={clientName}>{clientName}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="postingTitle">Posting Title</label>
            <select name="postingTitle" id="postingTitle" value={candidateInfo.postingTitle} onChange={handleChange}>
              <option value="">Select Posting Title</option>
              {postingTitles.map((postingTitle) => (
                <option key={postingTitle} value={postingTitle}>{postingTitle}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="candidateDate">Candidate Date</label>
            <input
              type="date"
              id="candidateDate"
              name="candidateDate"
              value={candidateInfo.candidateDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostCandidate;
