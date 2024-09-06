'use client'
import React, { useEffect, useState } from 'react';
import './joblist.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Job {
  'Company Name': string;
  'Job Title': string;
  location: string;
  skills: string[];
  'yrs of exp': number;
}

const Joblist: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('https://demo4-backendurl.vercel.app/joblist')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching job listings:', error));
  }, []);

  return (
    <div className="joblist">
      {jobs.map((job, index) => (
        <div className="job-card" key={index}>
          <h2 className="job-title">
            <i className="fas fa-briefcase"></i>{job['Job Title']}
          </h2>
          <h3 className="company-name">
            <i className="fas fa-building"></i>{job['Company Name']}
          </h3>
          <p className="location">
            <i className="fas fa-map-marker-alt"></i>{job.location}
          </p>
          <p className="experience">
            <i className="fas fa-calendar-alt"></i>Experience: {job['yrs of exp']} years
          </p>
          <div className="skills">
            {job.skills.map((skill, index) => (
              <span className="skill" key={index}>
                <i className="fas fa-star"></i>{skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Joblist;
