import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import salaryData from '../data/salaryData';

const AnalyticsChart: React.FC = () => {
  return (
    <LineChart
      width={600}
      height={300}
      data={salaryData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total_jobs" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="average_salary" stroke="#82ca9d" />
    </LineChart>
  );
};

export default AnalyticsChart;
