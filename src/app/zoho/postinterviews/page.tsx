'use client';
import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page';
import './postinterviews.scss';
import axios from 'axios';

const API_CANDIDATES_URL = 'https://demo4-backend.vercel.app/candidate/getall';
const API_JOB_POSTINGS_URL = 'https://demo4-backend.vercel.app/jobs/getall';
const API_POST_INTERVIEW_URL = 'https://demo4-backend.vercel.app/zoho/postinterview';

interface Candidate {
    _id: { $oid: string };
    "First Name": string;
    "Last Name": string;
}

interface JobPosting {
    clientName: string;
    postingTitle: string;
}

const Interviews = () => {
    const [formData, setFormData] = useState({
      interviewName: '',
      clientName: '',
      from: '09/05/2024 04:00 PM',
      interviewers: '',
      location: '',
      candidateName: '',
      postingTitle: '',
      to: '09/05/2024 05:00 PM',
      interviewOwner: 'NALLAMSETTY SRI RAMYA',
      scheduleComments: '',
      assessmentName: '',
    });
  
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

    useEffect(() => {
        axios.get<Candidate[]>(API_CANDIDATES_URL)
            .then((response) => setCandidates(response.data))
            .catch((error) => console.error('Error fetching candidates', error));
    }, []);

    useEffect(() => {
        axios.get<JobPosting[]>(API_JOB_POSTINGS_URL)
            .then((response) => setJobPostings(response.data))
            .catch((error) => console.error('Error fetching job postings', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post(API_POST_INTERVIEW_URL, formData)
            .then((response) => {
                console.log(response.data);
                alert('Interview added successfully');
            })
            .catch((error) => {
                console.error('Error saving interview', error);
                alert('Failed to add interview');
            });
    };

    return (
        <div>
            <ZohoHeader />
            <div className="interview-form-container">
                <h2>Interview Information</h2>
                <form onSubmit={handleSubmit} className="interview-form">
                    <div className="form-group">
                        <label>Candidate Name *</label>
                        <select name="candidateName" value={formData.candidateName} onChange={handleChange} required>
                            <option value="">Select Candidate</option>
                            {candidates.map((candidate, index) => (
                                <option key={index} value={`${candidate["First Name"]} ${candidate["Last Name"]}`}>
                                    {candidate["First Name"]} {candidate["Last Name"]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Client Name</label>
                        <select name="clientName" value={formData.clientName} onChange={handleChange}>
                            <option value="">Select Client</option>
                            {jobPostings.map((job, index) => (
                                <option key={index} value={job.clientName}>
                                    {job.clientName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>From *</label>
                        <input
                            type="text"
                            name="from"
                            value={formData.from}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Interviewer(s) *</label>
                        <input
                            type="text"
                            name="interviewers"
                            value={formData.interviewers}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Posting Title *</label>
                        <select name="postingTitle" value={formData.postingTitle} onChange={handleChange} required>
                            <option value="">Select Posting Title</option>
                            {jobPostings.map((job, index) => (
                                <option key={index} value={job.postingTitle}>
                                    {job.postingTitle}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>To *</label>
                        <input
                            type="text"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Interview Owner</label>
                        <input
                            type="text"
                            name="interviewOwner"
                            value={formData.interviewOwner}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Schedule Comments</label>
                        <input
                            type="text"
                            name="scheduleComments"
                            value={formData.scheduleComments}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Assessment Name</label>
                        <input
                            type="text"
                            name="assessmentName"
                            value={formData.assessmentName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="save-button">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Interviews;
