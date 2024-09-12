import React from 'react';
import './clientDetails.scss'; // Import SCSS for styling if needed
import { Client } from '@/app/types';

interface ClientDetailsProps {
  client: Client;
  onChange: (updatedClient: Client) => void;
  onSave: () => void;
  onClose: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onChange, onSave, onClose }) => {
  return (
    <div className="client-details-layer">
      <div className="client-details-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h3>Edit Client Details</h3>
        <div className="details-row">
          <p><strong>Agency:</strong> <input type="text" value={client.agency} onChange={e => onChange({ ...client, agency: e.target.value })} /></p>
          <p><strong>Client Manager:</strong> <input type="text" value={client.clientManager} onChange={e => onChange({ ...client, clientManager: e.target.value })} /></p>
        </div>
        <div className="details-row">
          <p><strong>Client Name:</strong> <input type="text" value={client.clientName} onChange={e => onChange({ ...client, clientName: e.target.value })} /></p>
          <p><strong>Email:</strong> <input type="email" value={client.email} onChange={e => onChange({ ...client, email: e.target.value })} /></p>
        </div>
        <div className="details-row">
          <p><strong>Phone:</strong> <input type="tel" value={client.phone} onChange={e => onChange({ ...client, phone: e.target.value })} /></p>
          <p><strong>Address:</strong> <input type="text" value={client.address} onChange={e => onChange({ ...client, address: e.target.value })} /></p>
        </div>
        <div className="details-row">
          <p><strong>Industry:</strong> <input type="text" value={client.industry} onChange={e => onChange({ ...client, industry: e.target.value })} /></p>
        </div>
        <div className="details-row">
          <p><strong>Contact Person 1 Name:</strong> <input type="text" value={client.contactPerson1.name} onChange={e => onChange({ ...client, contactPerson1: { ...client.contactPerson1, name: e.target.value } })} /></p>
          <p><strong>Contact Person 1 Email:</strong> <input type="email" value={client.contactPerson1.email || ''} onChange={e => onChange({ ...client, contactPerson1: { ...client.contactPerson1, email: e.target.value } })} /></p>
        </div>
        <div className="details-row">
          <p><strong>Contact Person 1 Phone:</strong> <input type="tel" value={client.contactPerson1.phone || ''} onChange={e => onChange({ ...client, contactPerson1: { ...client.contactPerson1, phone: e.target.value } })} /></p>
          <p><strong>Contact Person 2 Name:</strong> <input type="text" value={client.contactPerson2.name || ''} onChange={e => onChange({ ...client, contactPerson2: { ...client.contactPerson2, name: e.target.value } })} /></p>
        </div>
        <div className="details-row">
          <p><strong>Contact Person 2 Email:</strong> <input type="email" value={client.contactPerson2.email || ''} onChange={e => onChange({ ...client, contactPerson2: { ...client.contactPerson2, email: e.target.value } })} /></p>
          <p><strong>Contact Person 2 Phone:</strong> <input type="tel" value={client.contactPerson2.phone || ''} onChange={e => onChange({ ...client, contactPerson2: { ...client.contactPerson2, phone: e.target.value } })} /></p>
        </div>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};

export default ClientDetails;
