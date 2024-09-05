'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import './postclient.scss'; // Import the SCSS file
import ZohoHeader from '@/app/zohoheader/page';

const PostClient = () => {
  const [clientName, setClientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [accountManager] = useState('NALLAMSETTY SRI RAMYA');
  const [industry, setIndustry] = useState('none');
  const [about, setAbout] = useState('');
  const [source] = useState('Added by User');
  const [parentClient, setParentClient] = useState('');
  const [fax, setFax] = useState('');
  const [website, setWebsite] = useState('');
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingProvince, setBillingProvince] = useState('');
  const [billingCode, setBillingCode] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingProvince, setShippingProvince] = useState('');
  const [shippingCode, setShippingCode] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');

  const handleSave = async () => {
    if (clientName.trim() === '') {
      alert('Client Name is required');
      return;
    }

    try {
      const response = await axios.post('https://demo4-backend.vercel.app/zoho/postclient', {
        clientName,
        contactNumber,
        accountManager,
        industry,
        about,
        source,
        parentClient,
        fax,
        website,
        billingStreet,
        billingCity,
        billingProvince,
        billingCode,
        billingCountry,
        shippingStreet,
        shippingCity,
        shippingProvince,
        shippingCode,
        shippingCountry
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
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountManager">Account Manager</label>
              <input
                type="text"
                id="accountManager"
                value={accountManager}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="industry">Industry</label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="none">None</option>
                <option value="tech">Technology</option>
<option value="healthcare">Healthcare</option>
<option value="finance">Finance</option>
< option value="ecommerce">E-commerce</option>
<option value="education">Education</option>
<option value="entertainment">Entertainment</option>
<option value="manufacturing">Manufacturing</option>
<option value="energy">Energy</option>
<option value="transportation">Transportation</option>
<option value="real_estate">Real Estate</option>

                {/* Add other industries here */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="about">About</label>
              <input
                type="text"
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="source">Source</label>
              <input
                type="text"
                id="source"
                value={source}
                disabled
              />
            </div>
          </div>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="parentClient">Parent Client</label>
              <input
                type="text"
                id="parentClient"
                value={parentClient}
                onChange={(e) => setParentClient(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fax">Fax</label>
              <input
                type="text"
                id="fax"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
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
          </div>
          <div className="form-section address-section">
            <h3>Address Information</h3>
            <div className="address-group">
              <div className="form-group">
                <label htmlFor="billingStreet">Billing Street</label>
                <input
                  type="text"
                  id="billingStreet"
                  value={billingStreet}
                  onChange={(e) => setBillingStreet(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billingCity">Billing City</label>
                <input
                  type="text"
                  id="billingCity"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billingProvince">Billing Province</label>
                <input
                  type="text"
                  id="billingProvince"
                  value={billingProvince}
                  onChange={(e) => setBillingProvince(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billingCode">Billing Code</label>
                <input
                  type="text"
                  id="billingCode"
                  value={billingCode}
                  onChange={(e) => setBillingCode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billingCountry">Billing Country</label>
                <input
                  type="text"
                  id="billingCountry"
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="address-group">
              <div className="form-group">
                <label htmlFor="shippingStreet">Shipping Street</label>
                <input
                  type="text"
                  id="shippingStreet"
                  value={shippingStreet}
                  onChange={(e) => setShippingStreet(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shippingCity">Shipping City</label>
                <input
                  type="text"
                  id="shippingCity"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shippingProvince">Shipping Province</label>
                <input
                  type="text"
                  id="shippingProvince"
                  value={shippingProvince}
                  onChange={(e) => setShippingProvince(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shippingCode">Shipping Code</label>
                <input
                  type="text"
                  id="shippingCode"
                  value={shippingCode}
                  onChange={(e) => setShippingCode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shippingCountry">Shipping Country</label>
                <input
                  type="text"
                  id="shippingCountry"
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
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
