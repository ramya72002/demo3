'use client';

import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page'; // Import ZohoHeader
import './clients.scss'; // Import SCSS for styling
import axios from 'axios';
import ClientDetails from './clientDetails'; // Import the new ClientDetails component

interface ContactPerson {
  name: string;
  email?: string;
  phone?: string;
}

interface Job {
  jobOpening: string;
  clientName: string;
  jobOpeningStatus: string;
  jobId: string;
}

const DETAILS_API_URL = 'https://demo4-backendurl.vercel.app/zoho/getclient_id';
const UPDATE_CLIENT_API_URL = 'https://demo4-backendurl.vercel.app/client/update';
const FETCH_CLIENTS_API_URL = 'https://demo4-backendurl.vercel.app/clients/getall';
const FETCH_JOBS_API_URL = 'https://demo4-backendurl.vercel.app/jobs/getall';

interface Client {
  agency: string;
  clientManager: string;
  clientName: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  contactPerson1: ContactPerson;
  contactPerson2: ContactPerson;
  clientId: string;
  clientOnBoardingDate: string;
  clientStatus: string;
}

const Clients: React.FC = () => {
  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchClients = async () => {
    try {
      const { data } = await axios.get<Client[]>(FETCH_CLIENTS_API_URL);
      setClientsData(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get<Job[]>(FETCH_JOBS_API_URL);
      setJobs(data);
    } catch (err) {
      handleError(err);
    }
  };

  const areAllJobsClosed = (clientName: string): boolean => {
    const clientJobs = jobs.filter(job => job.clientName === clientName);
    return clientJobs.every(job => job.jobOpeningStatus === 'Close');
  };

  const handleStatusChange = async (clientId: string, newStatus: string) => {
    if (newStatus === 'Inactive') {
      // Fetch jobs before proceeding
      await fetchJobs();
      
      const client = clientsData.find(client => client.clientId === clientId);
      if (client && !areAllJobsClosed(client.clientName)) {
        alert('Cannot set status to Inactive. Some job openings are still open.');
        return;
      }
    }

    try {
      await axios.put(`${UPDATE_CLIENT_API_URL}/${clientId}`, { clientStatus: newStatus });
      fetchClients();
    } catch (err) {
      handleError(err);
    }
  };

  const handleClientIdClick = async (clientId: string) => {
    if (showDetails === clientId) {
      setShowDetails(null);
      return;
    }
    try {
      const { data } = await axios.get<Client[]>(`${DETAILS_API_URL}?clientId=${clientId}`);
      setSelectedClient(data[0]);
      setShowDetails(clientId);
    } catch (err) {
      handleError(err);
    }
  };

  const handleSave = async () => {
    if (!selectedClient) return;

    try {
      await axios.put(`${UPDATE_CLIENT_API_URL}/${selectedClient.clientId}`, selectedClient);
      fetchClients();
      setShowDetails(null);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err: any) => {
    setError('Error fetching or updating data. Please try again later.');
    console.error(err);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const closeDetails = () => setShowDetails(null);

  return (
    <div>
      <ZohoHeader />
      <div className="clients-container">
        <h2>Clients List</h2>
        {loading ? (
          <p>Loading clients data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="clients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>Agency</th>
                <th>OnBoarding Date</th>
                <th>Client Manager</th>
                <th>Client Status</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.map((client) => (
                <tr key={client.clientId}>
                  <td className="client-id" onClick={() => handleClientIdClick(client.clientId)}>
                    {client.clientId}
                  </td>
                  <td>{client.clientName}</td>
                  <td>{client.agency}</td>
                  <td>{client.clientOnBoardingDate}</td>
                  <td>{client.clientManager}</td>
                  <td>
                    <select 
                      value={client.clientStatus} 
                      onChange={(e) => handleStatusChange(client.clientId, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showDetails && selectedClient && (
        <ClientDetails 
          client={selectedClient} 
          onChange={setSelectedClient} 
          onSave={handleSave} 
          onClose={closeDetails} 
        />
      )}
    </div>
  );
};

export default Clients;
