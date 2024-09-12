'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZohoHeader from '@/app/zohoheader/page';
import './interviews.scss'
const API_INTERVIEWS_URL = 'https://demo4-backendurl.vercel.app/zoho/getinterviews';

interface Interview {
  _id: string;
  interviewName: string;
  from: string;
  to: string;
  candidateName: string;
  clientName: string;
  jobOpening: string;
  interviewStatus: string;
  interviewOwner: string;
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(API_INTERVIEWS_URL)
      .then((response) => {
        setInterviews(response.data.interviews);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching interviews');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ZohoHeader />
      <h2>Interviews</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Interview Name</th> */}
            <th>From</th>
            <th>To</th>
            <th>Candidate Name</th>
            <th>Client Name</th>
            <th>Posting Title</th>
            <th>Interview Status</th>
            <th>Interview Owner</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview._id}>
              {/* <td>{interview.interviewName}</td> */}
              <td>{interview.from}</td>
              <td>{interview.to}</td>
              <td>{interview.candidateName}</td>
              <td>{interview.clientName}</td>
              <td>{interview.jobOpening}</td>
              <td>{interview.interviewStatus}</td>
              <td>{interview.interviewOwner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Interviews;
