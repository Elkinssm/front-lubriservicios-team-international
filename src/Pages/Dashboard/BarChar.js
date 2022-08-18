import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
const labels = [100, 200, 300, 400, 500, 600, 700];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Materiales',
    },
  },

};

export default function BarChart() {
  const data = useMemo(() => ({
    datasets: [
      {
        label: 'Materiales',
        data: scores,
        tension: 0.3,
        borderColor: 'rgb(75,192,192)',
        backgroundColor: 'rgb(75,192,192,0.3)',
      },

    ],
    labels,
  }), []);
  return <Bar data={data} options={options} />;
}
