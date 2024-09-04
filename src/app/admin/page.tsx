/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.scss';
import { EmployeeRecord } from '../types';

const Admin: React.FC = () => {
  const [records, setRecords] = useState<EmployeeRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [pan, setPan] = useState<string>('');
  const [aadhar, setAadhar] = useState<string>('');
  const [uan, setUan] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [fatherName, setFatherName] = useState<string>('');
  const [relation, setRelation] = useState<string>('');
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [emailId, setEmailId] = useState<string>('');
  const [bank, setBank] = useState<string>('');
  const [nomination, setNomination] = useState<string>('');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = (filters: { [key: string]: any } = {}) => {
    setLoading(true);
    axios.get<EmployeeRecord[]>('https://demo4-backend.vercel.app/filter', { params: filters })
      .then(response => {
        setRecords(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleFilter = () => {
    const filters: { [key: string]: any } = {};
    if (name) filters.Name = name;
    if (gender) filters.Gender = gender;
    if (pan) filters.Pan = pan;
    if (aadhar) filters.Aadhar = aadhar;
    if (uan) filters.Uan = uan;
    if (memberId) filters['Member ID'] = memberId;
    if (fatherName) filters["Father's/Husband's Name"] = fatherName;
    if (relation) filters.Relation = relation;
    if (maritalStatus) filters['Marital Status'] = maritalStatus;
    if (mobile) filters.Mobile = mobile;
    if (emailId) filters['Email ID'] = emailId;
    if (bank) filters.Bank = bank;
    if (nomination) filters.Nomination = nomination;
    fetchRecords(filters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-container">
      <h1>Employee Records</h1>

      <div className="filters">
        <input type="text" placeholder="Filter by Name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Filter by Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <input type="text" placeholder="Filter by PAN" value={pan} onChange={(e) => setPan(e.target.value)} />
        <input type="text" placeholder="Filter by Aadhar" value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
        <input type="text" placeholder="Filter by UAN" value={uan} onChange={(e) => setUan(e.target.value)} />
        <input type="text" placeholder="Filter by Member ID" value={memberId} onChange={(e) => setMemberId(e.target.value)} />
        <input type="text" placeholder="Filter by Father's/Husband's Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
        <input type="text" placeholder="Filter by Relation" value={relation} onChange={(e) => setRelation(e.target.value)} />
        <input type="text" placeholder="Filter by Marital Status" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} />
        <input type="text" placeholder="Filter by Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <input type="text" placeholder="Filter by Email ID" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
        <input type="text" placeholder="Filter by Bank" value={bank} onChange={(e) => setBank(e.target.value)} />
        <select value={nomination} onChange={(e) => setNomination(e.target.value)}>
          <option value="">Filter by Nomination</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      <div className="records">
        {records.map(record => (
          <div key={record._id} className="record">
            <p><strong>Name:</strong> {record.Name}</p>
            <p><strong>Gender:</strong> {record.Gender}</p>
            <p><strong>Date of Birth:</strong> {record.Dob}</p>
            <p><strong>Date of Joining:</strong> {record.Doj}</p>
            <p><strong>Member ID:</strong> {record['Member ID']}</p>
            <p><strong>Father's/Husband's Name:</strong> {record["Father's/Husband's Name"]}</p>
            <p><strong>Relation:</strong> {record.Relation}</p>
            <p><strong>Marital Status:</strong> {record['Marital Status']}</p>
            <p><strong>Mobile:</strong> {record.Mobile}</p>
            <p><strong>Email ID:</strong> {record['Email ID']}</p>
            <p><strong>Aadhar:</strong> {record.Aadhar}</p>
            <p><strong>Pan:</strong> {record.Pan}</p>
            <p><strong>Bank:</strong> {record.Bank}</p>
            <p><strong>Nomination:</strong> {record.Nomination}</p>
            {/* Add more fields if needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
