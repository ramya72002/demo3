'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import './postclient.scss';
import ZohoHeader from '@/app/zohoheader/page';

const PostClient: React.FC = () => {
  const [agency, setAgency] = useState<string>('');
  const [clientManager, setClientManager] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [contactPerson1Name, setContactPerson1Name] = useState<string>('');
  const [contactPerson1Email, setContactPerson1Email] = useState<string>('');
  const [contactPerson1Phone, setContactPerson1Phone] = useState<string>('');
  const [contactPerson2Name, setContactPerson2Name] = useState<string>('');
  const [contactPerson2Email, setContactPerson2Email] = useState<string>('');
  const [contactPerson2Phone, setContactPerson2Phone] = useState<string>('');
  const [clientOnBoardingDate, setClientOnBoardingDate] = useState<string>('');
  const [clientStatus, setClientStatus] = useState<string>('Active'); // New state for client status
  const [showModal, setShowModal] = useState<boolean>(false); // State to control modal visibility
  const router = useRouter(); // Use useRouter for navigation

  // Set today's date on component load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setClientOnBoardingDate(today);
  }, []);

  // Save handler
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
        industry,
        clientOnBoardingDate,
        clientStatus, // Pass clientStatus in the request
        contactPerson1: {
          name: contactPerson1Name,
          email: contactPerson1Email,
          phone: contactPerson1Phone,
        },
        contactPerson2: {
          name: contactPerson2Name,
          email: contactPerson2Email,
          phone: contactPerson2Phone,
        },
      });

      if (response.status === 201) {
        setShowModal(true); // Show modal on successful save
      } else {
        alert('Failed to save client data.');
      }
    } catch (error) {
      alert('An error occurred while saving client data.');
      console.error(error);
    }
  };

  // Function to handle "Yes" button click
  const handleYes = () => {
    setShowModal(false); // Close modal
    router.push(`/zoho/postjobopenings?clientName=${encodeURIComponent(clientName)}&clientManager=${encodeURIComponent(clientManager)}`); // Redirect to the "Yes" page with query parameters
  };

  // Function to handle "No" button click
  const handleNo = () => {
    setShowModal(false); // Close modal
    router.push('/zoho'); // Redirect to the "No" page
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
                <option value="rashika">Rashika</option>
                <option value="varsha">Varsha</option>
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
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="clientStatus">Client Status</label>
              <select
                id="clientStatus"
                value={clientStatus}
                onChange={(e) => setClientStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Close">Close</option>
              </select>
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
              <label htmlFor="clientOnBoardingDate">Client Onboarding Date</label>
              <input
                type="date"
                id="clientOnBoardingDate"
                value={clientOnBoardingDate}
                onChange={(e) => setClientOnBoardingDate(e.target.value)} // Allow user to change date
              />
            </div>
            <div className="form-group">
              <h3>Contact Person 1</h3>
              <label htmlFor="contactPerson1Name">Name <span className="required">*</span></label>
              <input
                type="text"
                id="contactPerson1Name"
                value={contactPerson1Name}
                onChange={(e) => setContactPerson1Name(e.target.value)}
                required
              />
              <label htmlFor="contactPerson1Email">Email <span className="required">*</span></label>
              <input
                type="email"
                id="contactPerson1Email"
                value={contactPerson1Email}
                onChange={(e) => setContactPerson1Email(e.target.value)}
                required
              />
              <label htmlFor="contactPerson1Phone">Phone <span className="required">*</span></label>
              <input
                type="text"
                id="contactPerson1Phone"
                value={contactPerson1Phone}
                onChange={(e) => setContactPerson1Phone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <h3>Contact Person 2</h3>
              <label htmlFor="contactPerson2Name">Name</label>
              <input
                type="text"
                id="contactPerson2Name"
                value={contactPerson2Name}
                onChange={(e) => setContactPerson2Name(e.target.value)}
              />
              <label htmlFor="contactPerson2Email">Email</label>
              <input
                type="email"
                id="contactPerson2Email"
                value={contactPerson2Email}
                onChange={(e) => setContactPerson2Email(e.target.value)}
              />
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Client data saved successfully! Would you like to create a job opening?</p>
            <div className="modal-buttons">
              <button className="modal-yes" onClick={handleYes}>Yes</button>
              <button className="modal-no" onClick={handleNo}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostClient;
