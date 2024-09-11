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

const DETAILS_API_URL = 'https://demo4-backendurl.vercel.app/zoho/getclient_id';
const UPDATE_Client_API_URL = 'https://demo4-backendurl.vercel.app/client/update';
const FETCH_CLIENTS_API_URL = 'https://demo4-backendurl.vercel.app/clients/getall'; // Add fetch clients API URL

interface Client {
  agency: string;
  clientManager: string;
  clientName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  industry: string;
  contactPerson1: ContactPerson;
  contactPerson2: ContactPerson;
  clientId: string;
}

const Clients: React.FC = () => {
  const [clientsData, setClientsData] = useState<Client[]>([]); // State for client data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const fetchClients = async () => {
    try {
      const response = await fetch(FETCH_CLIENTS_API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: Client[] = await response.json();
      setClientsData(data);
    } catch (error) {
      setError('Error fetching client data. Please try again later.');
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSave = () => {
    if (!selectedClient) return;

    const updateData = {
      agency: selectedClient.agency,
      clientManager: selectedClient.clientManager,
      clientName: selectedClient.clientName,
      email: selectedClient.email,
      phone: selectedClient.phone,
      address: selectedClient.address,
      website: selectedClient.website,
      industry: selectedClient.industry,
      contactPerson1: {
        name: selectedClient.contactPerson1?.name,
        email: selectedClient.contactPerson1?.email,
        phone: selectedClient.contactPerson1?.phone
      },
      contactPerson2: {
        name: selectedClient.contactPerson2?.name,
        email: selectedClient.contactPerson2?.email,
        phone: selectedClient.contactPerson2?.phone
      }
    };

    axios.put(`${UPDATE_Client_API_URL}/${selectedClient.clientId}`, updateData)
      .then(() => {
        fetchClients(); // Refetch clients after update
        setShowDetails(null);
      })
      .catch(error => console.error('Error updating client:', error));
  };

  const handleClientIdClick = (clientId: string) => {
    if (showDetails === clientId) {
      setShowDetails(null);
      return;
    }
    axios.get(`${DETAILS_API_URL}?clientId=${clientId}`)
      .then(response => {
        const data = response.data[0];
        setSelectedClient(data);
        setShowDetails(clientId);
      })
      .catch(error => console.error('Error fetching client details:', error));
  };

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
                <th>Client ID</th>
                <th>Agency</th>
                <th>Client Manager</th>
                <th>Client Name</th>
                <th>Contact Person 1</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.map((client) => (
                <tr key={client.clientId}>
                  <td className="client-id" onClick={() => handleClientIdClick(client.clientId)}>
                    {client.clientId}
                  </td>
                  <td>{client.agency}</td>
                  <td>{client.clientManager}</td>
                  <td>{client.clientName}</td>
                  <td>{client.contactPerson1.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showDetails && selectedClient && (
        <ClientDetails 
          client={selectedClient} 
          onChange={updatedClient => setSelectedClient(updatedClient)} 
          onSave={handleSave} 
          onClose={closeDetails} 
        />
      )}
    </div>
  );
};

export default Clients;
