import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataItem {
  name: string;
  quantity: number;
}

interface ChartComponentProps {
  data: DataItem[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => (
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
  </LineChart>
);

export default ChartComponent;

