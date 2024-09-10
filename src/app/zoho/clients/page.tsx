'use client';

import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page'; // Import ZohoHeader
import './clients.scss'; // Import SCSS for styling
import axios from 'axios';

// Interface for the client data with relevant fields
interface ContactPerson {
  name: string;
  email?: string;
  phone?: string;
}

const DETAILS_API_URL = 'http://127.0.0.1:80/zoho/getclient_id';
const UPDATE_Client_API_URL = 'http://127.0.0.1:80/client/update';
const FETCH_CLIENTS_API_URL = 'http://127.0.0.1:80/clients/getall'; // Add fetch clients API URL

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

  // Fetch clients from the API
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
        {/* Loading and Error Handling */}
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
              {clientsData.length > 0 ? (
                clientsData.map((client) => (
                  <React.Fragment key={client.clientId}>
                    <tr>
                      <td onClick={() => handleClientIdClick(client.clientId)} style={{ cursor: 'pointer' }}>
                        {client.clientId}
                      </td>
                      <td>{client.agency || 'N/A'}</td>
                      <td>{client.clientManager || 'N/A'}</td>
                      <td>{client.clientName || 'N/A'}</td>
                      <td>{client.contactPerson1?.name || 'N/A'}</td>
                    </tr>
                    {showDetails === client.clientId && selectedClient && (
                      <tr>
                        <td colSpan={5}>
                          <div className="client-details-layer">
                            <div className="client-details-content">
                              <span className="close-btn" onClick={closeDetails}>&times;</span>
                              <h3>Edit Client Details</h3>
                              <p><strong>Agency:</strong> <input type="text" value={selectedClient.agency} onChange={e => setSelectedClient({ ...selectedClient, agency: e.target.value })} /></p>
                              <p><strong>Client Manager:</strong> <input type="text" value={selectedClient.clientManager} onChange={e => setSelectedClient({ ...selectedClient, clientManager: e.target.value })} /></p>
                              <p><strong>Client Name:</strong> <input type="text" value={selectedClient.clientName} onChange={e => setSelectedClient({ ...selectedClient, clientName: e.target.value })} /></p>
                              <p><strong>Email:</strong> <input type="email" value={selectedClient.email} onChange={e => setSelectedClient({ ...selectedClient, email: e.target.value })} /></p>
                              <p><strong>Phone:</strong> <input type="tel" value={selectedClient.phone} onChange={e => setSelectedClient({ ...selectedClient, phone: e.target.value })} /></p>
                              <p><strong>Address:</strong> <input type="text" value={selectedClient.address} onChange={e => setSelectedClient({ ...selectedClient, address: e.target.value })} /></p>
                              <p><strong>Website:</strong> <input type="text" value={selectedClient.website} onChange={e => setSelectedClient({ ...selectedClient, website: e.target.value })} /></p>
                              <p><strong>Industry:</strong> <input type="text" value={selectedClient.industry} onChange={e => setSelectedClient({ ...selectedClient, industry: e.target.value })} /></p>
                              <p><strong>Contact Person 1 Name:</strong> <input type="text" value={selectedClient.contactPerson1.name} onChange={e => setSelectedClient({ ...selectedClient, contactPerson1: { ...selectedClient.contactPerson1, name: e.target.value } })} /></p>
                              <p><strong>Contact Person 1 Email:</strong> <input type="email" value={selectedClient.contactPerson1.email || ''} onChange={e => setSelectedClient({ ...selectedClient, contactPerson1: { ...selectedClient.contactPerson1, email: e.target.value } })} /></p>
                              <p><strong>Contact Person 1 Phone:</strong> <input type="tel" value={selectedClient.contactPerson1.phone || ''} onChange={e => setSelectedClient({ ...selectedClient, contactPerson1: { ...selectedClient.contactPerson1, phone: e.target.value } })} /></p>
                              <p><strong>Contact Person 2 Name:</strong> <input type="text" value={selectedClient.contactPerson2.name || ''} onChange={e => setSelectedClient({ ...selectedClient, contactPerson2: { ...selectedClient.contactPerson2, name: e.target.value } })} /></p>
                              <p><strong>Contact Person 2 Email:</strong> <input type="email" value={selectedClient.contactPerson2.email || ''} onChange={e => setSelectedClient({ ...selectedClient, contactPerson2: { ...selectedClient.contactPerson2, email: e.target.value } })} /></p>
                              <p><strong>Contact Person 2 Phone:</strong> <input type="tel" value={selectedClient.contactPerson2.phone || ''} onChange={e => setSelectedClient({ ...selectedClient, contactPerson2: { ...selectedClient.contactPerson2, phone: e.target.value } })} /></p>
                              <button onClick={handleSave}>Save</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No clients found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Clients;
