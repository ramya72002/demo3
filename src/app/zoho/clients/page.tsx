'use client';

import React, { useState, useEffect } from 'react';
import ZohoHeader from '@/app/zohoheader/page'; // Import ZohoHeader
import './clients.scss'; // Import SCSS for styling

// Interface for the client data with relevant fields only
interface Client {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  contactPerson1: string;
}

const Clients: React.FC = () => {
  const [clientsData, setClientsData] = useState<Client[]>([]); // State for client data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch clients from the API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/clients/getall');
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

    fetchClients();
  }, []);

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
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Contact Person 1</th>
                <th>Website</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.length > 0 ? (
                clientsData.map((client, index) => (
                  <tr key={index}>
                    <td>{client.clientName || 'N/A'}</td>
                    <td>{client.email || 'N/A'}</td>
                    <td>{client.phone || 'N/A'}</td>
                    <td>{client.contactPerson1 || 'N/A'}</td>
                    <td>{client.website || 'N/A'}</td>
                    <td>{client.address || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No clients available</td>
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
