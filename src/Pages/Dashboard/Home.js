import { Box, Grid } from '@mui/material';
import React from 'react';
import AdminCard from '../../Components/Card/AdminCard';
import Card2 from '../../Components/Card/Card2';
import Card3 from '../../Components/Card/Card3';
import BarChart from './BarChar';
import LineChart from './LineChart';

export default function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={2}>

          <Grid item xs={4}>
            <div>
              <AdminCard />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <Card2 />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <Card3 />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <LineChart />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <BarChart />
            </div>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
}
