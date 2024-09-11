import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ayesha', candidates: 6 },
  { name: 'John', candidates: 4 },
  { name: 'Sara', candidates: 3 },
  { name: 'Doe', candidates: 5 },
];

const PerformanceBarChart: React.FC = () => {
  return (
    <div className="performance-summary">
      <h2></h2>
      <ResponsiveContainer width={600} height={450}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="candidates" fill="#0074D9" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceBarChart;
