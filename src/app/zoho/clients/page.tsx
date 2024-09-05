'use client' 
import ZohoHeader from '@/app/zohoheader/page';
import './clients.scss'; // Importing styles
import React, { useState, useEffect } from 'react';
// Interface for the client data
interface Client {
  about: string;
  accountManager: string;
  billingCity: string;
  billingCode: string;
  billingCountry: string;
  billingProvince: string;
  billingStreet: string;
  clientName: string;
  contactNumber: string;
  fax: string;
  industry: string;
  parentClient: string;
  shippingCity: string;
  shippingCode: string;
  shippingCountry: string;
  shippingProvince: string;
  shippingStreet: string;
  source: string;
  website: string;
}

const Clients: React.FC = () => {
  const [clientsData, setClientsData] = useState<Client[]>([]); // Using the interface for state

  // Fetch clients from the API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://demo4-backend.vercel.app/clients/getall');
        const data: Client[] = await response.json();
        setClientsData(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
        <ZohoHeader />
    <div className="clients-container">
      <table className="clients-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Contact Number</th>
            <th>Account Manager</th>
          </tr>
        </thead>
        <tbody>
          {clientsData.map((client, index) => (
            <tr key={index}>
              <td>{client.clientName}</td>
              <td>{client.contactNumber || 'N/A'}</td>
              <td>{client.accountManager}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Clients;
