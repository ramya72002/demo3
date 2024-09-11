import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,     // Register CategoryScale for x-axis
  LinearScale,       // Register LinearScale for y-axis
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './linechart.scss';

ChartJS.register(
  CategoryScale,     // Register CategoryScale here
  LinearScale,       // Register LinearScale here
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceSummary: React.FC = () => {
  const data = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    datasets: [
      {
        label: 'Series 1',
        data: [4, 3, 2, 5],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Series 2',
        data: [2, 4, 3, 4],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Series 3',
        data: [3, 2, 4, 3],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Summary',
      },
    },
  };

  return (
    <div className="container">
      <h2>Performance Summary Based on a Particular Period</h2>
      <div className="controls">
        <label>Select Recruiter:</label>
        <label>Date Range: From <input type="date" /> To <input type="date" /></label>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
      <div className="labels">
        <span>Candidates = New with Date stamp</span>
        <span>Recruiter Names</span>
      </div>
    </div>
  );
};

export default PerformanceSummary;
