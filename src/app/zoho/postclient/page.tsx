'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import './postclient.scss'; // Import the SCSS file
import ZohoHeader from '@/app/zohoheader/page';

const PostClient = () => {
  const [agency, setAgency] = useState('');
  const [clientManager, setClientManager] = useState('');
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactPerson1Name, setContactPerson1Name] = useState('');
  const [contactPerson1Email, setContactPerson1Email] = useState('');
  const [contactPerson1Phone, setContactPerson1Phone] = useState('');
  const [contactPerson2Name, setContactPerson2Name] = useState('');
  const [contactPerson2Email, setContactPerson2Email] = useState('');
  const [contactPerson2Phone, setContactPerson2Phone] = useState('');

  const handleSave = async () => {
    if (clientName.trim() === '' || contactPerson1Name.trim() === '' || contactPerson1Email.trim() === '' || contactPerson1Phone.trim() === '') {
      alert('Please fill in all mandatory fields');
      return;
    }

    try {
      const response = await axios.post('https://demo4-backendurl.vercel.app/zoho/postclient', {
        agency,
        clientManager,
        clientName,
        email,
        phone,
        address,
        website,
        industry,
        contactPerson1: {
          name: contactPerson1Name,
          email: contactPerson1Email,
          phone: contactPerson1Phone
        },
        contactPerson2: {
          name: contactPerson2Name,
          email: contactPerson2Email,
          phone: contactPerson2Phone
        }
      });

      if (response.status === 201) {
        alert('Client data saved successfully!');
      } else {
        alert('Failed to save client data.');
      }
    } catch (error) {
      alert('An error occurred while saving client data.');
      console.error(error);
    }
  };

  return (
    <div>
      <ZohoHeader />
      <div className="client-form-container">
        <div className="form-header">
          <h2>Client Information</h2>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
        <div className="form-content">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="agency">Agency</label>
              <select
                id="agency"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
              >
                <option value="">Select Agency</option>
                <option value="Morpheus">Morpheus</option>
                <option value="Talent Corner">Talent Corner</option>
                <option value="HR Frontiers">HR Frontiers</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="clientManager">Client Manager</label>
              <select
                id="clientManager"
                value={clientManager}
                onChange={(e) => setClientManager(e.target.value)}
              >
                <option value="">Select Client Manager</option>
                <option value="ayesha">Ayesha</option>
                <option value="ramya">Ritika</option>
                <option value="ayesha">Rashika</option>
                <option value="ramya">Varsha</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="clientName">Client Name <span className="required">*</span></label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="industry">Industry</label>
              <input
                type="text"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="form-group">
              <h3>Contact Person 1</h3>
              <div className="form-group">
                <label htmlFor="contactPerson1Name">Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="contactPerson1Name"
                  value={contactPerson1Name}
                  onChange={(e) => setContactPerson1Name(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson1Email">Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="contactPerson1Email"
                  value={contactPerson1Email}
                  onChange={(e) => setContactPerson1Email(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson1Phone">Phone <span className="required">*</span></label>
                <input
                  type="text"
                  id="contactPerson1Phone"
                  value={contactPerson1Phone}
                  onChange={(e) => setContactPerson1Phone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <h3>Contact Person 2 (Optional)</h3>
              <div className="form-group">
                <label htmlFor="contactPerson2Name">Name</label>
                <input
                  type="text"
                  id="contactPerson2Name"
                  value={contactPerson2Name}
                  onChange={(e) => setContactPerson2Name(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson2Email">Email</label>
                <input
                  type="email"
                  id="contactPerson2Email"
                  value={contactPerson2Email}
                  onChange={(e) => setContactPerson2Email(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson2Phone">Phone</label>
                <input
                  type="text"
                  id="contactPerson2Phone"
                  value={contactPerson2Phone}
                  onChange={(e) => setContactPerson2Phone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostClient;
