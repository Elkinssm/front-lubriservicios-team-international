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
import { Typography } from '@mui/material';
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
const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
// const labels = [100, 200, 300, 400, 500, 600, 700];

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

  const autos = vehicles;
  const placas = autos.map((auto) => auto.brand);

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
      // {
      //   label: 'Mis datos (2)',
      //   data: scores2,
      //   tension: 0.3,
      //   borderColor: 'green',
      //   pointRadius: 6,
      //   backgroundColor: 'rgb(0,255,0,0.3)',
      // },
    ],
    labels: ['Renault', 'Hino', 'Chevron', 'Foton', 'Kenworth'],
    // labels,
  }), []);
  return <Line data={data} options={options} />;
}
