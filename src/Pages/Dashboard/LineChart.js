import { useEffect, useMemo, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { getAllVehicles } from '../../actions/vehicle-action';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const scores = [3, 3, 2, 5, 8];
// const marcas = ['Renault', 'Hino', 'Chevron', 'Test'];

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
      text: 'Marcas de vehiculos atendidos',
    },

  },
};

export default function LineChart() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const allVehicles = async () => {
      const response = await getAllVehicles();
      setVehicles(response.data);
    };
    allVehicles();
  }, []);

  const data = useMemo(() => ({
    datasets: [
      {
        label: 'Vehiculos',
        data: scores,
        tension: 0.3,
        borderColor: 'rgb(75,192,192)',
        pointRadius: 6,
        pointBackgroundColor: 'rgb(75,192,192)',
        backgroundColor: 'rgb(75,192,192,0.3)',
      },

    ],
    labels: ['Renault', 'Hino', 'Chevron', 'Foton', 'Kenworth'],
    // labels,
  }), []);
  return <Line data={data} options={options} />;
}
