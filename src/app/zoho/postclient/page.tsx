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
  const [contactPerson1, setContactPerson1] = useState('');
  const [contactPerson2, setContactPerson2] = useState('');

  const handleSave = async () => {
    if (clientName.trim() === '' || email.trim() === '' || phone.trim() === '' || contactPerson1.trim() === '') {
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
        contactPerson1,
        contactPerson2
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
              <label htmlFor="agency">Agency <span>*</span></label>
              <select
                id="agency"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
              >
                <option value="">Select Agency</option>
                <option value="data">data</option>
                {/* Add agency options here */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="clientManager">Client Manager <span>*</span></label>
              <select
                id="clientManager"
                value={clientManager}
                onChange={(e) => setClientManager(e.target.value)}
              >
                <option value="">Select Client Manager</option>
                <option value="data">data</option>
                {/* Add client manager options here */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="clientName">Client Name <span>*</span></label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email <span>*</span></label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone <span>*</span></label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
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
              <label htmlFor="contactPerson1">Contact Person 1 <span>*</span></label>
              <input
                type="text"
                id="contactPerson1"
                value={contactPerson1}
                onChange={(e) => setContactPerson1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson2">Contact Person 2</label>
              <input
                type="text"
                id="contactPerson2"
                value={contactPerson2}
                onChange={(e) => setContactPerson2(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostClient;
