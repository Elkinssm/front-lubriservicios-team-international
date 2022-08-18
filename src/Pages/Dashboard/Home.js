import { Box, Grid } from '@mui/material';
import React from 'react';
import AdminCard from '../../Components/Card/AdminCard';
import MechanicCard from '../../Components/Card/MechanicCard';
import WorkerCard from '../../Components/Card/WorkerCard';
import BarChart from './BarChar';
import LineChart from './LineChart';

export default function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <div style={{ width: '100%' }}>
              <AdminCard />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ width: '100%' }}>
              <MechanicCard />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ width: '100%' }}>
              <WorkerCard />
            </div>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: '100px' }}>
          <Grid item xs={6}>
            <LineChart />
          </Grid>
          <Grid item xs={6}>
            <BarChart />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
